import { createTestContext } from 'test/integration.context';

describe('prisma client', () => {
  const ctx = createTestContext();

  it('connects successfully', async () => {
    expect.assertions(1);
    await expect(ctx.db.$queryRaw`SELECT 1;`).resolves.toStrictEqual([
      { '?column?': 1 },
    ]);
  });
});
