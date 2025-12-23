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

// Deploy Container Apps (depends on monitoring and networking)
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

// Deploy Cosmos (placeholder for US2)
module cosmos 'modules/cosmos.bicep' = {
  name: 'cosmosModule'
  params: {
    location: location
    environment: environment
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
