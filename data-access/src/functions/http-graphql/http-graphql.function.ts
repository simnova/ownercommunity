import { wrapFunctionHandler } from '../core/telemetry/wrapper';

import { app } from '@azure/functions';
import { PortalTokenValidation } from '../../../seedwork/auth-seedwork-oidc/portal-token-validation';
import { GraphqlContextBuilder as ApolloContext } from './init/graphql-context-builder';
import { startServerAndCreateHandler } from './init/func-v4'; // to be replaced by @as-integrations/azure-functions after PR is merged
import { InfrastructureServicesBuilder } from '../../infrastructure-services-impl/infrastructure-services-builder';

import { ApolloServerRequestHandler } from './init/apollo-server-request-handler';
app.http('graphql', {
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  route: 'graphql/{*segments}',
  handler: wrapFunctionHandler(
    startServerAndCreateHandler(ApolloServerRequestHandler.getInstance().apolloServer, {
      context: async ({ req }) => {
        let context = new ApolloContext(InfrastructureServicesBuilder.getInstance(), PortalTokenValidation.getInstance());
        await context.init(req);
        return context;
      },
    })
  ),
});
