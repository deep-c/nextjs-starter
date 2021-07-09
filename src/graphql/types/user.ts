import { User } from 'nexus-prisma';
import {
  objectType,
  extendType,
  idArg,
  nonNull,
  inputObjectType,
} from 'nexus';
import { Role } from '@prisma/client';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { isAuthorized, isAuthenticated } from '@/utils/auth';

export const user = objectType({
  name: User.$name,
  description: User.$description,
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
});

export const updateMeInput = inputObjectType({
  name: 'UpdateMeInput',
  definition(t) {
    t.field(User.name);
    t.field(User.image);
    t.field(User.bio);
  },
});

export const updateUserInput = inputObjectType({
  name: 'UpdateUserInput',
  definition(t) {
    t.field(User.name);
    t.field(User.image);
    t.field(User.bio);
    t.field(User.role);
    t.field(User.status);
  },
});

export const getUsers = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.connectionField('users', {
      type: User.$name,
      async resolve(_, args, ctx) {
        const result = await findManyCursorConnection(
          (args) => ctx.prisma.user.findMany(args),
          () => ctx.prisma.user.count(),
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

export const getMe = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('me', {
      type: User.$name,
      resolve(_, __, ctx) {
        return ctx.prisma.user.findUnique({
          where: {
            id: ctx.user?.id,
          },
        });
      },
      authorize: (_, __, ctx) => {
        return isAuthenticated(ctx.user);
      },
    });
  },
});

export const getUser = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('user', {
      type: User.$name,
      args: {
        id: nonNull(idArg()),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: args,
        });
      },
      authorize: (_, __, ctx) => {
        return isAuthenticated(ctx.user);
      },
    });
  },
});

export const updateMe = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateMe', {
      type: User.$name,
      args: {
        fields: nonNull(updateMeInput),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.user.update({
          where: { id: ctx.user?.id },
          data: args.fields,
        });
      },
      authorize: (_, args, ctx) => {
        return isAuthenticated(ctx.user);
      },
    });
  },
});

export const updateUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateUser', {
      type: User.$name,
      args: {
        id: nonNull(idArg()),
        fields: nonNull(updateUserInput),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.user.update({
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
