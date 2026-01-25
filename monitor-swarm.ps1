<#
.SYNOPSIS
    Live dashboard to monitor parallel Copilot CLI agents during swarm demo.

.DESCRIPTION
    Run this in a separate terminal while the orchestrator spawns agents.
    Shows real-time status of all background jobs and worktree activity.

.EXAMPLE
    # In a NEW terminal (not the one running the orchestrator):
    .\monitor-swarm.ps1

.EXAMPLE
    # Auto-refresh every 2 seconds:
    .\monitor-swarm.ps1 -RefreshSeconds 2
#>

param(
    [int]$RefreshSeconds = 3,
    [switch]$Once
)

$RepoRoot = $PSScriptRoot

function Show-Dashboard {
    Clear-Host
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    Write-Host ""
    Write-Host "╔══════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║           🐝 SWARM MODE MONITOR - Live Dashboard                         ║" -ForegroundColor Cyan
    Write-Host "║                                                                          ║" -ForegroundColor Cyan
    Write-Host "║  Press Ctrl+C to exit                              $timestamp  ║" -ForegroundColor Cyan
    Write-Host "╚══════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 1: Background Jobs
    # ═══════════════════════════════════════════════════════════════════════
    Write-Host "┌────────────────────────────────────────────────────────────────────────────┐" -ForegroundColor Yellow
    Write-Host "│  📋 BACKGROUND JOBS (PowerShell Start-Job)                                │" -ForegroundColor Yellow
    Write-Host "└────────────────────────────────────────────────────────────────────────────┘" -ForegroundColor Yellow
    
    $jobs = Get-Job | Where-Object { $_.Name -like "agent-*" -or $_.Name -like "task-*" }
    
    if ($jobs.Count -eq 0) {
        Write-Host "  (No agent jobs running yet - waiting for orchestrator to spawn...)" -ForegroundColor DarkGray
    } else {
        Write-Host ""
        Write-Host "  Name                    State        Duration     Has Output" -ForegroundColor White
        Write-Host "  ────────────────────    ─────────    ─────────    ──────────" -ForegroundColor DarkGray
        
        foreach ($job in $jobs) {
            $duration = ""
            if ($job.PSBeginTime) {
                $endTime = if ($job.PSEndTime) { $job.PSEndTime } else { Get-Date }
                $span = $endTime - $job.PSBeginTime
                $duration = "{0:mm\:ss}" -f $span
            }
            
            $stateColor = switch ($job.State) {
                "Running"   { "Yellow" }
                "Completed" { "Green" }
                "Failed"    { "Red" }
                default     { "Gray" }
            }
            
            $stateIcon = switch ($job.State) {
                "Running"   { "🔄" }
                "Completed" { "✅" }
                "Failed"    { "❌" }
                "Stopped"   { "⏹️" }
                default     { "⏸️" }
            }
            
            $hasData = if ($job.HasMoreData) { "Yes" } else { "No" }
            
            Write-Host ("  {0,-22}  " -f $job.Name) -NoNewline
            Write-Host ("{0} {1,-8}" -f $stateIcon, $job.State) -ForegroundColor $stateColor -NoNewline
            Write-Host ("  {0,-9}  {1}" -f $duration, $hasData)
        }
        
        # Summary
        $running = ($jobs | Where-Object State -eq "Running").Count
        $completed = ($jobs | Where-Object State -eq "Completed").Count
        $failed = ($jobs | Where-Object State -eq "Failed").Count
        
        Write-Host ""
        Write-Host "  Summary: " -NoNewline
        Write-Host "$running running" -ForegroundColor Yellow -NoNewline
        Write-Host " | " -NoNewline
        Write-Host "$completed completed" -ForegroundColor Green -NoNewline
        Write-Host " | " -NoNewline
        Write-Host "$failed failed" -ForegroundColor Red
    }
    
    Write-Host ""

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 2: Git Worktrees
    # ═══════════════════════════════════════════════════════════════════════
    Write-Host "┌────────────────────────────────────────────────────────────────────────────┐" -ForegroundColor Magenta
    Write-Host "│  🌳 GIT WORKTREES (Isolated workspaces for parallel editing)              │" -ForegroundColor Magenta
    Write-Host "└────────────────────────────────────────────────────────────────────────────┘" -ForegroundColor Magenta
    
    Push-Location $RepoRoot
    $worktrees = git worktree list 2>$null
    Pop-Location
    
    Write-Host ""
    foreach ($wt in $worktrees) {
        if ($wt -match "wt-|worktree-|task-") {
            # This is an agent worktree
            $parts = $wt -split '\s+'
            $path = $parts[0]
            $branch = if ($parts[-1] -match '\[(.+)\]') { $matches[1] } else { "unknown" }
            
            # Check for recent file activity
            $recentFiles = Get-ChildItem -Path $path -Recurse -File -ErrorAction SilentlyContinue | 
                           Where-Object { $_.LastWriteTime -gt (Get-Date).AddMinutes(-5) } |
                           Select-Object -First 3
            
            Write-Host "  📂 " -NoNewline
            Write-Host $branch -ForegroundColor Cyan -NoNewline
            Write-Host " → $path" -ForegroundColor DarkGray
            
            if ($recentFiles) {
                foreach ($f in $recentFiles) {
                    Write-Host "     └─ Modified: $($f.Name)" -ForegroundColor Green
                }
            }
        } else {
            # Main worktree
            Write-Host "  📂 " -NoNewline
            Write-Host "(main) " -ForegroundColor White -NoNewline
            Write-Host $wt -ForegroundColor DarkGray
        }
    }
    
    $wtCount = ($worktrees | Where-Object { $_ -match "wt-|worktree-|task-" }).Count
    if ($wtCount -eq 0) {
        Write-Host "  (No agent worktrees created yet)" -ForegroundColor DarkGray
    }
    
    Write-Host ""

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 3: Memory.md Progress
    # ═══════════════════════════════════════════════════════════════════════
    Write-Host "┌────────────────────────────────────────────────────────────────────────────┐" -ForegroundColor Blue
    Write-Host "│  📝 MEMORY.MD - Agent Progress Log                                        │" -ForegroundColor Blue
    Write-Host "└────────────────────────────────────────────────────────────────────────────┘" -ForegroundColor Blue
    
    $memoryPath = Join-Path $RepoRoot ".docs\memory.md"
    if (Test-Path $memoryPath) {
        $content = Get-Content $memoryPath -Raw
        
        # Count progress
        $completed = ([regex]::Matches($content, '✅|Complete')).Count
        $inProgress = ([regex]::Matches($content, '🔄|In Progress')).Count
        
        Write-Host ""
        Write-Host "  Progress: " -NoNewline
        Write-Host "$completed completed" -ForegroundColor Green -NoNewline
        Write-Host " | " -NoNewline
        Write-Host "$inProgress in progress" -ForegroundColor Yellow
        
        # Show last few log entries
        $lines = $content -split "`n"
        $logStart = $false
        $logLines = @()
        foreach ($line in $lines) {
            if ($line -match "Agent Progress Log") { $logStart = $true; continue }
            if ($logStart -and $line.Trim()) {
                $logLines += $line
            }
        }
        
        if ($logLines.Count -gt 0) {
            Write-Host ""
            Write-Host "  Recent entries:" -ForegroundColor DarkGray
            $logLines | Select-Object -Last 6 | ForEach-Object {
                $line = $_.TrimStart()
                if ($line -match '✅') {
                    Write-Host "    $line" -ForegroundColor Green
                } elseif ($line -match '🔄|In Progress') {
                    Write-Host "    $line" -ForegroundColor Yellow
                } elseif ($line -match '❌|Failed') {
                    Write-Host "    $line" -ForegroundColor Red
                } else {
                    Write-Host "    $line" -ForegroundColor Gray
                }
            }
        }
    } else {
        Write-Host "  (memory.md not found)" -ForegroundColor DarkGray
    }
    
    Write-Host ""

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 4: Quick Commands
    # ═══════════════════════════════════════════════════════════════════════
    Write-Host "┌────────────────────────────────────────────────────────────────────────────┐" -ForegroundColor DarkCyan
    Write-Host "│  💡 QUICK COMMANDS (run in another terminal)                              │" -ForegroundColor DarkCyan
    Write-Host "└────────────────────────────────────────────────────────────────────────────┘" -ForegroundColor DarkCyan
    Write-Host ""
    Write-Host "  Get-Job                           # List all jobs" -ForegroundColor DarkGray
    Write-Host "  Receive-Job -Name 'agent-*'       # See agent output" -ForegroundColor DarkGray
    Write-Host "  git worktree list                 # Show worktrees" -ForegroundColor DarkGray
    Write-Host "  Get-Content .docs\memory.md -Tail 20   # Watch memory" -ForegroundColor DarkGray
    Write-Host ""
}

# Main loop
if ($Once) {
    Show-Dashboard
} else {
    Write-Host "Starting monitor (refresh every $RefreshSeconds seconds)..." -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
    Start-Sleep -Seconds 1
    
    while ($true) {
        Show-Dashboard
        Start-Sleep -Seconds $RefreshSeconds
    }
}
