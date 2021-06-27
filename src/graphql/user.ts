import { User } from 'nexus-prisma';
import { objectType } from 'nexus';

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
  },
});
