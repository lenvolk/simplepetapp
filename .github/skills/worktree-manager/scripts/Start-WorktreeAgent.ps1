<#
.SYNOPSIS
    Launch a Copilot agent in a worktree
.PARAMETER WorktreePath
    Path to the worktree
.PARAMETER Task
    Task description for the agent
.PARAMETER Terminal
    Terminal to use: windows-terminal (default), pwsh
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory)][string]$WorktreePath,
    [string]$Task = "",
    [string]$Terminal = "windows-terminal"
)

$registryPath = "$env:USERPROFILE\.copilot\worktree-registry.json"

# Update registry with launch time
$registry = Get-Content $registryPath -Raw | ConvertFrom-Json
$entry = $registry.worktrees | Where-Object { $_.worktreePath -eq $WorktreePath }
if ($entry) {
    $entry.agentLaunchedAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    if ($Task) { $entry.task = $Task }
    $registry | ConvertTo-Json -Depth 10 | Set-Content -Path $registryPath -Encoding UTF8
}

$command = "Set-Location '$WorktreePath'; copilot -p `"$Task`" --allow-all-tools"

switch ($Terminal) {
    "windows-terminal" {
        # Open in new Windows Terminal tab
        wt -w 0 new-tab pwsh -NoExit -Command $command
    }
    "pwsh" {
        # Start in new PowerShell window
        Start-Process pwsh -ArgumentList "-NoExit", "-Command", $command
    }
    default {
        # Fallback: start as background job
        Start-Job -Name "agent-$(Split-Path $WorktreePath -Leaf)" -ScriptBlock {
            param($path, $task)
            Set-Location $path
            copilot -p $task --allow-all-tools
        } -ArgumentList $WorktreePath, $Task
    }
}

Write-Host "Agent launched in $Terminal for: $WorktreePath" -ForegroundColor Green
