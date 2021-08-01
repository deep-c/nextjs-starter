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
  name: Session.$name,
  description: Session.$description,
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
});

export const updateSessionInput = inputObjectType({
  name: 'UpdateSessionInput',
  definition(t) {
    t.field(Session.expires);
    t.field(Session.sessionToken);
    t.field(Session.accessToken);
  },
});

export const getSessions = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.connectionField('sessions', {
      type: Session.$name,
      additionalArgs: {
        search: nullable(stringArg()),
      },
      async resolve(_, args, ctx) {
        let searchArgs = {};
        if (args.search) {
          searchArgs = {
            where: {
              OR: {
                name: {
                  contains: args.search,
                  mode: 'insensitive',
                },
                email: {
                  contains: args.search,
                  mode: 'insensitive',
                },
              },
            },
          };
        }
        const result = await findManyCursorConnection(
          (args) =>
            ctx.prisma.session.findMany({
              include: { user: true },
              ...args,
              ...searchArgs,
            }),
          () => ctx.prisma.session.count(),
          args
        );
        return result;
      },
      authorize: (_, __, ctx) => {
        return isAuthorized([Role.ADMIN, Role.SUPPORT], ctx.user);
      },
    });
  },
});

export const updateSession = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateSession', {
      type: Session.$name,
      args: {
        id: nonNull(idArg()),
        fields: nonNull(updateSessionInput),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.session.update({
          where: { id: args.id },
          data: args.fields,
        });
      },
      authorize: (_, __, ctx) => {
        return isAuthorized([Role.ADMIN, Role.SUPPORT], ctx.user);
      },
    });
  },
});

export const removeSession = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('removeSession', {
      type: Session.$name,
      args: {
        id: nonNull(idArg()),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.session.delete({ where: { id: args.id } });
      },
      authorize: (_, __, ctx) => {
        return isAuthorized([Role.ADMIN, Role.SUPPORT], ctx.user);
      },
    });
  },
});
