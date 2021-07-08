import { Status } from 'nexus-prisma';
import { enumType } from 'nexus';

export const statusType = enumType({
  name: Status.name,
  description: Status.description,
  members: Status.members,
});
