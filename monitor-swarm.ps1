<#
.SYNOPSIS
    Simple monitor showing active agents and their waves.

.EXAMPLE
    .\monitor-swarm.ps1
#>

param(
    [int]$RefreshSeconds = 3,
    [switch]$Once
)

$script:RepoRoot = $PSScriptRoot
$script:OnceMode = $Once

function Show-Dashboard {
    if (-not $script:OnceMode) { Clear-Host }
    
    $timestamp = Get-Date -Format "HH:mm:ss"
    
    Write-Host ""
    Write-Host "  🐝 SWARM MONITOR  [$timestamp]" -ForegroundColor Cyan
    Write-Host "  ════════════════════════════════════════" -ForegroundColor DarkGray
    Write-Host ""

    # Get background jobs
    $jobs = Get-Job | Where-Object { 
        $_.Name -like "agent-*" -or $_.Name -like "task-*" -or 
        $_.Name -like "copilot-*" -or $_.Name -like "swarm-*" -or
        $_.Name -like "wave-*"
    }
    
    $running = $jobs | Where-Object { $_.State -eq "Running" }
    $completed = $jobs | Where-Object { $_.State -eq "Completed" }
    
    # Summary
    Write-Host "  Active Agents: " -NoNewline
    if ($running.Count -gt 0) {
        Write-Host "$($running.Count)" -ForegroundColor Green
    } else {
        Write-Host "0" -ForegroundColor DarkGray
    }
    Write-Host ""
    
    if ($running.Count -gt 0) {
        Write-Host "  RUNNING:" -ForegroundColor Yellow
        foreach ($job in $running) {
            $duration = ""
            if ($job.PSBeginTime) {
                $span = (Get-Date) - $job.PSBeginTime
                $duration = "{0:mm\:ss}" -f $span
            }
            
            # Try to extract wave from job name
            $wave = if ($job.Name -match 'wave[- ]?(\d)') { "Wave $($matches[1])" } else { "" }
            
            Write-Host "    🔄 $($job.Name)" -ForegroundColor Yellow -NoNewline
            if ($wave) { Write-Host "  [$wave]" -ForegroundColor Cyan -NoNewline }
            Write-Host "  $duration" -ForegroundColor DarkGray
        }
        Write-Host ""
    }
    
    if ($completed.Count -gt 0) {
        Write-Host "  COMPLETED: $($completed.Count)" -ForegroundColor Green
        foreach ($job in $completed | Select-Object -Last 5) {
            $wave = if ($job.Name -match 'wave[- ]?(\d)') { "Wave $($matches[1])" } else { "" }
            Write-Host "    ✅ $($job.Name)" -ForegroundColor Green -NoNewline
            if ($wave) { Write-Host "  [$wave]" -ForegroundColor Cyan }
            else { Write-Host "" }
        }
        Write-Host ""
    }
    
    # If no jobs found, check for any jobs at all
    if ($jobs.Count -eq 0) {
        $anyJobs = Get-Job
        if ($anyJobs.Count -gt 0) {
            Write-Host "  Other jobs found (not agent-named):" -ForegroundColor DarkGray
            foreach ($job in $anyJobs | Select-Object -First 5) {
                $icon = switch ($job.State) { "Running" { "🔄" } "Completed" { "✅" } default { "⏸️" } }
                $color = switch ($job.State) { "Running" { "Yellow" } "Completed" { "Green" } default { "Gray" } }
                Write-Host "    $icon $($job.Name) - $($job.State)" -ForegroundColor $color
            }
        } else {
            Write-Host "  (No agents running)" -ForegroundColor DarkGray
            Write-Host ""
            Write-Host "  To spawn agents, use Start-Job with gh copilot:" -ForegroundColor DarkGray
            Write-Host "    Start-Job -Name 'wave-0-task1' -ScriptBlock {" -ForegroundColor DarkGray
            Write-Host "      gh copilot -p 'Your task...' --agent workspace" -ForegroundColor DarkGray
            Write-Host "    }" -ForegroundColor DarkGray
        }
    }
    
    Write-Host ""
    Write-Host "  Press Ctrl+C to exit" -ForegroundColor DarkGray
    Write-Host ""
}

# Main loop
if ($Once) {
    Show-Dashboard
} else {
    while ($true) {
        Show-Dashboard
        Start-Sleep -Seconds $RefreshSeconds
    }
}
