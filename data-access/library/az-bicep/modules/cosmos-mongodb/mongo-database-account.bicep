@minLength(3)
@maxLength(44)
@description('name of the MongoDB account')
param mongoDatabaseAccountName string

@description('location of the MongoDB')
param location string

@description('totalThroughputLimit of the MongoDB')
param totalThroughputLimit int

@description('backupIntervalInMinutes of the MongoDB')
param backupIntervalInMinutes int

@description('backupRetentionIntervalInHours of the MongoDB')
param backupRetentionIntervalInHours int

@description('Tags')
param tags object

resource mongoDatabaseAccount 'Microsoft.DocumentDB/databaseAccounts@2022-08-15' = {
  name: mongoDatabaseAccountName
  location: location
  tags: tags
  kind: 'MongoDB'
  identity: {
    type: 'None'
  }
  properties: {
    publicNetworkAccess: 'Enabled'
    enableAutomaticFailover: false
    enableMultipleWriteLocations: false
    isVirtualNetworkFilterEnabled: false
    enableClientTelemetry: false
    virtualNetworkRules: []
    disableKeyBasedMetadataWriteAccess: false
    enableFreeTier: false
    enableAnalyticalStorage: false
    analyticalStorageConfiguration: {
      schemaType: 'FullFidelity'
    }
    databaseAccountOfferType: 'Standard'
    defaultIdentity: 'FirstPartyIdentity'
    networkAclBypass: 'None'
    disableLocalAuth: false
    enablePartitionMerge: false
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
      maxIntervalInSeconds: 5
      maxStalenessPrefix: 100
    }
    configurationOverrides: {
      EnableBsonSchema: 'True'
    }
    apiProperties: {
      serverVersion: '4.2'
    }
    locations: [
      {
        locationName: location
        // provisioningState: 'Succeeded'
        failoverPriority: 0
        isZoneRedundant: false
      }
    ]
    cors: []
    capabilities: [
      {
        name: 'EnableMongo'
      }
      {
        name: 'DisableRateLimitingResponses'
      }
    ]
    ipRules: []
    backupPolicy: {
      type: 'Periodic'
      periodicModeProperties: {
        backupIntervalInMinutes: backupIntervalInMinutes
        backupRetentionIntervalInHours: backupRetentionIntervalInHours
        backupStorageRedundancy: 'Geo'
      }
    }
    networkAclBypassResourceIds: []
    capacity: {
      totalThroughputLimit: totalThroughputLimit
    }
    // keysMetadata: {
    // }
  }
}


output mongoDatabaseAccountName string = mongoDatabaseAccount.name
