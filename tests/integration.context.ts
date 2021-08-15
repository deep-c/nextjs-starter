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
import { Client } from 'pg';

import prisma from 'src/database/connection';

const prismaBinary = join(__dirname, '..', 'node_modules', '.bin', 'prisma');

interface TestContext {
  db: PrismaClient;
}

function prismaTestContext() {
  let schema = '';
  let databaseUrl = '';
  return {
    async after() {
      for (const { tablename } of await prisma.$queryRaw(
        `SELECT tablename FROM pg_tables WHERE schemaname='${schema}'`
      )) {
        await prisma.$queryRaw(
          `TRUNCATE TABLE "${schema}"."${tablename}" CASCADE;`
        );
      }
      for (const { relname } of await prisma.$queryRaw(
        // eslint-disable-next-line max-len
        `SELECT c.relname FROM pg_class AS c JOIN pg_namespace AS n ON c.relnamespace = n.oid WHERE c.relkind='S' AND n.nspname='${schema}';`
      )) {
        await prisma.$queryRaw(
          `ALTER SEQUENCE "${schema}"."${relname}" RESTART WITH 1;`
        );
      }
      const client = new Client({
        connectionString: databaseUrl,
      });
      await client.connect();
      await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
      await client.end();
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

  beforeEach(() => {
    const db = prismaCtx.before();
    Object.assign(ctx, {
      db,
    });
  });

  afterEach(async () => {
    await prismaCtx.after();
  });

  return ctx;
}
