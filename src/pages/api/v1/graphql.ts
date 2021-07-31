import {
  ApolloServerPluginInlineTrace,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-micro';
import { send } from 'micro';
import cors from 'micro-cors';
import context from 'src/graphql/context';
import schema from 'src/graphql/schema';
import { GRAPHQL_V1_API } from 'src/routes';

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({
  schema,
  context,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground({
          settings: {
            'request.credentials': 'include',
            'schema.polling.enable': false,
            'tracing.hideTracingResponse': false,
          },
        }),
    ApolloServerPluginInlineTrace(),
  ],
});

const startServer = server.start();

export default cors()(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return send(res, 200);
  }
  await startServer;
  await server.createHandler({
    path: GRAPHQL_V1_API.path,
  })(req, res);
});
