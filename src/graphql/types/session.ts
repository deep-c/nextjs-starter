import { extendType, objectType } from 'nexus';
import { Session } from 'nexus-prisma';

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

export const sessionsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('sessions', {
      type: Session.$name,
      resolve(_, __, ctx) {
        return ctx.prisma.session.findMany();
      },
    });
  },
});
