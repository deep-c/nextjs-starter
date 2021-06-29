import { Role } from 'nexus-prisma';
import { enumType } from 'nexus';

export const roleType = enumType({
  name: Role.name,
  description: Role.description,
  members: Role.members,
});
