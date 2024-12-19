import { wrapFunctionHandler } from '../core/telemetry/wrapper';

import { v4 } from '@as-integrations/azure-functions';
import { app } from '@azure/functions';
import { PortalTokenValidation } from '../../../seedwork/auth-seedwork-oidc/portal-token-validation';
import { InfrastructureServicesBuilder } from '../../infrastructure-services-impl/infrastructure-services-builder';
import { GraphqlContextBuilder as ApolloContext } from './init/graphql-context-builder';
import { ApolloServerRequestHandler } from './init/apollo-server-request-handler';

app.http('graphql', {
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  route: 'graphql/{*segments}',
  handler: wrapFunctionHandler(
    v4.startServerAndCreateHandler(ApolloServerRequestHandler.getInstance().apolloServer, {
      context: async ({ req }) => {
        let context = new ApolloContext(InfrastructureServicesBuilder.getInstance(), PortalTokenValidation.getInstance());
        await context.init(req);
        return context;
      },
    })
  ),
});
