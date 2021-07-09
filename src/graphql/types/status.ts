import { enumType } from 'nexus';
import { Status } from 'nexus-prisma';

export const statusType = enumType({
  name: Status.name,
  description: Status.description,
  members: Status.members,
});
