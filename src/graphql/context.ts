import type { PrismaClient } from '@prisma/client';
import type { MicroRequest } from 'apollo-server-micro/src/types';
import type { AuthSessionUser } from '@/types/next-auth';
import { getSession } from 'next-auth/client';
import prisma from '@/prisma/connection';

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
    user: session?.user ?? null,
    prisma,
  };
};

export default context;
