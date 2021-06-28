import { Account } from 'nexus-prisma';
import { objectType } from 'nexus';

export const account = objectType({
  name: Account.$name,
  description: Account.$description,
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
});
