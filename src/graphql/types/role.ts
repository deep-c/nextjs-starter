import { enumType } from 'nexus';
import { Role } from 'nexus-prisma';

export const roleType = enumType({
  name: Role.name,
  description: Role.description,
  members: Role.members,
});
