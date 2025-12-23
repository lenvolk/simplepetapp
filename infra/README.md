# Infra (Azure Container Apps modernization)

This folder contains Infrastructure-as-Code (IaC) and related deployment docs/scripts for the ACA modernization defined in `specs/001-aca-modernization/`.

## What lives here
- `main.bicep`: Root deployment entrypoint (resource group scope)
- `modules/`: Reusable Bicep modules (Container Apps, networking, monitoring, Cosmos, etc.)
- `parameters/`: Environment-specific `.bicepparam` files (e.g., non-prod)

## How it is used
- The deployment workflow is implemented by tasks in `specs/001-aca-modernization/tasks.md`.
- Non-prod deployments are driven by `scripts/deploy-nonprod.ps1` once created.

## Notes
- Keep the repo secretless: prefer Microsoft Entra ID + managed identity over keys/connection strings.
