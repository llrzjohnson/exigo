import { fieldAuthorizePlugin, makeSchema } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';
import * as path from 'path';

import MultipleOptionsQuizItemFragment from './MultipleOptionsQuizItemFragment';
import Mutation from './Mutation';
import NumericQuizItemFragment from './NumericQuizItemFragment';
import Option from './Option';
import Query from './Query';
import Quiz from './Quiz';
import QuizItem from './QuizItem';
import User from './User';

const isFileSystemReadOnly = Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);

export default makeSchema({
  types: [
    Query,
    Mutation,
    MultipleOptionsQuizItemFragment,
    NumericQuizItemFragment,
    Option,
    Quiz,
    QuizItem,
    User,
  ],
  plugins: [
    nexusPrismaPlugin({
      // TODO: Remove once Nexus emits generated types to a facade package
      shouldGenerateArtifacts: !isFileSystemReadOnly,
    }),
    fieldAuthorizePlugin(),
  ],
  outputs: {
    schema: path.join(__dirname, '../../../../prisma/schema.generated.graphql'),
    // TODO: Remove once Nexus emits generated types to a facade package
    typegen: path.join(__dirname, '../nexus.generated.d.ts'),
  },
  typegenAutoConfig: {
    sources: [
      { source: '@prisma/photon', alias: 'photon' },
      { source: require.resolve('../context'), alias: 'context' },
    ],
    contextType: 'context.Context',
  },
  prettierConfig: !isFileSystemReadOnly
    ? require.resolve('../../../../../.prettierrc')
    : undefined,
});
