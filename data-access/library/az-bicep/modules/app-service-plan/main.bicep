// params
@maxLength(3)
param applicationPrefix string

@maxLength(3)
param environment string

param location string

@description('App Service Plan sku')
@allowed([
  //name  Tier          Full name
  'D1'  //Shared      an D1 Shared
  'F1'   //Free        an F1 Free
  'B1'   //Basic       an B1 Basic
  'B2'   //Basic       an B2 Basic
  'B3'   //Basic       an B3 Basic
  'S1'   //Standard    an S1 Standard
  'S2'   //Standard    an S2 Standard
  'S3'   //Standard    an S3 Standard
  'P1'   //Premium     an P1 Premium
  'P2'   //Premium     an P2 Premium
  'P3'   //Premium     an P3 Premium
  'P1V2' //PremiumV2   an P1V2 PremiumV2
  'P2V2' //PremiumV2   an P2V2 PremiumV2
  'P3V2' //PremiumV2   an P3V2 PremiumV2
  'I1'   //Isolated    an I2 Isolated
  'I2'   //Isolated    an I2 Isolated
  'I3'   //Isolated    an I3 Isolated
  'Y1'   //Dynamic     a  function consumption plan
  'EP1'  //ElasticPremium
  'EP2'  //ElasticPremium
  'EP3'   //ElasticPremium
])
param sku string

@description('App Service Plan Operating System')
@allowed([
  'linux'
  // 'windows'  // commenting this because windows configuration is not known at this time
])
param operatingSystem string
@description('App Service Plan Tags')
param tags object


@maxLength(7)
param instanceName string

// variables
var moduleNameSuffix = '-Module-${applicationPrefix}-${environment}-asp-${instanceName}'


// resource naming convention
module resourceNamingConvention '../global/resource-naming-convention.bicep' = {
  name: 'resourceNamingConvention${moduleNameSuffix}'
  params: {
    environment: environment
    applicationPrefix: applicationPrefix
  }
}

// storage account
module appServicePlanResources './app-service-plan.bicep' = {
  name: 'appServicePlanResources${moduleNameSuffix}'
  params: {
    location: location
    appServicePlanName: '${resourceNamingConvention.outputs.prefix}${resourceNamingConvention.outputs.resourceTypes.appServicePlan}-${instanceName}'
    sku: sku
    operatingSystem: operatingSystem
    tags: tags
  }
}

output appServicePlanName string = appServicePlanResources.outputs.appServicePlanName
output appServicePlanId string = appServicePlanResources.outputs.appServicePlanId
output instanceName string = instanceName
