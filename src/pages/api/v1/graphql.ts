import { ApolloServer } from 'apollo-server-micro';
import context from '@/graphql/context';
import schema from '@/graphql/schema';
import { GRAPHQL_V1_API } from '@/routes';

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({
  schema,
  context,
  playground: {
    settings: {
      'request.credentials': 'include',
      'schema.polling.enable': false,
    },
  },
  tracing: process.env.NODE_ENV === 'development',
});

export default server.createHandler({
  path: GRAPHQL_V1_API.path,
});