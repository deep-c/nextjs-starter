import { User } from 'nexus-prisma';
import {
  objectType,
  extendType,
  idArg,
  nonNull,
  inputObjectType,
} from 'nexus';
import { Role } from '@prisma/client';
import { isAuthorized, isAuthenticated } from '@/components/Auth';

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
    t.field(User.bio);
    t.field(User.accounts);
    t.field(User.sessions);
  },
});

export const userUpdateInput = inputObjectType({
  name: 'UserUpdateInput',
  definition(t) {
    t.field(User.name);
    t.field(User.image);
    t.field(User.bio);
  },
});

export const usersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: User.$name,
      resolve(_, __, ctx) {
        return ctx.prisma.user.findMany();
      },
      authorize: (_, __, ctx) => {
        return isAuthorized([Role.ADMIN, Role.SUPPORT], ctx.user);
      },
    });
  },
});

export const meQuery = extendType({
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

export const updateUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateUser', {
      type: User.$name,
      args: {
        id: nonNull(idArg()),
        fields: nonNull(userUpdateInput),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.user.update({
          where: { id: args.id },
          data: args.fields,
        });
      },
      authorize: (_, args, ctx) => {
        return (
          isAuthorized([Role.ADMIN, Role.SUPPORT], ctx.user) ||
          args.id === ctx.user?.id
        );
      },
    });
  },
});
