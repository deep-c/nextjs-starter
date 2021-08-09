import { enumType } from 'nexus';
import { Status } from 'nexus-prisma';

// eslint-disable-next-line import/prefer-default-export
export const statusType = enumType({
  description: Status.description,
  members: Status.members,
  name: Status.name,
});
