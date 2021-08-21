import { extendType } from 'nexus';
import { User } from 'nexus-prisma';

import { isAuthenticated } from 'src/modules/auth/utils';

export default extendType({
  definition(t) {
    t.nullable.field('me', {
      authorize: (_, __, ctx) => isAuthenticated(ctx.user),
      resolve: (_, __, ctx) =>
        ctx.prisma.user.findUnique({
          where: {
            id: ctx.user?.id,
          },
        }),
      type: User.$name,
    });
  },
  type: 'Query',
});
