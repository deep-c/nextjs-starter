import type { PrismaClient } from '@prisma/client';
import type { MicroRequest } from 'apollo-server-micro/src/types';
import { getSession } from 'next-auth/client';
import prisma from '@/prisma/connection';

export type AppGqlContext = {
  prisma: PrismaClient;
  user: Record<string, any> | null;
};

export const context = async ({
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
