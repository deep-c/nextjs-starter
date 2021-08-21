import { inputObjectType } from 'nexus';
import { Session } from 'nexus-prisma';

export default inputObjectType({
  definition(t) {
    t.field(Session.expires);
    t.field(Session.sessionToken);
    t.field(Session.accessToken);
  },
  name: 'UpdateSessionInput',
});
