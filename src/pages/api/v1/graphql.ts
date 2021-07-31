import { ApolloServer } from 'apollo-server-micro';
import type { NextApiRequest, NextApiResponse } from 'next';
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
});

const startServer = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await server.createHandler({
    path: GRAPHQL_V1_API.path,
  })(req, res);
}
