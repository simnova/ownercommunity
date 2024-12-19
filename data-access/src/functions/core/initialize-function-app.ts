import { PortalTokenValidation } from "../../../seedwork/auth-seedwork-oidc/portal-token-validation";
import { CosmosDbConnection } from "../../../seedwork/services-seedwork-datastore-mongodb/cosmos-db-connection";
import { GlDailySummaryStorageProviderBlobImpl } from "../../../seedwork/services-seedwork-finance/gl-daily-summary-storage-provider-blob";
import { tryGetEnvVar } from "../../../seedwork/utils/get-env-var";
import { DomainImpl } from "../../app/domain/domain-impl";
import { InfrastructureServicesBuilder } from "../../infrastructure-services-impl/infrastructure-services-builder";


export async function initializeFunctionApp() {
  // Initialize the portal token validation
  PortalTokenValidation.initialize(new Map<string, string>([
    ['AccountPortal', 'ACCOUNT_PORTAL'],
    ['StaffPortal', 'STAFF_PORTAL'],
  ]));
  PortalTokenValidation.getInstance().Start();

  // Initialize the CosmosDbConnection
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

  // Initialize the infrastructure services
  await InfrastructureServicesBuilder.initialize();
  const infrastructureServices = InfrastructureServicesBuilder.getInstance();

  // Initialize the domain
  const DomainImplInstance = new DomainImpl(
    infrastructureServices.datastore,
    infrastructureServices.cognitiveSearch,
    infrastructureServices.blobStorage,
    infrastructureServices.payment,
    infrastructureServices.vercel
  );
  await DomainImplInstance.startup();

  GlDailySummaryStorageProviderBlobImpl.initialize({
    blobStorage: infrastructureServices.blobStorage,
    blobContainerName: 'finance',
    blobBasePath: 'daily-gl-summaries'
  })
}
