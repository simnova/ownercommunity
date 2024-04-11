@description('The location into which the resources should be deployed.')
param location string
// params
@maxLength(3)
param applicationPrefix string
@maxLength(3)
param environment string
@allowed([
  'free'
  'basic'
  'standard'
  'standard2'
  'standard3'
  'storage_optimized_l1'
  'storage_optimized_l2'
])
@description('The pricing tier of the search service you want to create (for example, basic or standard).')
param sku string
param tags object
param replicaCount int
param partitionCount int

@maxLength(3)
param instanceName string

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

module coginitiveServices './search-service.bicep' = {
  name: 'cognitiveServicesModule${instanceName}'
  params: {
    location: location
    searchServiceName: '${resourceNamingConvention.outputs.smallPrefix}${resourceNamingConvention.outputs.resourceTypes.searchService}${instanceName}${uniqueId}'
    sku : sku
    tags: tags
    replicaCount: replicaCount
    partitionCount: partitionCount
  }
}
