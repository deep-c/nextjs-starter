import path from 'path';

import { connectionPlugin, fieldAuthorizePlugin, makeSchema } from 'nexus';
import NexusPrismaScalars from 'nexus-prisma/scalars';

import * as sessionTypes from 'src/modules/session/graphql/type';
import * as userTypes from 'src/modules/user/graphql/type';

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
  types: [userTypes, sessionTypes, NexusPrismaScalars],
});

export default schema;
