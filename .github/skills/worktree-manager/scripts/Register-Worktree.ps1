<#
.SYNOPSIS
    Register a worktree in the global registry
.PARAMETER Project
    Project name
.PARAMETER Branch
    Branch name (e.g., feature/auth)
.PARAMETER WorktreePath
    Absolute path to worktree
.PARAMETER RepoPath
    Absolute path to original repository
.PARAMETER Ports
    Comma-separated port numbers
.PARAMETER Task
    Optional task description
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory)][string]$Project,
    [Parameter(Mandatory)][string]$Branch,
    [Parameter(Mandatory)][string]$WorktreePath,
    [Parameter(Mandatory)][string]$RepoPath,
    [Parameter(Mandatory)][string]$Ports,
    [string]$Task = ""
)

$registryPath = "$env:USERPROFILE\.copilot\worktree-registry.json"
$branchSlug = $Branch -replace '/', '-'
$portArray = @($Ports -split ',' | ForEach-Object { [int]$_.Trim() })

$registry = Get-Content $registryPath -Raw | ConvertFrom-Json

$entry = [PSCustomObject]@{
    id = [guid]::NewGuid().ToString()
    project = $Project
    repoPath = $RepoPath
    branch = $Branch
    branchSlug = $branchSlug
    worktreePath = $WorktreePath
    ports = $portArray
    createdAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    validatedAt = $null
    agentLaunchedAt = $null
    task = $Task
    prNumber = $null
    status = "active"
}

# Add to registry (remove existing entry for same project/branch first)
$registry.worktrees = @($registry.worktrees | Where-Object { 
    -not ($_.project -eq $Project -and $_.branch -eq $Branch) 
})
$registry.worktrees += $entry

$registry | ConvertTo-Json -Depth 10 | Set-Content -Path $registryPath -Encoding UTF8
Write-Host "Registered worktree: $Project/$branchSlug" -ForegroundColor Green
