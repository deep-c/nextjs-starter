import { inputObjectType } from 'nexus';
import { User } from 'nexus-prisma';

export default inputObjectType({
  definition(t) {
    t.field(User.name);
    t.field(User.image);
    t.field(User.bio);
  },
  name: 'UpdateMeInput',
});
