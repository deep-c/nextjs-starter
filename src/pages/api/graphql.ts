import { ApolloServer } from 'apollo-server-micro';
import type { MicroRequest } from 'apollo-server-micro/src/types';
import { makeSchema, objectType } from 'nexus';
import { User } from 'nexus-prisma';
import { getSession } from 'next-auth/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const schema = makeSchema({
  types: [
    objectType({
      name: User.$name,
      description: User.$description,
      definition(t) {
        t.nonNull.id('id');
        t.nullable.string('name');
        t.nullable.string('email');
      },
    }),
  ],
});

export const context = async ({ req }: { req: MicroRequest }) => {
  const session = await getSession({ req });
  return {
    user: session?.user,
  };
};

export default new ApolloServer({
  schema,
  context,
  playground: {
    settings: {
      'request.credentials': 'include',
      'schema.polling.enable': false,
    },
  },
}).createHandler({
  path: '/api/graphql',
});
