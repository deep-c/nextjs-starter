import path from 'path';
import { ApolloServer } from 'apollo-server-micro';
import { makeSchema, fieldAuthorizePlugin } from 'nexus';
import * as allTypes from '@/graphql/schema';
import { context } from '@/graphql/context';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const schema = makeSchema({
  types: allTypes,
  outputs: {
    typegen: path.join(process.cwd(), 'generated/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated/schema.graphql'),
  },
  contextType: {
    module: path.resolve(require.resolve('@/graphql/context')),
    export: 'AppGqlContext',
  },
  plugins: [fieldAuthorizePlugin()],
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
