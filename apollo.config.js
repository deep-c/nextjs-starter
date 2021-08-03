module.exports = {
  client: {
    excludes: ['**/__tests__/**/*', '**/schema.graphql'],
    service: {
      // Only exists when npm run build:nexus or npm run dev is run
      // and a GraphQL request made.
      localSchemaFile: './src/types/__gen__/nexus/schema.graphql',
      name: 'spa-graphql',
    },
    tagName: 'gql',
  },
};
