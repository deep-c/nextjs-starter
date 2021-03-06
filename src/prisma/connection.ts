import { PrismaClient } from '@prisma/client';

interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV !== 'test'
        ? ['query', 'info', 'error', 'warn']
        : [],
  });

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
