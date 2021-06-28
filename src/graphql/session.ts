import { Session } from 'nexus-prisma';
import { objectType } from 'nexus';

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
