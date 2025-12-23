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
    logWorkspaceKey: monitoring.outputs.logWorkspaceKey
    vnetSubnetId: '' // Skip VNet integration to avoid subnet delegation issues
  }
}

// Assign RBAC roles (depends on Container App being created)
module rbac 'modules/rbac.bicep' = {
  name: 'rbacModule'
  params: {
    principalId: containerapps.outputs.principalId
    cosmosAccountName: cosmos.outputs.accountName
    cosmosAccountId: cosmos.outputs.accountId
  }
  dependsOn: [
    containerapps
  ]
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
