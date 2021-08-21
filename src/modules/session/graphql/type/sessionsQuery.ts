import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Role } from '@prisma/client';
import { extendType, nullable, stringArg } from 'nexus';
import { Session } from 'nexus-prisma';

import { isAuthorized } from 'src/modules/auth/utils';

export default extendType({
  definition(t) {
    t.nonNull.connectionField('sessions', {
      additionalArgs: {
        search: nullable(stringArg()),
      },
      authorize: (_, __, ctx) =>
        isAuthorized([Role.ADMIN, Role.SUPPORT], ctx.user),
      resolve: (_, args, ctx) => {
        let searchArgs = {};
        // TODO: Solve better once prisma has full text search capabilities
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
          (_args) =>
            ctx.prisma.session.findMany({
              include: { user: true },
              ..._args,
              ...searchArgs,
            }),
          () => ctx.prisma.session.count(),
          args
        );
      },
      type: Session.$name,
    });
  },
  type: 'Query',
});
