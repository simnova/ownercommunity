import '../telemetry/tracer';
import { wrapFunctionHandler } from '../telemetry/wrapper';

import { app } from '@azure/functions';
import { CosmosDbConnection } from '../../seedwork/services-seedwork-datastore-mongodb/cosmos-db-connection';
import { PortalTokenValidation } from '../auth/portal-token-validation';
import { ApolloServerRequestHandler } from '../graphql/init/apollo-server-request-handler';
import { GraphqlContextBuilder as ApolloContext } from '../graphql/init/graphql-context-builder';
import { startServerAndCreateHandler } from './func-v4'; // to be replaced by @as-integrations/azure-functions after PR is merged
import { InfrastructureServicesBuilder } from './infrastructure-services-builder';
import { tryGetEnvVar } from '../../seedwork/utils/get-env-var';
import { DomainImpl } from '../app/domain/domain-impl';

const portalTokenValidator = new PortalTokenValidation(new Map<string, string>([['AccountPortal', 'ACCOUNT_PORTAL']]));

async function init(infrastructureServices: InfrastructureServicesBuilder) {
  portalTokenValidator.Start();
  let cosmosDbConnection = CosmosDbConnection.getInstance(
    tryGetEnvVar('AZURE_TENANT_ID'),
    tryGetEnvVar('AZURE_SUBSCRIPTION_ID'),
    tryGetEnvVar('AZURE_RESOURCE_GROUP_NAME'),
    tryGetEnvVar('COSMOSDB_ACCOUNT_NAME'),
    tryGetEnvVar('COSMOSDB_NAME'),
    tryGetEnvVar('COSMOSDB_AUTO_INDEX') === 'true',
    tryGetEnvVar('COSMOSDB_AUTO_CREATE') === 'true',
    Number.parseInt(tryGetEnvVar('COSMOSDB_MIN_POOL_SIZE')),
    Number.parseInt(tryGetEnvVar('COSMOSDB_MAX_POOL_SIZE'))
  );
  await cosmosDbConnection.connect();
  const DomainImplInstance = new DomainImpl(
    infrastructureServices.datastore,
    infrastructureServices.cognitiveSearch,
    infrastructureServices.blobStorage,
    infrastructureServices.vercel
  );
  await DomainImplInstance.startup();
}

let infrastructureServices = new InfrastructureServicesBuilder();
init(infrastructureServices);
let apolloServerRequestHandler = new ApolloServerRequestHandler();

app.http('graphql', {
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  route: 'graphql/{*segments}',
  handler: wrapFunctionHandler(
    startServerAndCreateHandler(apolloServerRequestHandler.getServer(), {
      context: async ({ req }) => {
        let context = new ApolloContext();
        await context.init(req, portalTokenValidator, infrastructureServices);
        return context;
      },
    })
  ),
});
