import { objectType } from 'nexus';
import { VerificationRequest } from 'nexus-prisma';

export const verificationRequest = objectType({
  name: VerificationRequest.$name,
  description: VerificationRequest.$description,
  definition(t) {
    t.field(VerificationRequest.id);
    t.field(VerificationRequest.identifier);
    t.field(VerificationRequest.token);
    t.field(VerificationRequest.expires);
    t.field(VerificationRequest.createdAt);
    t.field(VerificationRequest.updatedAt);
  },
});
