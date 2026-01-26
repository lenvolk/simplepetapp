<#
.SYNOPSIS
    Show status of all worktrees
.PARAMETER Project
    Optional: filter by project name
#>
[CmdletBinding()]
param(
    [string]$Project = ""
)

$registryPath = "$env:USERPROFILE\.copilot\worktree-registry.json"

if (-not (Test-Path $registryPath)) {
    Write-Host "No worktree registry found. Run Initialize-Registry.ps1 first." -ForegroundColor Yellow
    exit 0
}

$registry = Get-Content $registryPath -Raw | ConvertFrom-Json

$worktrees = $registry.worktrees
if ($Project) {
    $worktrees = $worktrees | Where-Object { $_.project -eq $Project }
}

if ($worktrees.Count -eq 0) {
    Write-Host "No worktrees registered." -ForegroundColor Yellow
    exit 0
}

Write-Host "`nWorktree Status:" -ForegroundColor Cyan
Write-Host ("=" * 80)

$worktrees | ForEach-Object {
    $exists = Test-Path $_.worktreePath
    $statusIcon = if ($exists) { "✓" } else { "✗" }
    $statusColor = if ($exists) { "Green" } else { "Red" }
    
    Write-Host "`n$statusIcon $($_.project) / $($_.branch)" -ForegroundColor $statusColor
    Write-Host "  Path:    $($_.worktreePath)"
    Write-Host "  Ports:   $($_.ports -join ', ')"
    Write-Host "  Task:    $($_.task)"
    Write-Host "  Status:  $($_.status)"
    Write-Host "  Created: $($_.createdAt)"
    if ($_.prNumber) {
        Write-Host "  PR:      #$($_.prNumber)" -ForegroundColor Cyan
    }
}

Write-Host "`n" + ("=" * 80)
Write-Host "Port Pool: $($registry.portPool.start)-$($registry.portPool.end)"
Write-Host "Allocated: $($registry.portPool.allocated -join ', ')"
