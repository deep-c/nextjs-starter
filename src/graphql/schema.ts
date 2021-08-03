import path from 'path';

import { connectionPlugin, fieldAuthorizePlugin, makeSchema } from 'nexus';
import NexusPrismaScalars from 'nexus-prisma/scalars';

import * as allTypes from './types';

const schema = makeSchema({
  contextType: {
    export: 'AppGqlContext',
    module: path.join(process.cwd(), 'src/graphql/context.ts'),
  },
  outputs: {
    schema: path.join(process.cwd(), 'src/types/__gen__/nexus/schema.graphql'),
    typegen: path.join(
      process.cwd(),
      'src/types/__gen__/nexus/nexus-typegen.ts'
    ),
  },
  plugins: [
    fieldAuthorizePlugin(),
    connectionPlugin({ includeNodesField: true }),
  ],
  types: [allTypes, NexusPrismaScalars],
});

export default schema;
