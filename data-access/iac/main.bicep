// params
@allowed([
  'prd' //resource group is corp-prd-rg
  'uat' //resource group is corp-uat-rg
  'qa'  //resource group is corp-qa-rg
  'dev' //resource group is corp-dev-rg
  'cor' //resource group is corp-core-rg
  'trn' //resource group is corp-trn-rg
])
param environment string

// Read Parameters files
var paramsJson = loadJsonContent('./parameters.json')
var envParams = paramsJson.env[environment]
var applicationPrefix = paramsJson.applicationPrefix
var appServicePlanApplicationPrefix = paramsJson.appServicePlanApplicationPrefix

var moduleNameSuffix = '-Module-main-${applicationPrefix}-${environment}'

// app service plan
module appServicePlan '../../az-bicep/modules/app-service-plan/main.bicep' = [for instance in envParams.appServicePlan.instances: if(instance.run == true) {
  name: 'appServicePlan${moduleNameSuffix}-${instance.name}'
  params: {
    applicationPrefix: appServicePlanApplicationPrefix
    environment: environment
    location: instance.location
    sku: instance.sku
    operatingSystem: instance.operatingSystem
    tags: instance.tags
    instanceName: instance.name
  }
}]

// application insights
// module applicationInsights '../../az-bicep/modules/application-insights/main.bicep' = [for instance in envParams.applicationInsights.instances: if(instance.run == true) {
//   name: 'applicationInsights${moduleNameSuffix}-${instance.name}'
//   params: {
//     applicationPrefix: applicationPrefix
//     workspaceName: 'cxa-${applicationPrefix}-${environment}-log'
//     applicationInsightsName: '${applicationPrefix}-${environment}-${instance.name}'
//     actionGroups: instance.actionGroups
//     scheduledQueryRules: instance.scheduledQueryRules
//     location: instance.location
//     applicationInsightsTags: instance.tags
//     runActionGroups: instance.runActionGroups
//     runScheduledQueryRules: instance.runScheduledQueryRules
//   }
// }]

// function app
module functionApp '../../az-bicep/modules/function-app/main.bicep' = [for instance in envParams.functionApp.instances: if(instance.run == true) {
  name: 'functionApp${moduleNameSuffix}-${instance.name}'
  dependsOn: appServicePlan
  params: {
    applicationPrefix: applicationPrefix
    environment: environment
    location: instance.location
    appServicePlanName: instance.appServicePlanName
    appServicePlanSku: instance.appServicePlanSku
    storageAccountName: instance.storageAccountName
    functionWorkerRuntime: instance.functionApp.functionWorkerRuntime
    functionExtensionVersion: instance.functionApp.functionExtensionVersion
    maxOldSpaceSizeMB: instance.functionApp.maxOldSpaceSizeMB
    linuxFxVersion: instance.functionApp.linuxFxVersion
    functionAppTags: instance.tags
    instanceName: instance.name
    allowedOrigins: envParams.functionApp.allowedOrigins
    keyVaultName: envParams.keyVault.name
  }
}]

// storage account
module storageAccount '../../az-bicep/modules/storage-account/main.bicep' = [for instance in envParams.storageAccount.instances: if(instance.run == true) {
  name: 'storageAccount${moduleNameSuffix}-${instance.name}'
  params: {
    applicationPrefix: applicationPrefix
    environment: environment
    instanceName: instance.name
    location: instance.location
    storageAccountSku: instance.sku
    enableManagementPolicy: instance.managementPolicy.enable
    deleteAfterNDaysList: instance.managementPolicy.deleteAfterNDaysList
    enableBlobService: instance.enableBlobService
    containers: instance.containers
    enableQueueService: instance.enableQueueService
    queues: instance.queues
    corsAllowedMethods: instance.cors.allowedMethods
    corsAllowedOrigins: instance.cors.allowedOrigins
    corsAllowedHeaders: instance.cors.allowedHeaders
    corsExposedHeaders: instance.cors.exposedHeaders
    corsMaxAgeInSeconds: instance.cors.maxAgeInSeconds
    enableTableService: instance.enableTableService
    tables: instance.tables
    tags: instance.tags
  }
}]
