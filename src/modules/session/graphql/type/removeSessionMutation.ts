import { Role } from '@prisma/client';
import { extendType, idArg, nonNull } from 'nexus';
import { Session } from 'nexus-prisma';

import { isAuthorized } from 'src/modules/auth/utils';

export default extendType({
  definition(t) {
    t.field('removeSession', {
      args: {
        id: nonNull(idArg()),
      },
      authorize: (_, __, ctx) =>
        isAuthorized([Role.ADMIN, Role.SUPPORT], ctx.user),
      resolve: (_, args, ctx) =>
        ctx.prisma.session.delete({ where: { id: args.id } }),
      type: Session.$name,
    });
  },
  type: 'Mutation',
});
