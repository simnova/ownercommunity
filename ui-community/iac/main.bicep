// params
@allowed([
  'prd' //resource group is corp-prd-rg
  'uat' //resource group is corp-uat-rg
  'qa'  //resource group is corp-qa-rg
  'dev' //resource group is corp-dev-rg
  'trn' //resource group is corp-trn-rg
  'cor' //resource group is corp-core-rg
])
param environment string

// Read Parameters files
var paramsJson = loadJsonContent('./parameters.json')
var envParams = paramsJson.env[environment]
var applicationPrefix = paramsJson.applicationPrefix
     
// static website
module staticWebsite '../../az-bicep/modules/static-website-no-customdomain/main.bicep' = [for instance in envParams.staticWebsite.instances: if(instance.run) {
  name: 'staticWebsiteModule-${instance.name}'
  params: {
    applicationPrefix: applicationPrefix
    instanceName: instance.name
    environment: environment
    storageAccountLocation: instance.storageAccount.location
    storageAccountSku: instance.storageAccount.sku
    cdnLocation: instance.cdn.location
    cdnSku: instance.cdn.sku
    cdnRules: instance.cdn.rules
    googleAnalyticsSha256: instance.cdn.googleAnalyticsSha256
    // customDomainName: instance.cdn.customDomainName
    corsAllowedMethods: instance.storageAccount.cors.allowedMethods
    corsAllowedOrigins: instance.storageAccount.cors.allowedOrigins
    corsAllowedHeaders: instance.storageAccount.cors.allowedHeaders
    corsExposedHeaders: instance.storageAccount.cors.exposedHeaders
    corsMaxAgeInSeconds: instance.storageAccount.cors.maxAgeInSeconds
    tags: instance.tags
    cdnProfileName: instance.cdn.profileName
  }
}]
