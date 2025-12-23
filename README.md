# MyPetVenues - Azure Container Apps Demo

A modern .NET Blazor WebAssembly application for pet venue management, demonstrating cloud-native architecture on Azure Container Apps.

## Architecture

- **Frontend**: Blazor WebAssembly (MSAL auth)
- **Backend**: ASP.NET Core 9 Minimal API (JWT Bearer auth)
- **Database**: Azure Cosmos DB (managed identity, secretless)
- **Hosting**: Azure Container Apps (VNet-integrated)
- **Observability**: Application Insights + OpenTelemetry
- **IaC**: Bicep templates

## Quick Start

### Prerequisites
- .NET 9 SDK
- Docker
- Azure CLI
- Azure subscription

### Local Development
```bash
# Build and run API
dotnet run --project MyPetVenues.Api/MyPetVenues.Api.csproj

# Build and run UI (separate terminal)
dotnet run --project MyPetVenues/MyPetVenues.csproj
```

### Deploy to Azure
```bash
# Login and set subscription
az login
az account set --subscription YOUR_SUBSCRIPTION_ID

# Deploy infrastructure and application
./scripts/deploy-nonprod.ps1 -Build -Push
```

## Project Structure
```
MyPetVenues/          # Blazor WASM UI
MyPetVenues.Api/      # ASP.NET Core API
MyPetVenues.Shared/   # Shared contracts (DTOs)
infra/                # Bicep infrastructure templates
specs/                # Architecture Decision Records and specs
```

## Features
- **Venues**: Browse pet-friendly locations (parks, hotels, cafes)
- **Bookings**: Reserve venue time slots
- **Reviews**: Rate and review venues
- **User Profiles**: Manage favorites and booking history

## Security
- Microsoft Entra ID authentication (MSAL + JWT Bearer)
- Managed identity for Azure resource access (no secrets)
- RBAC-based Cosmos DB access (disableLocalAuth: true)
- VNet isolation for Container Apps

## Monitoring
- Application Insights for telemetry
- OpenTelemetry for distributed tracing
- Structured logging with request correlation

## Documentation
- [Deployment Runbook](specs/001-aca-modernization/runbook-deploy.md)
- [Architecture Spec](specs/001-aca-modernization/spec.md)
- [Quick Start Guide](specs/001-aca-modernization/quickstart.md)

## License
MIT
