# Quickstart (001-aca-modernization)

This quickstart covers local development for the existing Blazor WebAssembly app and the planned deployment shape for Azure Container Apps (ACA).

## Prereqs
- .NET SDK 9.x
- (For Azure later) Azure CLI and access to an Azure subscription

## Local run (current app)
From the repo root:
- Build: `dotnet build MyPetVenues/MyPetVenues.csproj`
- Run: `dotnet run --project MyPetVenues/MyPetVenues.csproj`

Then open the displayed local URL.

## Planned local run (UI + API)
This feature’s plan introduces a server-side API (required to use managed identity to Cosmos DB without exposing secrets to the browser). Once the API project exists:
- Run API: `dotnet run --project <ApiProjectPath>`
- Run UI (WASM): `dotnet run --project MyPetVenues/MyPetVenues.csproj`

The UI will be configured to call the API base URL (dev: localhost) and use MSAL to acquire access tokens.

## Planned Azure deployment (ACA)
High-level (details in plan):
- Containerize the combined workload (either:
  - single ASP.NET Core host that serves static WASM assets + API, or
  - separate UI/API containers in the same Container Apps Environment).
- Enable system-assigned managed identity on the API container.
- Provision Cosmos DB (SQL API) and grant the API identity data-plane RBAC.
- Enforce Microsoft Entra ID auth for all access.
- Send logs/telemetry to Application Insights (workspace-based).

## Smoke checks (non-prod)
- UI loads and requires sign-in.
- API returns `401` without a token and `200` with a valid token.
- Venues list loads (Cosmos-backed) within acceptable latency.
