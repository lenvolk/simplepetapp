# Deployment Runbook: MyPetVenues to Azure Container Apps (Non-Prod)

## Prerequisites
- Azure CLI installed and logged in
- Docker installed (for local image builds)
- Bicep CLI (bundled with Azure CLI)
- Appropriate Azure subscription permissions

## Deployment Steps

###1. Build and push container image
```powershell
./scripts/deploy-nonprod.ps1 -Build -Push -Registry "<your-acr>.azurecr.io" -Image "<your-acr>.azurecr.io/mypetvenues:nonprod" -ResourceGroup "mypetvenues-nonprod-rg"
```

### 2. Deploy infrastructure
The script automatically deploys `infra/main.bicep` after building the image.

### 3. Verify deployment
- Check deployment outputs for FQDN
- Access the app via HTTPS
- Verify auth redirects to Microsoft Entra ID login

## Troubleshooting
- Check Azure Portal > Container Apps > Logs
- Review App Insights traces
- Verify managed identity role assignments for Cosmos DB access