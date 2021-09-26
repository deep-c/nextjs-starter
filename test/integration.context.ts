/* eslint-disable no-restricted-syntax */
/* eslint-disable jest/require-top-level-describe */
/* eslint-disable jest/no-hooks */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { execSync } from 'child_process';
import { join } from 'path';

import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

import { server } from 'src/pages/api/v1/graphql';
import prisma from 'src/prisma/connection';

import type { ApolloServer } from 'apollo-server-micro';

const prismaBinary = join(__dirname, '..', 'node_modules', '.bin', 'prisma');

interface TestContext {
  db: PrismaClient;
  gqlServer: ApolloServer;
}

function graphQLTestContext() {
  return {
    after() {},
    before() {
      return server;
    },
  };
}

function prismaTestContext() {
  let schema = '';
  let databaseUrl = '';
  return {
    async after() {
      for (const {
        tablename,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,max-len
      } of await prisma.$queryRaw<any>`SELECT tablename FROM pg_tables WHERE schemaname=${schema};`) {
        await prisma.$queryRawUnsafe(
          `TRUNCATE TABLE "${schema}"."${tablename}" CASCADE`
        );
      }
      for (const {
        relname,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,max-len
      } of await prisma.$queryRaw<any>`SELECT c.relname FROM pg_class AS c JOIN pg_namespace AS n ON c.relnamespace = n.oid WHERE c.relkind='S' AND n.nspname=${schema};`) {
        await prisma.$queryRawUnsafe(
          `ALTER SEQUENCE "${schema}"."${relname}" RESTART WITH 1;`
        );
      }
      await prisma.$queryRawUnsafe(
        `DROP SCHEMA IF EXISTS "${schema}" CASCADE;`
      );
      await prisma?.$disconnect();
    },
    before() {
      schema = `test_${nanoid()}`;
      databaseUrl = `${process.env.DATABASE_URL}?schema=${schema}`;
      process.env.DATABASE_URL = databaseUrl;
      execSync(`${prismaBinary} migrate dev --skip-generate`, {
        env: {
          ...process.env,
          DATABASE_URL: databaseUrl,
        },
      });
      return prisma;
    },
  };
}

export function createTestContext(): TestContext {
  const ctx = {} as TestContext;
  const prismaCtx = prismaTestContext();
  const graphQLCtx = graphQLTestContext();

  beforeEach(() => {
    const db = prismaCtx.before();
    const gqlServer = graphQLCtx.before();
    Object.assign(ctx, {
      db,
      gqlServer,
    });
  });

  afterEach(async () => {
    await prismaCtx.after();
    graphQLCtx.after();
  });

  return ctx;
}
