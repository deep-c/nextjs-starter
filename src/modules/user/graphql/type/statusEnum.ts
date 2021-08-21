import { enumType } from 'nexus';
import { Status } from 'nexus-prisma';

export default enumType({
  description: Status.description,
  members: Status.members,
  name: Status.name,
});
