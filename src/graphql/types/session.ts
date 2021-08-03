import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Role } from '@prisma/client';
import {
  extendType,
  idArg,
  inputObjectType,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from 'nexus';
import { Session } from 'nexus-prisma';

import { isAuthorized } from 'src/utils/auth';

export const session = objectType({
  definition(t) {
    t.field(Session.id);
    t.field(Session.userId);
    t.field(Session.expires);
    t.field(Session.sessionToken);
    t.field(Session.accessToken);
    t.field(Session.createdAt);
    t.field(Session.updatedAt);
    t.field(Session.user);
  },
  description: Session.$description,
  name: Session.$name,
});

export const updateSessionInput = inputObjectType({
  definition(t) {
    t.field(Session.expires);
    t.field(Session.sessionToken);
    t.field(Session.accessToken);
  },
  name: 'UpdateSessionInput',
});

export const getSessions = extendType({
  definition(t) {
    t.nonNull.connectionField('sessions', {
      additionalArgs: {
        search: nullable(stringArg()),
      },
      authorize: (_, __, ctx) =>
        isAuthorized([Role.ADMIN, Role.SUPPORT], ctx.user),
      resolve: async (_, args, ctx) => {
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
        const result = await findManyCursorConnection(
          (_args) =>
            ctx.prisma.session.findMany({
              include: { user: true },
              ..._args,
              ...searchArgs,
            }),
          () => ctx.prisma.session.count(),
          args
        );
        return result;
      },
      type: Session.$name,
    });
  },
  type: 'Query',
});

export const updateSession = extendType({
  definition(t) {
    t.field('updateSession', {
      args: {
        fields: nonNull(updateSessionInput),
        id: nonNull(idArg()),
      },
      authorize: (_, __, ctx) =>
        isAuthorized([Role.ADMIN, Role.SUPPORT], ctx.user),
      resolve: async (_, args, ctx) =>
        ctx.prisma.session.update({
          data: args.fields,
          where: { id: args.id },
        }),
      type: Session.$name,
    });
  },
  type: 'Mutation',
});

export const removeSession = extendType({
  definition(t) {
    t.field('removeSession', {
      args: {
        id: nonNull(idArg()),
      },
      authorize: (_, __, ctx) =>
        isAuthorized([Role.ADMIN, Role.SUPPORT], ctx.user),
      resolve: async (_, args, ctx) =>
        ctx.prisma.session.delete({ where: { id: args.id } }),
      type: Session.$name,
    });
  },
  type: 'Mutation',
});
