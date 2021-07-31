module.exports = {
  client: {
    service: {
      name: 'spa-graphql',
      // Only exists when npm run build:nexus or npm run dev is run and a GraphQL request made.
      localSchemaFile: './src/types/__gen__/nexus/schema.graphql',
    },
    excludes: ['**/__tests__/**/*', '**/schema.graphql'],
    tagName: 'gql',
  },
};
