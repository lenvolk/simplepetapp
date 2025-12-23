# Quick Start: MyPetVenues on Azure Container Apps

## Local Development (API Host)

Run the API project locally:

```powershell
dotnet run --project MyPetVenues.Api/MyPetVenues.Api.csproj
```

Access at `https://localhost:5001` - the API serves the Blazor WASM UI and API endpoints.

## Deploy to Azure (Non-Prod)

Use the deployment script:

```powershell
./scripts/deploy-nonprod.ps1 -Build -Push -Registry "<your-acr>.azurecr.io" -Image "<your-acr>.azurecr.io/mypetvenues:nonprod" -ResourceGroup "mypetvenues-nonprod-rg"
```

See `specs/001-aca-modernization/runbook-deploy.md` for details.

## Configuration

- **Auth**: Configure `Auth:Authority` and `Auth:Audience` in `appsettings.json`
- **Cosmos**: Set `Cosmos:Endpoint` (managed identity used for access)
- **App Insights**: Connection string set via environment variable from deployment

## Architecture

- **MyPetVenues.Api**: ASP.NET Core host serving Blazor WASM + API endpoints
- **MyPetVenues**: Blazor WebAssembly UI (calls API over HTTP with MSAL tokens)
- **MyPetVenues.Shared**: Shared contracts between UI and API
