import { extendType, idArg, nonNull } from 'nexus';
import { User } from 'nexus-prisma';

import { isAuthenticated } from 'src/modules/auth/utils';

export default extendType({
  definition(t) {
    t.nullable.field('user', {
      args: {
        id: nonNull(idArg()),
      },
      authorize: (_, __, ctx) => isAuthenticated(ctx.user),
      resolve: (_, args, ctx) =>
        ctx.prisma.user.findUnique({
          where: args,
        }),
      type: User.$name,
    });
  },
  type: 'Query',
});
