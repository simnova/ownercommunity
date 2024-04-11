// params
@maxLength(3)
param applicationPrefix string

@maxLength(3)
param environment string
@maxLength(12)
param location string

@maxLength(3)
param instanceName string
param resourcesToAlertList array
param emailAddressList array 
param smsReceiverList array
@maxLength(2)
param subgroupName string

// resource naming convention
module resourceNamingConvention '../global/resource-naming-convention.bicep' = {
  name: 'resourceNamingConventionModule${instanceName}'
  params: {
    environment: environment
    applicationPrefix: applicationPrefix
  }
}

// storage account
module activityLogAlertModule './activity-log-alerts.bicep' = {
  name: '${instanceName}${location}${subgroupName}ActivityLogAlerts'
  params: {
    actionGroups_name: '${applicationPrefix}${location}${subgroupName}'//max 12 chars allowed
    activityLogAlerts_name: '${applicationPrefix} ${location} ${subgroupName} Alerts'
    emailAddressList: emailAddressList
    alertList: resourcesToAlertList
    smsReceiversList: smsReceiverList
  }
}
