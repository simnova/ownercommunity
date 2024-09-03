@maxLength(3)
param applicationPrefix string

@description('The consumer group name.')
param consumerGroupName string

@maxLength(3)
param environment string

param location string

@maxLength(3)
param instanceName string

@description('Tags')
param tags object

@description('The event hub sku name.')
@allowed([
  'Basic'
  'Standard'
])
param eventHubSku string

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

// event hub
module eventHubResource './event-hub-resource.bicep' = {
  name : 'eventHubResourceModule${instanceName}'
  params: {
    location: location
    eventHubNamespaceName: '${resourceNamingConvention.outputs.prefix}${resourceNamingConvention.outputs.resourceTypes.eventHubNamespace}-${uniqueId}'
    eventHubName:'${applicationPrefix}-${resourceNamingConvention.outputs.resourceTypes.eventHub}'
    eventHubSku: eventHubSku
    consumerGroupName: consumerGroupName
    sharedAccessPolicyName: '${applicationPrefix}SharedAccessPolicy'
    tags: tags
  }
}
