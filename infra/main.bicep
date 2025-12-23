// infra/main.bicep - root deployment entrypoint (placeholder)
// This file will be populated in task T002.

targetScope = 'resourceGroup'

// Root IaC entrypoint (lightweight wiring). Detailed modules will be implemented in later tasks.
param location string = resourceGroup().location
@description('Deployment environment, e.g. nonprod, prod')
param environment string = 'nonprod'
@description('Container image to deploy (override during CI/deploy)')
param containerImage string = 'REPLACE_WITH_IMAGE'

module containerapps 'modules/containerapps.bicep' = {
	name: 'containerAppsModule'
	params: {
		location: location
		environment: environment
		containerImage: containerImage
	}
}

module networking 'modules/networking.bicep' = {
	name: 'networkingModule'
	params: {
		location: location
		environment: environment
	}
}

module monitoring 'modules/monitoring.bicep' = {
	name: 'monitoringModule'
	params: {
		location: location
		environment: environment
	}
}

module cosmos 'modules/cosmos.bicep' = {
	name: 'cosmosModule'
	params: {
		location: location
		environment: environment
	}
}

// Expose a few high-value outputs for later wiring/tests
output containerAppFqdn string = containerapps.outputs.fqdn
output containerAppResourceId string = containerapps.outputs.resourceId
output logWorkspaceId string = monitoring.outputs.logWorkspaceId
output cosmosEndpoint string = cosmos.outputs.endpoint
