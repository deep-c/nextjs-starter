import { ApolloServer } from 'apollo-server-micro';
import type { MicroRequest } from 'apollo-server-micro/src/types';
import { makeSchema } from 'nexus';
import { getSession } from 'next-auth/client';
import * as allTypes from '@/graphql';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const schema = makeSchema({
  types: allTypes,
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
