import { Role } from '@prisma/client';
import { extendType, idArg, nonNull } from 'nexus';
import { Session } from 'nexus-prisma';

import { isAuthorized } from 'src/modules/auth/utils';

import updateSessionInput from './updateSessionInput';

export default extendType({
  definition(t) {
    t.field('updateSession', {
      args: {
        fields: nonNull(updateSessionInput),
        id: nonNull(idArg()),
      },
      authorize: (_, __, ctx) =>
        isAuthorized([Role.ADMIN, Role.SUPPORT], ctx.user),
      resolve: (_, args, ctx) =>
        ctx.prisma.session.update({
          data: args.fields,
          where: { id: args.id },
        }),
      type: Session.$name,
    });
  },
  type: 'Mutation',
});
