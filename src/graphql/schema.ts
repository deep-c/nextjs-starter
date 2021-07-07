import path from 'path';
import NexusPrismaScalars from 'nexus-prisma/scalars';
import { makeSchema, fieldAuthorizePlugin, connectionPlugin } from 'nexus';
import * as allTypes from './types';

const schema = makeSchema({
  types: [allTypes, NexusPrismaScalars],
  outputs: {
    typegen: path.join(process.cwd(), 'generated/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated/schema.graphql'),
  },
  contextType: {
    module: path.join(process.cwd(), 'src/graphql/context.ts'),
    export: 'AppGqlContext',
  },
  plugins: [fieldAuthorizePlugin(), connectionPlugin()],
});

export default schema;
