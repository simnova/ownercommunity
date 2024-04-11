// == PARAMETERS ==
@maxLength(3)
param applicationPrefix string
@description('Create action groups.')
param runActionGroups bool = false
@description('Create alert rules.')
param runScheduledQueryRules bool = false
@description('Name of the workspace where the data will be stored.')
param workspaceName string
@description('Application Insights name.')
param applicationInsightsName string
@description('Action Groups.')
param actionGroups array = []
@description('Scheduled Query Rules.')
param scheduledQueryRules array = []
@description('Application Insights location.')
param location string
@description('Application Insights tags.')
param applicationInsightsTags object
// @description('The time aggregation type to use for the metric measure column.')
// @allowed([
//   'Average'
//   'Count'
//   'Maximum'
//   'Minimum'
//   'Total'
// ])
// param scheduledQueryRulesTimeAggregation string
// @description('The operator to use for the metric measure column.')
// @allowed([
//   'GreaterThan'
//   'GreaterThanOrEqual'
//   'LessThan'
//   'LessThanOrEqual'
//   'Equal'
//   'NotEqual'
// ])
// param scheduledQueryRulesOperator string





// == RESOURCES ==
// workspace
resource workspace 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: workspaceName
  location: location
  tags: applicationInsightsTags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
  }
}

// application insights
resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: applicationInsightsName
  location: location
  tags: applicationInsightsTags
  kind: 'web'
  properties: {
    Flow_Type: 'Redfield'
    Application_Type: 'web'
    Request_Source: 'IbizaAIExtension'
    WorkspaceResourceId: workspace.id
  }
}

// action group
resource actionGroup 'Microsoft.Insights/actionGroups@2023-01-01' = [for actionGroup in actionGroups: if (runActionGroups == true) {
  name: '${applicationPrefix}${actionGroup.name}${actionGroup.environment}'
  location: actionGroup.location
  tags: actionGroup.tags
  properties: {
    groupShortName: '${applicationPrefix}${actionGroup.name}${actionGroup.environment}'
    enabled: true
    emailReceivers: [for emailReceiver in actionGroup.emailReceivers ?? []: {
      name: '${emailReceiver.name}'
      emailAddress: emailReceiver.emailAddress
      useCommonAlertSchema: emailReceiver.useCommonAlertSchema
    }]
    smsReceivers: [for smsReceiver in actionGroup.smsReceivers ?? []: {
      name: '${smsReceiver.name}'
      countryCode: smsReceiver.countryCode
      phoneNumber: smsReceiver.phoneNumber
    }]
    webhookReceivers: []
    eventHubReceivers: []
    itsmReceivers: []
    azureAppPushReceivers: []
    automationRunbookReceivers: []
    voiceReceivers: []
    logicAppReceivers: []
    azureFunctionReceivers: []
    armRoleReceivers: []
  }
}]

// scheduled query rule
resource scheduledQueryRule 'Microsoft.Insights/scheduledqueryrules@2023-03-15-preview' = [for scheduledQueryRule in scheduledQueryRules: if (runScheduledQueryRules == true) {
  name: scheduledQueryRule.name
  location: location
  properties: {
    displayName: scheduledQueryRule.name
    description: scheduledQueryRule.description
    severity: scheduledQueryRule.severity
    enabled: scheduledQueryRule.enabled
    evaluationFrequency: scheduledQueryRule.evaluationFrequency
    scopes: [
      scheduledQueryRule.scope == 'workspace' ? workspace.id : applicationInsights.id
    ]
    targetResourceTypes: [
      scheduledQueryRule.scope == 'workspace' ? 'Microsoft.OperationalInsights/workspaces' : 'microsoft.insights/components'
    ]
    windowSize: scheduledQueryRule.windowSize
    criteria: {
      allOf: getQueryRuleCriteria(scheduledQueryRule)
    }
    autoMitigate: false
    actions: {
      actionGroups: [for actionGroup in scheduledQueryRule.actionGroups: '/subscriptions/007d3e75-42c3-4169-b758-35fc59cf9cc9/resourceGroups/corp-${getResourceEnv(actionGroup.environment)}-rg/providers/Microsoft.Insights/actionGroups/${applicationPrefix}${actionGroup.name}${actionGroup.environment}' ?? []]
      customProperties: {}
      actionProperties: {}
    }
  }
}]

// user defined functions
func getQueryRuleCriteria(scheduledQueryRule object) array => (scheduledQueryRule.metricMeasureColumn != '') ? [{
  query: scheduledQueryRule.query
  timeAggregation: scheduledQueryRule.timeAggregation
  metricMeasureColumn: scheduledQueryRule.metricMeasureColumn
  dimensions: []
  operator: scheduledQueryRule.operator
  threshold: scheduledQueryRule.threshold
  failingPeriods: {
    numberOfEvaluationPeriods: scheduledQueryRule.numberOfEvaluationPeriods
    minFailingPeriodsToAlert: scheduledQueryRule.minFailingPeriodsToAlert
  }
} ]: [{
  query: scheduledQueryRule.query
  timeAggregation: scheduledQueryRule.timeAggregation
  dimensions: []
  operator: scheduledQueryRule.operator
  threshold: scheduledQueryRule.threshold
  failingPeriods: {
    numberOfEvaluationPeriods: scheduledQueryRule.numberOfEvaluationPeriods
    minFailingPeriodsToAlert: scheduledQueryRule.minFailingPeriodsToAlert
  }
}]

func getResourceEnv(actionGroupEnvironment string) string => (toLower(actionGroupEnvironment) == 'prd') ? 'prod' : 'dev'

