module.exports = {
  client: {
    excludes: ['tests/**/*', '**/schema.graphql'],
    service: {
      // Only exists when npm run build:nexus or npm run dev is run
      // and a GraphQL request made.
      localSchemaFile: '.generated/graphql/schema.graphql',
      name: 'spa-graphql',
    },
    tagName: 'gql',
  },
};
