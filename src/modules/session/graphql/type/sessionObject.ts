import { objectType } from 'nexus';
import { Session } from 'nexus-prisma';

export default objectType({
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
