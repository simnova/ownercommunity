@description('Event Hub Namespace name')
param eventHubNamespaceName string

@description('Event Hub name')
param eventHubName string

@description('Shared Access Policy name')
param sharedAccessPolicyName string

@description('Consumer Group name')
param consumerGroupName string

@description('Event Hub location')
param location string

@description('messaging tier for the Event Hub Namespace')
@allowed([
  'Basic'
  'Standard'
])
param eventHubSku string = 'Standard'

@description('Tags')
param tags object

resource eventHubNamespace 'Microsoft.EventHub/namespaces@2021-11-01' = {
  name: eventHubNamespaceName
  location: location
  sku: {
    name: eventHubSku
    tier: 'Standard'
    capacity: 1
  }
  properties: {
    zoneRedundant: true
    isAutoInflateEnabled: false
    maximumThroughputUnits: 0
    kafkaEnabled: true
  }
  tags: tags
}

resource eventHub 'Microsoft.EventHub/namespaces/eventhubs@2021-11-01' = {
  name: eventHubName
  parent: eventHubNamespace
  properties: {
    messageRetentionInDays: 1
    partitionCount: 1
    status: 'Active'
  }
}

resource eventHubConsumerGroup 'Microsoft.EventHub/namespaces/eventhubs/consumergroups@2021-11-01' = {
  name: consumerGroupName
  parent: eventHub
  properties: {}
}

resource eventHubSharedAccessPolicy 'Microsoft.EventHub/namespaces/eventhubs/authorizationRules@2021-11-01' = {
  name: sharedAccessPolicyName
  parent: eventHub
  properties: {
    rights: [
      'Listen'
      'Send'
      'Manage'
    ]
  }
}
