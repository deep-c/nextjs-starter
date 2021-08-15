import { createTestContext } from 'tests/integration.context';

describe('prisma connection', () => {
  const ctx = createTestContext();

  it('connects successfully', async () => {
    expect.assertions(1);
    await expect(ctx.db.$queryRaw('SELECT 1')).resolves.toBeTruthy();
  });
});
