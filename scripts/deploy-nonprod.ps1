<#
.SYNOPSIS
  Build/push container image (optional) and deploy infra/main.bicep to a resource group.

.DESCRIPTION
  This script is a repeatable, opinionated helper for non-prod deployments. It supports three modes:
    - Use an existing image: specify `-Image` and run deploy only
    - Build local image and deploy: pass `-Build` and `-Image` (image tag)
    - Build + push to registry + deploy: pass `-Build -Push -Registry <registry>`

  The script expects `infra/main.bicep` and `infra/parameters/nonprod.bicepparam` to exist.

.EXAMPLE
  # deploy using existing image
  ./scripts/deploy-nonprod.ps1 -ResourceGroup my-rg -Image "ghcr.io/me/mypetvenues:nonprod"

.EXAMPLE
  # build locally and deploy (assumes Dockerfile exists)
  ./scripts/deploy-nonprod.ps1 -Build -Image "local-mypetvenues:latest" -ResourceGroup my-rg

.EXAMPLE
  # build, push to registry, and deploy
  ./scripts/deploy-nonprod.ps1 -Build -Push -Registry "ghcr.io/me" -Image "ghcr.io/me/mypetvenues:nonprod" -ResourceGroup my-rg
#>

[CmdletBinding()]
param(
  [string] $ResourceGroup = 'simplepetapp',
  [string] $Location = 'eastus2',
  [string] $Image = '',
  [switch] $Build,
  [switch] $Push,
  [string] $Registry = 'simplepetappacr',
  [string] $SubscriptionId = '',
  [switch] $WhatIf,
  [switch] $UseAcrBuild = $true
)

Set-StrictMode -Version Latest

function ExitWithError($msg, $code=1) {
  Write-Error $msg
  exit $code
}

if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
  Write-Warning 'Azure CLI (`az`) not found in PATH. Deployment validation and `az` operations will fail without it.'
}

if ($Build -and -not $Image) {
  ExitWithError 'When using -Build you must provide -Image (tag) to assign to the built image.'
}

if ($Push -and -not $Registry) {
  ExitWithError 'When using -Push you must provide -Registry (e.g. ghcr.io/myorg or myregistry.azurecr.io).'
}

if ($Build) {
  Push-Location (Join-Path $PSScriptRoot '..')
  
  if ($UseAcrBuild -and $Registry) {
    # Use ACR Build (no local Docker required)
    $acrName = $Registry -replace '\.azurecr\.io$',''
    $imageTag = if ($Image) { $Image } else { "mypetvenues:latest" }
    
    Write-Host "Building image using Azure Container Registry Build: $acrName/$imageTag"
    try {
      az acr build --registry $acrName --image $imageTag --file Dockerfile . | Out-Host
      $Image = "$acrName.azurecr.io/$imageTag"
    } catch {
      ExitWithError 'ACR build failed. Ensure Azure CLI is authenticated and ACR exists.'
    }
  }
  else {
    # Local Docker build
    Write-Host "Building .NET publish for API project..."
    try {
      dotnet publish "MyPetVenues.Api/MyPetVenues.Api.csproj" -c Release -o ./artifacts/publish | Out-Host
    } catch {
      ExitWithError 'dotnet publish failed. Ensure .NET SDK is installed and the API project exists.'
    }

    if (-not (Test-Path './Dockerfile')) {
      Write-Warning 'Dockerfile not found at repository root. Adjust the Dockerfile path in this script or add one (T006).'   
    }

    $imageTag = $Image
    Write-Host "Building Docker image: $imageTag"
    try {
      docker build -f Dockerfile -t $imageTag . | Out-Host
    } catch {
      ExitWithError 'Docker build failed. Ensure Docker is installed and running.'
    }
  }

  Pop-Location
}

if ($Push) {
  Write-Host "Pushing image to registry: $Registry"
  # If registry is an ACR, use `az acr login` when available
  if ($Registry -match '\.azurecr\.io$' -and (Get-Command az -ErrorAction SilentlyContinue)) {
    try { az acr login --name ($Registry -replace '\.azurecr\.io$','') | Out-Null } catch { Write-Warning 'az acr login failed (proceeding to docker push may still succeed if already logged in).' }
  }

  try {
    docker push $Image | Out-Host
  } catch {
    ExitWithError 'Docker push failed. Ensure you are logged in to the target registry.'
  }
}

if (-not $Image) {
  ExitWithError 'No image specified. Provide -Image <name:tag> or run with -Build to create one.'
}

# Deploy Bicep
$bicepFile = Join-Path $PSScriptRoot '..\infra\main.bicep'
$paramFile = Join-Path $PSScriptRoot '..\infra\parameters\nonprod.bicepparam'

if (-not (Test-Path $bicepFile)) { ExitWithError "Bicep file not found: $bicepFile" }
if (-not (Test-Path $paramFile)) { Write-Warning "Parameter file not found: $paramFile. The deployment will proceed without it." }

Write-Host "Deploying Bicep to resource group: $ResourceGroup (location: $Location)"

if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
  Write-Warning 'Azure CLI (`az`) not available — cannot perform deployment. Install Azure CLI or run the deployment manually.'
  exit 0
}

if ($SubscriptionId) { az account set --subscription $SubscriptionId | Out-Null }

# Ensure resource group exists
try {
  az group create --name $ResourceGroup --location $Location | Out-Null
} catch {
  ExitWithError "Failed to create or validate resource group: $ResourceGroup"
}

$deployCmd = @(
  'deployment', 'group', 'create',
  '--resource-group', $ResourceGroup,
  '--template-file', $bicepFile,
  '--parameters', "containerImage=$Image"
)

if (Test-Path $paramFile) { $deployCmd += @('--parameters', "@${paramFile}") }
if ($WhatIf) { $deployCmd += '--what-if' }

Write-Host "Running: az $($deployCmd -join ' ')"
try {
  az @deployCmd | Out-Host
} catch {
  ExitWithError 'Azure deployment failed. Inspect the error above.'
}

Write-Host 'Deployment finished.'
# Deploy script already complete in T004 with build/push/deploy support
