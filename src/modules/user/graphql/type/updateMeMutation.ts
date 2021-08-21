import { extendType, nonNull } from 'nexus';
import { User } from 'nexus-prisma';

import { isAuthenticated } from 'src/modules/auth/utils';

import updateMeInput from './updateMeInput';

export default extendType({
  definition(t) {
    t.field('updateMe', {
      args: {
        fields: nonNull(updateMeInput),
      },
      authorize: (_, __, ctx) => isAuthenticated(ctx.user),
      resolve: (_, args, ctx) =>
        ctx.prisma.user.update({
          data: args.fields,
          where: { id: ctx.user?.id },
        }),
      type: User.$name,
    });
  },
  type: 'Mutation',
});
