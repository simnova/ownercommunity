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

// activity log alert
module activityLogAlert '../../az-bicep/modules/activity-log-alerts/main.bicep' = [for instance in envParams.activityLogAlert.instances: if(instance.run == true) {
  name: 'activity-log-alert-${instance.name}-${instance.location}-${instance.subgroupName}'
  params: {
    applicationPrefix: applicationPrefix
    emailAddressList: instance.emailAddressList
    smsReceiverList: instance.smsReceiverList
    subgroupName: instance.subgroupName
    resourcesToAlertList: instance.resourcesToAlert
    location: instance.location
    environment: environment
    instanceName: instance.name
  }
}]
