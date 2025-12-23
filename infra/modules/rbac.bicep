targetScope = 'resourceGroup'

@description('Principal ID of the Container App managed identity')
param principalId string

@description('Cosmos DB account name')
param cosmosAccountName string

@description('Cosmos DB account resource ID')
param cosmosAccountId string

// Assign Cosmos Data Contributor role to Container App managed identity
resource cosmosRoleAssignment 'Microsoft.DocumentDB/databaseAccounts/sqlRoleAssignments@2024-05-15' = {
  name: '${cosmosAccountName}/${guid(resourceGroup().id, principalId, 'cosmos-data-contributor')}'
  properties: {
    roleDefinitionId: '/${subscription().id}/resourceGroups/${resourceGroup().name}/providers/Microsoft.DocumentDB/databaseAccounts/${cosmosAccountName}/sqlRoleDefinitions/00000000-0000-0000-0000-000000000002'
    principalId: principalId
    scope: cosmosAccountId
  }
}

// Assign Monitoring Metrics Publisher role to Container App for App Insights
resource monitoringRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, principalId, 'monitoring-publisher')
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '3913510d-42f4-4e42-8a64-420c390055eb')
    principalId: principalId
    principalType: 'ServicePrincipal'
  }
}

output cosmosRoleAssignmentId string = cosmosRoleAssignment.id
output monitoringRoleAssignmentId string = monitoringRoleAssignment.id
