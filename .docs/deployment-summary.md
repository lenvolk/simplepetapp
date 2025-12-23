# MyPetVenues Deployment Summary

**Date**: December 22, 2025  
**Status**: ✅ **SUCCESSFULLY DEPLOYED**

---

## Deployment Details

### Azure Subscription
- **Name**: LAB
- **ID**: 64e4567b-012b-4966-9a91-b5c7c7b992de
- **Tenant ID**: f1ab24dd-6f20-4b55-bc16-074d7aef4641

### Resource Group
- **Name**: simplepetapp
- **Location**: eastus2

---

## Deployed Resources

### 1. Azure Container Registry (ACR)
- **Name**: simplepetappacr
- **Login Server**: simplepetappacr.azurecr.io
- **SKU**: Basic
- **Admin Enabled**: Yes
- **Image**: mypetvenues:latest

### 2. Azure Cosmos DB
- **Account Name**: cosmos-nonprod-zia5capydvlv4
- **Endpoint**: https://cosmos-nonprod-zia5capydvlv4.documents.azure.com:443/
- **Database**: MyPetVenues
- **Containers**: 
  - venues
  - reviews
  - bookings
  - users
- **Authentication**: Managed Identity (RBAC)

### 3. Log Analytics Workspace
- **Name**: nonprod-logs
- **Workspace ID**: 6f26374e-786c-43df-b473-10297ad48969

### 4. Application Insights
- **Name**: nonprod-appinsights
- **Connection String**: InstrumentationKey=40e8415f-7288-4d9c-878e-fdeaf0cf2caf;IngestionEndpoint=https://eastus2-3.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus2.livediagnostics.monitor.azure.com/;ApplicationId=09fed462-4eee-45d3-ab4f-f68d2f56f1d3

### 5. Virtual Network
- **Name**: nonprod-vnet
- **Address Space**: (default from Bicep module)
- **Subnet**: aca-subnet

### 6. Container Apps Environment
- **Name**: aca-env-nonprod
- **Location**: eastus2
- **Log Analytics**: Integrated

### 7. Container App
- **Name**: mypetvenues-nonprod
- **FQDN**: **https://mypetvenues-nonprod.greenglacier-88b83bb0.eastus2.azurecontainerapps.io**
- **Status**: ✅ Running
- **Managed Identity**: 22fdd20d-af83-4bc9-9184-ef8534a24bf0
- **Resources**: 0.5 vCPU, 1 GB RAM
- **Scaling**: 1-10 replicas

---

## Microsoft Entra ID App Registrations

### API App Registration
- **Display Name**: MyPetVenues-API-NonProd
- **Application (Client) ID**: b37f1900-f7f5-4587-854b-10ec5b00877b
- **Authority**: https://login.microsoftonline.com/f1ab24dd-6f20-4b55-bc16-074d7aef4641
- **Audience**: api://b37f1900-f7f5-4587-854b-10ec5b00877b

### WASM App Registration
- **Display Name**: MyPetVenues-WASM-NonProd
- **Application (Client) ID**: 5610f982-9b1a-4db6-9f23-5a064532a6e5
- **Redirect URIs**:
  - https://simplepetapp.eastus2.azurecontainerapps.io/authentication/login-callback
  - http://localhost:5000/authentication/login-callback

---

## Verification

### Health Check
```powershell
curl https://mypetvenues-nonprod.greenglacier-88b83bb0.eastus2.azurecontainerapps.io/health
# Response: Healthy
```

### Container App Status
- **Provisioning State**: Provisioned
- **Running State**: Running
- **Active Revision**: mypetvenues-nonprod--0000001

---

## Configuration Applied

### Environment Variables
```
Cosmos__Endpoint=https://cosmos-nonprod-zia5capydvlv4.documents.azure.com:443/
Cosmos__DatabaseName=MyPetVenues
Monitoring__ApplicationInsightsConnectionString=<connection-string>
Auth__Authority=https://login.microsoftonline.com/f1ab24dd-6f20-4b55-bc16-074d7aef4641
Auth__Audience=api://b37f1900-f7f5-4587-854b-10ec5b00877b
```

### RBAC Role Assignments
- ✅ Cosmos DB Data Contributor (to Container App managed identity)
- ✅ Monitoring Metrics Publisher (to Container App managed identity)

---

## Next Steps

### 1. Update WASM Redirect URI
The WASM app registration needs the actual Container App FQDN:
```powershell
az ad app update --id 5610f982-9b1a-4db6-9f23-5a064532a6e5 --public-client-redirect-uris "https://mypetvenues-nonprod.greenglacier-88b83bb0.eastus2.azurecontainerapps.io/authentication/login-callback" "http://localhost:5000/authentication/login-callback"
```

### 2. Configure API App Exposed Scopes
Add an exposed API scope for the API app:
1. Go to Azure Portal > Entra ID > App Registrations
2. Select "MyPetVenues-API-NonProd"
3. Go to "Expose an API"
4. Add scope: `access_as_user`
5. Admin consent the scope

### 3. Configure WASM App API Permissions
Grant the WASM app permission to call the API:
1. Go to Azure Portal > Entra ID > App Registrations
2. Select "MyPetVenues-WASM-NonProd"
3. Go to "API permissions"
4. Add permission > My APIs > MyPetVenues-API-NonProd
5. Select `access_as_user`
6. Grant admin consent

### 4. Update Blazor WASM Configuration
Update `MyPetVenues/wwwroot/appsettings.json`:
```json
{
  "AzureAd": {
    "Authority": "https://login.microsoftonline.com/f1ab24dd-6f20-4b55-bc16-074d7aef4641",
    "ClientId": "5610f982-9b1a-4db6-9f23-5a064532a6e5",
    "ValidateAuthority": true
  },
  "ApiBaseUrl": "https://mypetvenues-nonprod.greenglacier-88b83bb0.eastus2.azurecontainerapps.io"
}
```

### 5. Rebuild and Redeploy
Once WASM config is updated, rebuild the image:
```powershell
az acr build --registry simplepetappacr --image mypetvenues:latest --file Dockerfile .
az containerapp update --name mypetvenues-nonprod --resource-group simplepetapp --image simplepetappacr.azurecr.io/mypetvenues:latest
```

---

## Deployment Script Updated
The deployment script `scripts/deploy-nonprod.ps1` has been updated to:
- Use **ACR Build by default** (no local Docker required)
- Default resource group: `simplepetapp`
- Default region: `eastus2`
- Default registry: `simplepetappacr`

**Usage**:
```powershell
# Build and deploy in one command
.\scripts\deploy-nonprod.ps1 -Build
```

---

## Costs Estimate (Monthly)
- **Container Apps**: ~$15-20 (0.5 vCPU, 1 GB RAM)
- **Cosmos DB**: ~$24 (400 RU/s serverless)
- **Container Registry**: ~$5 (Basic SKU)
- **App Insights**: ~$5 (basic telemetry)
- **Log Analytics**: ~$2 (basic logs)
- **Total**: ~$50-55/month

---

## 🎉 Deployment Complete!

The MyPetVenues API is successfully deployed and running on Azure Container Apps. The health endpoint confirms the application is operational.

**API URL**: https://mypetvenues-nonprod.greenglacier-88b83bb0.eastus2.azurecontainerapps.io
