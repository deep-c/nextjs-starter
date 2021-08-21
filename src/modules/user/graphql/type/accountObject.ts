import { objectType } from 'nexus';
import { Account } from 'nexus-prisma';

export default objectType({
  definition(t) {
    t.field(Account.id);
    t.field(Account.userId);
    t.field(Account.providerType);
    t.field(Account.providerId);
    t.field(Account.providerAccountId);
    t.field(Account.refreshToken);
    t.field(Account.accessToken);
    t.field(Account.accessTokenExpires);
    t.field(Account.createdAt);
    t.field(Account.updatedAt);
    t.field(Account.user);
  },
  description: Account.$description,
  name: Account.$name,
});
