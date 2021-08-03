import { getSession } from 'next-auth/client';

import prisma from 'src/database/connection';

import type { PrismaClient } from '@prisma/client';
import type { MicroRequest } from 'apollo-server-micro/src/types';
import type { AuthSessionUser } from 'src/types/next-auth';

export type AppGqlContext = {
  prisma: PrismaClient;
  user: AuthSessionUser | null;
};

const context = async ({
  req,
}: {
  req: MicroRequest;
}): Promise<AppGqlContext> => {
  const session = await getSession({ req });
  return {
    prisma,
    user: session?.user ?? null,
  };
};

export default context;
