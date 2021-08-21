import { objectType } from 'nexus';
import { User } from 'nexus-prisma';

export default objectType({
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
