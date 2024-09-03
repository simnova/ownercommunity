param actionGroups_name string
param activityLogAlerts_name string 
param emailAddressList array
param smsReceiversList array
param alertList array

var alertScope = '/subscriptions/${subscription().subscriptionId}'

resource actionGroups 'microsoft.insights/actionGroups@2019-06-01' = {
  name: actionGroups_name
  location: 'Global'
  properties: {
    groupShortName: actionGroups_name
    enabled: true
    emailReceivers: emailAddressList
    smsReceivers: smsReceiversList
    webhookReceivers: []
  }
}

resource activityLogAlerts 'microsoft.insights/activityLogAlerts@2017-04-01' = {
  name: activityLogAlerts_name
  location: 'Global'
  properties: {
    scopes: [
      alertScope
    ]
    condition: {
      allOf: alertList
    }
    actions: {
      actionGroups: [
        {
          actionGroupId: actionGroups.id
          webhookProperties: {}
        }
      ]
    }
    enabled: true
  }
}
