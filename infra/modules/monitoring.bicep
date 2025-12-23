param location string
param environment string

targetScope = 'resourceGroup'

// Placeholder monitoring module
output logWorkspaceId string = '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example/providers/Microsoft.OperationalInsights/workspaces/${environment}-logs'
