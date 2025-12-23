targetScope = 'resourceGroup'

param location string = resourceGroup().location
@description('Deployment environment, e.g. nonprod, prod')
param environment string = 'nonprod'
@description('Container image to deploy (override during CI/deploy)')
param containerImage string = 'REPLACE_WITH_IMAGE'

// Deploy monitoring first (needed by ACA)
module monitoring 'modules/monitoring.bicep' = {
  name: 'monitoringModule'
  params: {
    location: location
    environment: environment
  }
}

// Deploy networking
module networking 'modules/networking.bicep' = {
  name: 'networkingModule'
  params: {
    location: location
    environment: environment
  }
}

// Deploy Cosmos (before ACA so we can assign RBAC)
module cosmos 'modules/cosmos.bicep' = {
  name: 'cosmosModule'
  params: {
    location: location
    environment: environment
  }
}

// Deploy Container Apps (depends on monitoring, networking, cosmos for RBAC)
module containerapps 'modules/containerapps.bicep' = {
  name: 'containerAppsModule'
  params: {
    location: location
    environment: environment
    containerImage: containerImage
    logWorkspaceId: monitoring.outputs.logWorkspaceId
    vnetSubnetId: networking.outputs.subnetId
  }
}

// Assign Cosmos Data Contributor role to Container App managed identity
resource cosmosRoleAssignment 'Microsoft.DocumentDB/databaseAccounts/sqlRoleAssignments@2024-05-15' = {
  name: '${cosmos.outputs.accountName}/${guid(resourceGroup().id, containerapps.outputs.principalId, 'cosmos-data-contributor')}'
  properties: {
    roleDefinitionId: '/${subscription().id}/resourceGroups/${resourceGroup().name}/providers/Microsoft.DocumentDB/databaseAccounts/${cosmos.outputs.accountName}/sqlRoleDefinitions/00000000-0000-0000-0000-000000000002'
    principalId: containerapps.outputs.principalId
    scope: cosmos.outputs.accountId
  }
}

// Assign Monitoring Metrics Publisher role to Container App for App Insights
resource monitoringRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, containerapps.outputs.principalId, 'monitoring-publisher')
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '3913510d-42f4-4e42-8a64-420c390055eb')
    principalId: containerapps.outputs.principalId
    principalType: 'ServicePrincipal'
  }
}

// Outputs for deployment verification and app configuration
output containerAppFqdn string = containerapps.outputs.fqdn
output containerAppResourceId string = containerapps.outputs.resourceId
output containerAppPrincipalId string = containerapps.outputs.principalId
output logWorkspaceId string = monitoring.outputs.logWorkspaceId
output logWorkspaceName string = monitoring.outputs.logWorkspaceName
output appInsightsConnectionString string = monitoring.outputs.appInsightsConnectionString
output cosmosEndpoint string = cosmos.outputs.endpoint
output cosmosAccountName string = cosmos.outputs.accountName
output cosmosDatabaseName string = cosmos.outputs.databaseName
