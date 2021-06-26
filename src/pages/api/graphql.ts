import { ApolloServer } from 'apollo-server-micro';
import { makeSchema } from 'nexus';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const schema = makeSchema({
  types: [],
});

export default new ApolloServer({ schema }).createHandler({
  path: '/api/graphql',
});
