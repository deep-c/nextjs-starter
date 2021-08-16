import path from 'path';

import { connectionPlugin, fieldAuthorizePlugin, makeSchema } from 'nexus';
import NexusPrismaScalars from 'nexus-prisma/scalars';

import * as allTypes from './types';

const generatedDir = path.join(process.cwd(), '.generated', 'graphql');

const schema = makeSchema({
  contextType: {
    export: 'AppGqlContext',
    module: path.join(process.cwd(), 'src/graphql/context.ts'),
  },
  outputs: {
    schema: path.join(generatedDir, 'schema.graphql'),
    typegen: path.join(generatedDir, 'nexus-typegen.ts'),
  },
  plugins: [
    fieldAuthorizePlugin(),
    connectionPlugin({ includeNodesField: true }),
  ],
  types: [allTypes, NexusPrismaScalars],
});

export default schema;
