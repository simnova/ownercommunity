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

@description('Define Lifecycle Management Policy for the storage account?')
param enableManagementPolicy bool
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
@description('Array of exposed headers for CORS.')
param corsExposedHeaders array
@description('Number of seconds to cache the preflight response for CORS.')
param corsMaxAgeInSeconds int

@maxLength(3)
param instanceName string

@description('Tags')
param tags object

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
module storageBlobResources './storage-blob-resources.bicep' = {
  name: 'storageBlobResourcesModule${instanceName}'
  params: {
    location: location
    storageAccountName:'${resourceNamingConvention.outputs.smallPrefix}${resourceNamingConvention.outputs.resourceTypes.storageAccount}${instanceName}${uniqueId}'
    storageAccountSku: storageAccountSku
    enableManagementPolicy: enableManagementPolicy
    deleteAfterNDaysList: deleteAfterNDaysList
    containers: containers
    corsAllowedOrigins: corsAllowedOrigins
    corsAllowedMethods: corsAllowedMethods
    corsAllowedHeaders: corsAllowedHeaders
    corsExposedHeaders: corsExposedHeaders
    corsMaxAgeInSeconds: corsMaxAgeInSeconds
    tags: tags
  }
}
                       