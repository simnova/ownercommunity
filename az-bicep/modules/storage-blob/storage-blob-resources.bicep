// == PARAMETERS ==

// storage account
@description('Storage Account location.')
param location string
@minLength(3)
@maxLength(24)
@description('Storage Account name.')
param storageAccountName string
@description('Storage Account Sku')
@allowed([
  'Standard_LRS'
  'Standard_GRS'
  'Standard_RAGRS'
  'Standard_ZRS'
  'Premium_LRS'
])
param storageAccountSku string

// storage account management policies
@description('Define Lifecycle Management Policy for the storage account?')
param enableManagementPolicy bool
@description('Number of days to retain the blob in the storage account.')
param deleteAfterNDaysList array

// blob containers
@description('Array of Container objects')
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

@description('Tags')
param tags object

// == RESOURCES ==

// storage account
resource storageAccount 'Microsoft.Storage/storageAccounts@2022-05-01' = {
  name: storageAccountName
  sku: {
    name: storageAccountSku
  }
  tags: tags
  kind: 'StorageV2'
  location: location
  properties: {
    supportsHttpsTrafficOnly: true  
  }
}

// storage account management policies
resource storageAccountManagementPolicy 'Microsoft.Storage/storageAccounts/managementPolicies@2022-05-01' = if (enableManagementPolicy) {
  name: '${storageAccount.name}/default'
  properties: {
    policy: {
      rules: [for deleteAfterNDays in deleteAfterNDaysList: {
        name: 'delete-greater-than-${deleteAfterNDays}-days'
        enabled: true
        type: 'Lifecycle'
        definition: {
          filters: {
            blobTypes: [
              'blockBlob'
            ]
            blobIndexMatch: [
              {
                name: 'deleteAfterDays'
                op: '=='
                value: '${deleteAfterNDays}'
              }
            ]
          }
          actions: {
            baseBlob: {
              delete: {
                daysAfterCreationGreaterThan: deleteAfterNDays
              }
            }
          }
        }          
      }]
    }
  }
}


resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2022-05-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    cors: {
      corsRules: [
        {
          allowedOrigins: corsAllowedOrigins
          allowedMethods: corsAllowedMethods
          allowedHeaders: corsAllowedHeaders
          exposedHeaders: corsExposedHeaders
          maxAgeInSeconds: corsMaxAgeInSeconds
        }
      ]
    }
    deleteRetentionPolicy: {
      allowPermanentDelete: false
      enabled: false
    }
  }
}


// blob containers
resource blobContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2022-05-01' = [for container in containers: {
  name: '${storageAccount.name}/default/${container.name}'
  properties: {
    publicAccess: container.publicAccess
  }
}]


// == OUTPUTS ==

output storageAccountName string = storageAccount.name
output storageAccountId string = storageAccount.id
