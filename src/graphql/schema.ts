import path from 'path';
import { makeSchema, fieldAuthorizePlugin, connectionPlugin } from 'nexus';
import * as allTypes from './types';

const schema = makeSchema({
  types: allTypes,
  outputs: {
    typegen: path.join(process.cwd(), 'generated/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated/schema.graphql'),
  },
  contextType: {
    module: path.resolve(require.resolve('@/graphql/context')),
    export: 'AppGqlContext',
  },
  plugins: [fieldAuthorizePlugin(), connectionPlugin()],
});

export default schema;
