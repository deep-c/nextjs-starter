import path from 'path';
import { ApolloServer } from 'apollo-server-micro';
import { makeSchema } from 'nexus';
import * as allTypes from '@/graphql/schema';
import { context } from '@/graphql/context';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const schema = makeSchema({
  types: allTypes,
  contextType: {
    module: path.resolve(require.resolve('@/graphql/context')),
    export: 'AppGqlContext',
  },
});

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
