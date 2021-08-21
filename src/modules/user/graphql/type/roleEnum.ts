import { enumType } from 'nexus';
import { Role } from 'nexus-prisma';

export default enumType({
  description: Role.description,
  members: Role.members,
  name: Role.name,
});
