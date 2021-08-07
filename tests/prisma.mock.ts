/* eslint-disable import/prefer-default-export */
/* eslint-disable jest/require-top-level-describe */
/* eslint-disable jest/no-hooks */
import { PrismaClient } from '@prisma/client';
import { MockProxy, mockDeep, mockReset } from 'jest-mock-extended';

import prisma from 'src/database/connection';

jest.mock('src/database/connection', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as MockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});
