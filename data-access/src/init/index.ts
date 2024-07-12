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
import { testHandler } from '../http/test-handler';
import { TestQueueHandler } from '../queue/test-queue-handler';
import { TestTimerHandler } from '../timer/test-timer-handler';
import { QueueContextBuilderImpl } from '../queue/init/queue-context-builder-impl';
import { HttpContextBuilderImpl } from '../http/init/http-context-builder-impl';
import { TimerContextBuilderImpl } from '../timer/init/timer-context-builder-impl';
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
    infrastructureServices.payment,
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
        let context = new ApolloContext(req, portalTokenValidator, new InfrastructureServicesBuilder());
        await context.init();
        return context;
      },
    })
  ),
});

app.http('http-test', {
  methods: ['GET'],
  route: 'http-test',
  handler: async (req) => {
    let context = new HttpContextBuilderImpl(req, portalTokenValidator, new InfrastructureServicesBuilder());
    await context.init();
    return testHandler(context);
  }
})

app.storageQueue('TestQueue', {
  queueName: 'test-queue',
  connection: 'QUEUE_STORAGE_URL',
  handler: async (queueItem, invocationContext) => {
    let context = new QueueContextBuilderImpl(queueItem, invocationContext, new InfrastructureServicesBuilder());
    await context.init();
    return TestQueueHandler(context);
  }
});

app.timer('TimerTrigger', {
  schedule: "0 */5 * * * *",
  handler: async (timer, invocationContext) => {
    let context = new TimerContextBuilderImpl(timer, invocationContext, new InfrastructureServicesBuilder());
    await context.init();
    return TestTimerHandler(context);
  }
});