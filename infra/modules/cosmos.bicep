param location string
param environment string

targetScope = 'resourceGroup'

var cosmosAccountName = 'cosmos-${environment}-${uniqueString(resourceGroup().id)}'
var databaseName = 'MyPetVenues'

resource cosmosAccount 'Microsoft.DocumentDB/databaseAccounts@2023-04-15' = {
  name: cosmosAccountName
  location: location
  kind: 'GlobalDocumentDB'
  properties: {
    databaseAccountOfferType: 'Standard'
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
    }
    locations: [
      {
        locationName: location
        failoverPriority: 0
        isZoneRedundant: false
      }
    ]
    disableLocalAuth: true
  }
}

resource database 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2023-04-15' = {
  parent: cosmosAccount
  name: databaseName
  properties: {
    resource: {
      id: databaseName
    }
  }
}

resource venuesContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = {
  parent: database
  name: 'venues'
  properties: {
    resource: {
      id: 'venues'
      partitionKey: {
        paths: ['/id']
        kind: 'Hash'
      }
    }
  }
}

resource reviewsContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = {
  parent: database
  name: 'reviews'
  properties: {
    resource: {
      id: 'reviews'
      partitionKey: {
        paths: ['/venueId']
        kind: 'Hash'
      }
    }
  }
}

resource bookingsContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = {
  parent: database
  name: 'bookings'
  properties: {
    resource: {
      id: 'bookings'
      partitionKey: {
        paths: ['/userId']
        kind: 'Hash'
      }
    }
  }
}

resource usersContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = {
  parent: database
  name: 'users'
  properties: {
    resource: {
      id: 'users'
      partitionKey: {
        paths: ['/id']
        kind: 'Hash'
      }
    }
  }
}

output endpoint string = cosmosAccount.properties.documentEndpoint
output accountName string = cosmosAccount.name
output databaseName string = database.name
