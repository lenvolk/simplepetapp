<#
.SYNOPSIS
    Clean up a worktree
.PARAMETER Project
    Project name
.PARAMETER Branch
    Branch name
.PARAMETER DeleteBranch
    Also delete the git branch (local and remote)
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory)][string]$Project,
    [Parameter(Mandatory)][string]$Branch,
    [switch]$DeleteBranch
)

$registryPath = "$env:USERPROFILE\.copilot\worktree-registry.json"
$registry = Get-Content $registryPath -Raw | ConvertFrom-Json

$entry = $registry.worktrees | Where-Object { $_.project -eq $Project -and $_.branch -eq $Branch }

if (-not $entry) {
    Write-Error "Worktree not found: $Project / $Branch"
    exit 1
}

Write-Host "Cleaning up worktree: $Project / $Branch" -ForegroundColor Yellow

# 1. Kill processes on ports
foreach ($port in $entry.ports) {
    $conn = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($conn) {
        $process = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
        if ($process) {
            Write-Host "  Stopping process on port $port ($($process.Name))"
            Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
        }
    }
}

# 2. Remove worktree
if (Test-Path $entry.worktreePath) {
    Push-Location $entry.repoPath
    git worktree remove $entry.worktreePath --force 2>$null
    git worktree prune
    Pop-Location
    Write-Host "  Removed worktree directory" -ForegroundColor Green
}

# 3. Remove from registry
$registry.worktrees = @($registry.worktrees | Where-Object { 
    -not ($_.project -eq $Project -and $_.branch -eq $Branch) 
})

# 4. Release ports
$registry.portPool.allocated = @($registry.portPool.allocated | Where-Object { $_ -notin $entry.ports })

$registry | ConvertTo-Json -Depth 10 | Set-Content -Path $registryPath -Encoding UTF8
Write-Host "  Updated registry" -ForegroundColor Green

# 5. Optionally delete branch
if ($DeleteBranch) {
    Push-Location $entry.repoPath
    git branch -D $Branch 2>$null
    git push origin --delete $Branch 2>$null
    Pop-Location
    Write-Host "  Deleted branch: $Branch" -ForegroundColor Green
}

Write-Host "`nCleanup complete!" -ForegroundColor Green
