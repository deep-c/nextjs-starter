import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Role } from '@prisma/client';
import { extendType, nullable, stringArg } from 'nexus';
import { User } from 'nexus-prisma';

import { isAuthorized } from 'src/modules/auth/utils';

export default extendType({
  definition(t) {
    t.nonNull.connectionField('users', {
      additionalArgs: {
        search: nullable(stringArg()),
      },
      authorize: (_, __, ctx) =>
        isAuthorized([Role.ADMIN, Role.SUPPORT], ctx.user),
      resolve: (_, args, ctx) => {
        // TODO: Solve better once prisma has full text search capabilities
        let searchArgs = {};
        if (args.search) {
          searchArgs = {
            where: {
              OR: {
                email: {
                  contains: args.search,
                  mode: 'insensitive',
                },
                name: {
                  contains: args.search,
                  mode: 'insensitive',
                },
              },
            },
          };
        }
        return findManyCursorConnection(
          (_args) => ctx.prisma.user.findMany({ ..._args, ...searchArgs }),
          () => ctx.prisma.user.count(),
          args
        );
      },
      type: User.$name,
    });
  },
  type: 'Query',
});
