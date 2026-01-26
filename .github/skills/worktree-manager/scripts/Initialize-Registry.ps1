<#
.SYNOPSIS
    Initialize global worktree registry
.DESCRIPTION
    Creates the registry file if it doesn't exist
#>
[CmdletBinding()]
param()

$registryDir = "$env:USERPROFILE\.copilot"
$registryPath = "$registryDir\worktree-registry.json"

if (-not (Test-Path $registryDir)) {
    New-Item -ItemType Directory -Path $registryDir -Force | Out-Null
}

if (-not (Test-Path $registryPath)) {
    $registry = @{
        worktrees = @()
        portPool = @{
            start = 5100
            end = 5199
            allocated = @()
        }
    }
    $registry | ConvertTo-Json -Depth 10 | Set-Content -Path $registryPath -Encoding UTF8
    Write-Host "Created worktree registry at $registryPath" -ForegroundColor Green
} else {
    Write-Host "Registry already exists at $registryPath" -ForegroundColor Yellow
}
