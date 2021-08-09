import { enumType } from 'nexus';
import { Role } from 'nexus-prisma';

// eslint-disable-next-line import/prefer-default-export
export const roleType = enumType({
  description: Role.description,
  members: Role.members,
  name: Role.name,
});
