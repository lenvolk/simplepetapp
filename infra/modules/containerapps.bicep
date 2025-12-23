param location string
param environment string
param containerImage string
param logWorkspaceId string = ''
param vnetSubnetId string = ''

targetScope = 'resourceGroup'

var acaEnvName = 'aca-env-${environment}'
var acaAppName = 'mypetvenues-${environment}'

resource acaEnvironment 'Microsoft.App/managedEnvironments@2023-05-01' = {
  name: acaEnvName
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logWorkspaceId
      }
    }
    vnetConfiguration: empty(vnetSubnetId) ? null : {
      infrastructureSubnetId: vnetSubnetId
      internal: false
    }
  }
}

resource containerApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: acaAppName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    managedEnvironmentId: acaEnvironment.id
    configuration: {
      ingress: {
        external: true
        targetPort: 80
        transport: 'auto'
        allowInsecure: false
      }
    }
    template: {
      containers: [
        {
          name: 'mypetvenues-api'
          image: containerImage
          resources: {
            cpu: json('0.5')
            memory: '1Gi'
          }
        }
      ]
      scale: {
        minReplicas: 1
        maxReplicas: 10
      }
    }
  }
}

output fqdn string = containerApp.properties.configuration.ingress.fqdn
output resourceId string = containerApp.id
output principalId string = containerApp.identity.principalId
