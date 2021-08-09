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
import { User } from 'nexus-prisma';

import { isAuthenticated, isAuthorized } from 'src/utils/auth';

export const user = objectType({
  definition(t) {
    t.field(User.id);
    t.field(User.name);
    t.field(User.email);
    t.field(User.emailVerified);
    t.field(User.image);
    t.field(User.createdAt);
    t.field(User.updatedAt);
    t.field(User.role);
    t.field(User.status);
    t.field(User.bio);
    t.field(User.accounts);
    t.field(User.sessions);
  },
  description: User.$description,
  name: User.$name,
});

export const updateMeInput = inputObjectType({
  definition(t) {
    t.field(User.name);
    t.field(User.image);
    t.field(User.bio);
  },
  name: 'UpdateMeInput',
});

export const updateUserInput = inputObjectType({
  definition(t) {
    t.field(User.name);
    t.field(User.image);
    t.field(User.bio);
    t.field(User.role);
    t.field(User.status);
  },
  name: 'UpdateUserInput',
});

export const getUsers = extendType({
  definition(t) {
    t.nonNull.connectionField('users', {
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
          (_args) => ctx.prisma.user.findMany({ ..._args, ...searchArgs }),
          () => ctx.prisma.user.count(),
          args
        );
        return result;
      },
      type: User.$name,
    });
  },
  type: 'Query',
});

export const getMe = extendType({
  definition(t) {
    t.nullable.field('me', {
      authorize: (_, __, ctx) => isAuthenticated(ctx.user),
      resolve: async (_, __, ctx) =>
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

export const getUser = extendType({
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

export const updateMe = extendType({
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

export const updateUser = extendType({
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
