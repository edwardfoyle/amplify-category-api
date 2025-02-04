#!/usr/bin/env node
import 'source-map-support/register';
import { App, Stack, Duration } from 'aws-cdk-lib';
// @ts-ignore
import { AmplifyGraphqlApi, AmplifyGraphqlSchema } from '@aws-amplify/graphql-construct-alpha';

const packageJson = require('../package.json');

const app = new App();
const stack = new Stack(app, packageJson.name.replace(/_/g, '-'), {
  env: { region: process.env.CLI_REGION || 'us-west-2' },
});

new AmplifyGraphqlApi(stack, 'GraphqlApi', {
  apiName: 'MyGraphQLApi',
  schema: AmplifyGraphqlSchema.fromString(/* GraphQL */ `
    type Todo @model @auth(rules: [{ allow: public }]) {
      description: String!
    }
  `),
  authorizationConfig: {
    apiKeyConfig: { expires: Duration.days(7) },
  },
});
