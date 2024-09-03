// == PARAMETERS ==

@description('Resource Location')
param location string

// app service plan
@description('App Service Plan Name')
param appServicePlanName string

// storage account
@description('Storage Acccount name')
@maxLength(24)
param storageAccountName string

// function app
@description('Function App name')
@minLength(2)
@maxLength(60)
param functionAppName string
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

// == RESOURCES ==

// app service plan for function app
resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' existing = {
  name: appServicePlanName
}

// storage account
resource storageAccount 'Microsoft.Storage/storageAccounts@2022-05-01' existing = {
  name: storageAccountName
}

// function app
resource functionApp 'Microsoft.Web/sites@2022-03-01' = {
  name: functionAppName
  location: location
  kind: 'functionapp'
  tags: functionAppTags
  identity: {
    type: 'SystemAssigned'
  }
  properties: { 
    serverFarmId: appServicePlan.id  
    httpsOnly: true
    siteConfig: {      
      appSettings: [
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
        }
        {
          name: 'WEBSITE_CONTENTAZUREFILECONNECTIONSTRING'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
        }             
        {
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: functionWorkerRuntime
        }
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: functionExtensionVersion
        }
        {
          name: 'WEBSITES_CONTAINER_START_TIME_LIMIT'
          value: '1800'
        }
        {
          name: 'ENABLE_ORYX_BUILD'
          value: 'false'
        }
        {
          name: 'SCM_DO_BUILD_DURING_DEPLOYMENT'
          value: 'false'
        }
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: '1'
        }
        {
          name: 'languageWorkers__node__arguments'
          value: '--max-old-space-size=${maxOldSpaceSizeMB}'
        }
      ]
      linuxFxVersion: linuxFxVersion
      localMySqlEnabled: false
      netFrameworkVersion: null
      // alwaysOn: true
      cors: {
        allowedOrigins: allowedOrigins
        supportCredentials: true
      }
      ipSecurityRestrictions: [
        {
            ipAddress: 'AzureFrontDoor.Backend'
            action: 'Allow'
            tag: 'ServiceTag'
            priority: 100
            name: 'Allow Front Door Only'
            description: 'Allow traffic through Front Door only'
        }
        {
            ipAddress: 'Any'
            action: 'Deny'
            priority: 2147483647
            name: 'Deny all'
            description: 'Deny all access'
        }
      ]
      scmIpSecurityRestrictions: [
        {
            ipAddress: 'Any'
            action: 'Allow'
            priority: 2147483647
            name: 'Allow all'
            description: 'Allow all access'
        }
      ]
      scmIpSecurityRestrictionsUseMain: false
    }
  }
}

// create access policy for key vault
resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}
resource addKeyVaultAccessPolicy 'Microsoft.KeyVault/vaults/accessPolicies@2022-07-01' = {
  name: 'add'
  parent: keyVault
  properties: {
    accessPolicies: [
      {
        tenantId: subscription().tenantId
        objectId: functionApp.identity.principalId
        permissions: {
          certificates: []
          keys: []
          secrets: [
            'get'
            'list'
          ]
        }
      }
    ]
  }
}
