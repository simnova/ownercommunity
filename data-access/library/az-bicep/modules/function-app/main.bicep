// params
@maxLength(3)
param applicationPrefix string

@maxLength(3)
param environment string

param location string

// app service plan
@description('App Service Plan Name')
param appServicePlanName string
@description('App Service Plan SKU')
param appServicePlanSku string

// storage account
@description('Storage Acccount name')
@maxLength(24)
param storageAccountName string

@description('The language worker runtime to load in the function app.')
@allowed([
  'node'
  'dotnet'
  'java'
])
param functionWorkerRuntime string = 'node'
@description('The version of the Functions runtime that hosts your function app.')
param functionExtensionVersion string = '~4'
@description('The maximum memory size of V8 old memory section.')
param maxOldSpaceSizeMB string
@description('Linux App Framework and Version')
param linuxFxVersion string = 'Node|16'
@description('Function App tags')
param functionAppTags object
@description('Function App Allowed Origins')
param allowedOrigins array
@description('Key Vault Name')
param keyVaultName string

@maxLength(3)
param instanceName string

// variables
var uniqueId = uniqueString(resourceGroup().id)
var moduleNameSuffix = '-Module-${applicationPrefix}-${environment}-func-${instanceName}'


// resource naming convention
module resourceNamingConvention '../global/resource-naming-convention.bicep' = {
  name: 'resourceNamingConvention${moduleNameSuffix}'
  params: {
    environment: environment
    applicationPrefix: applicationPrefix
  }
}

var functionAppName = '${resourceNamingConvention.outputs.prefix}${resourceNamingConvention.outputs.resourceTypes.functionApp}-${instanceName}-${uniqueId}'

// function app
module functionAppResourcesB2 './function-app-resources-B2.bicep' = if (appServicePlanSku == 'B2') {
  name: 'functionAppResourcesB2${moduleNameSuffix}'
  params: {
    location: location
    appServicePlanName: appServicePlanName
    storageAccountName: storageAccountName
    functionAppName: functionAppName
    functionWorkerRuntime: functionWorkerRuntime
    functionExtensionVersion: functionExtensionVersion
    maxOldSpaceSizeMB: maxOldSpaceSizeMB
    linuxFxVersion: linuxFxVersion
    functionAppTags: functionAppTags
    allowedOrigins: allowedOrigins
    keyVaultName: keyVaultName
  }
}
module functionAppResourcesEP1 './function-app-resources-EP1.bicep' = if (appServicePlanSku == 'EP1') {
  name: 'functionAppResourcesEP1${moduleNameSuffix}'
  params: {
    location: location
    appServicePlanName: appServicePlanName
    storageAccountName: storageAccountName
    functionAppName: functionAppName
    functionWorkerRuntime: functionWorkerRuntime
    functionExtensionVersion: functionExtensionVersion
    maxOldSpaceSizeMB: maxOldSpaceSizeMB
    linuxFxVersion: linuxFxVersion
    functionAppTags: functionAppTags
    allowedOrigins: allowedOrigins
    keyVaultName: keyVaultName
  }
}
                       