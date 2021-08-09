import { objectType } from 'nexus';
import { VerificationRequest } from 'nexus-prisma';

// eslint-disable-next-line import/prefer-default-export
export const verificationRequest = objectType({
  definition(t) {
    t.field(VerificationRequest.id);
    t.field(VerificationRequest.identifier);
    t.field(VerificationRequest.token);
    t.field(VerificationRequest.expires);
    t.field(VerificationRequest.createdAt);
    t.field(VerificationRequest.updatedAt);
  },
  description: VerificationRequest.$description,
  name: VerificationRequest.$name,
});
