// params
@maxLength(3)
param applicationPrefix string

@maxLength(3)
param environment string

param location string

@description('The storage account sku name.')
@allowed([
  'Standard_LRS'
  'Standard_GRS'
  'Standard_RAGRS'
  'Standard_ZRS'
  'Premium_LRS'
])
param storageAccountSku string

@description('Array of Queue objects.')
param queues array

@maxLength(3)
param instanceName string

@description('Tags')
param tags object

@description('Define Lifecycle Management Policy for the storage account?')
param enableManagementPolicy bool
@description('Enable Blob Service for the storage account?')
param enableBlobService bool
@description('Number of days to retain the blob in the storage account.')
param deleteAfterNDaysList array

@description('Array of Container objects.')
param containers array
@description('Array of allowed origins for CORS.')
param corsAllowedOrigins array
@description('Array of allowed methods for CORS.')
param corsAllowedMethods array
@description('Array of allowed headers for CORS.')
param corsAllowedHeaders array

// variables
var uniqueId = uniqueString(resourceGroup().id)


// resource naming convention
module resourceNamingConvention '../global/resource-naming-convention.bicep' = {
  name: 'resourceNamingConventionModule${instanceName}'
  params: {
    environment: environment
    applicationPrefix: applicationPrefix
  }
}

// storage account
module storageQueueResources './storage-queue-resources.bicep' = {
  name: 'storageQueueResourcesModule${instanceName}'
  params: {
    location: location
    storageAccountName:'${resourceNamingConvention.outputs.smallPrefix}${resourceNamingConvention.outputs.resourceTypes.storageAccount}${instanceName}${uniqueId}'
    storageAccountSku: storageAccountSku
    queues: queues
    tags: tags
    enableManagementPolicy: enableManagementPolicy
    deleteAfterNDaysList: deleteAfterNDaysList
    containers: containers
    corsAllowedOrigins: corsAllowedOrigins
    corsAllowedMethods: corsAllowedMethods
    corsAllowedHeaders: corsAllowedHeaders
    enableBlobService: enableBlobService
  }
}
                       