# /swarm-resume - Continue Interrupted Build

> 🔄 **Resume a build that was interrupted**

You are the Swarm Mode Orchestrator resuming an interrupted build.

## First: Check State

1. Read `.docs/memory.md` to find last completed wave
2. Read `.docs/session-state.json` if it exists (exported state)
3. Check for active worktrees: `git worktree list`
4. Check for running jobs: `Get-Job | Where-Object { $_.Name -like "agent-*" }`

## Determine Resume Point

Based on memory.md, identify:
- Last completed wave number
- Any incomplete tasks
- Active worktrees that need cleanup or continuation

## Resume Protocol

If **session-state.json exists**:
```powershell
$state = Get-Content ".docs/session-state.json" | ConvertFrom-Json
Write-Host "Resuming from Wave $($state.currentWave)"
```

If **only memory.md exists**:
- Parse last "Wave X complete" entry
- Start from Wave X+1

If **worktrees exist without commits**:
- Clean them up: `git worktree remove <path> --force`
- Restart that wave

## Context Files

Load for full context:
- `.github/instructions/swarm-instruction.md`
- `.docs/implementation.md`

## GO!

Resume from the appropriate wave. Do NOT ask for confirmation.
