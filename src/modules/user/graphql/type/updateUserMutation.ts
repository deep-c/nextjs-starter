import { Role } from '@prisma/client';
import { extendType, idArg, nonNull } from 'nexus';
import { User } from 'nexus-prisma';

import { isAuthorized } from 'src/modules/auth/utils';

import updateUserInput from './updateUserInput';

export default extendType({
  definition(t) {
    t.field('updateUser', {
      args: {
        fields: nonNull(updateUserInput),
        id: nonNull(idArg()),
      },
      authorize: (_, __, ctx) =>
        isAuthorized([Role.ADMIN, Role.SUPPORT], ctx.user),
      resolve: (_, args, ctx) =>
        ctx.prisma.user.update({
          data: args.fields,
          where: { id: args.id },
        }),
      type: User.$name,
    });
  },
  type: 'Mutation',
});
