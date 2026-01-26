<#
.SYNOPSIS
    Allocate ports from the global pool
.PARAMETER Count
    Number of ports to allocate (default: 1)
.OUTPUTS
    Array of allocated port numbers
#>
[CmdletBinding()]
param(
    [int]$Count = 1
)

$registryPath = "$env:USERPROFILE\.copilot\worktree-registry.json"

if (-not (Test-Path $registryPath)) {
    & "$PSScriptRoot\Initialize-Registry.ps1"
}

$registry = Get-Content $registryPath -Raw | ConvertFrom-Json

$allocated = @()
$start = $registry.portPool.start
$end = $registry.portPool.end
$existing = @($registry.portPool.allocated)

for ($port = $start; $port -le $end -and $allocated.Count -lt $Count; $port++) {
    # Check if already in registry
    if ($port -in $existing) { continue }
    
    # Check if port in use by system
    $inUse = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($inUse) { continue }
    
    $allocated += $port
}

if ($allocated.Count -lt $Count) {
    Write-Error "Could not allocate $Count ports. Only $($allocated.Count) available."
    exit 1
}

# Update registry
$registry.portPool.allocated = @($existing) + $allocated | Sort-Object -Unique
$registry | ConvertTo-Json -Depth 10 | Set-Content -Path $registryPath -Encoding UTF8

# Return allocated ports
$allocated -join " "
