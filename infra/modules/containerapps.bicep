param location string
param environment string
param containerImage string

targetScope = 'resourceGroup'

resource placeholder 'Microsoft.Resources/resourceGroups@2021-04-01' existing = {
  name: resourceGroup().name
}

// Output placeholders
output fqdn string = '${environment}.example.containers'
output resourceId string = resourceGroup().id
