# 🛟 Session Handoff Protocol

> **What?** How to recover when context fills up mid-build
> **When?** Copilot starts forgetting context, repeating itself, or acting confused

---

## 🚨 Signs You Need Handoff

- Copilot asks about things already discussed
- Agents get incorrect/incomplete prompts
- Orchestrator "forgets" what wave we're on
- Responses become generic or repetitive

---

## 📤 Export State (Before Closing Session)

When you notice context issues, tell Copilot:

```
"Export current state to session-state.json before we continue"
```

Copilot should run:

```powershell
$state = @{
    timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    currentWave = 2  # Replace with actual wave
    completedWaves = @(0, 1)
    activeWorktrees = @(
        @{ name = "wt-component1"; branch = "task-component1"; status = "complete" }
    )
    pendingTasks = @("VenueCard", "StarRating")  # Tasks not yet started
    lastBuildStatus = "pass"  # or "fail" with error summary
    notes = "Wave 2 in progress, 3 of 5 agents complete"
}
$state | ConvertTo-Json -Depth 3 | Set-Content ".docs/session-state.json"
git add .docs/session-state.json
git commit -m "Session handoff: Wave 2 in progress"
```

---

## 📥 Resume in New Session

1. Open fresh VS Code Copilot chat
2. Type: `/swarm-resume`

Or manually:
```
#file:swarm-instruction.md #file:implementation.md
Resume build from .docs/session-state.json
```

Copilot will:
1. Read session-state.json
2. Check memory.md for details
3. Clean up any orphaned worktrees
4. Continue from the appropriate wave

---

## 📋 State File Format

```json
{
  "timestamp": "2026-01-26 14:30:00",
  "currentWave": 2,
  "completedWaves": [0, 1],
  "activeWorktrees": [
    {
      "name": "wt-venuecard",
      "branch": "task-venuecard",
      "status": "running"
    }
  ],
  "pendingTasks": ["SearchFilters", "Badges"],
  "lastBuildStatus": "pass",
  "notes": "Subagent research done, prompts enriched"
}
```

---

## 🧹 Cleanup Orphaned State

If resuming fails, manual cleanup:

```powershell
# Remove all worktrees
git worktree list | ForEach-Object { 
    $path = ($_ -split '\s+')[0]
    if ($path -ne (Get-Location).Path) {
        git worktree remove $path --force 2>$null
    }
}
git worktree prune

# Remove orphaned branches
git branch | Where-Object { $_ -match "task-" } | ForEach-Object {
    git branch -D $_.Trim()
}

# Remove state file
Remove-Item ".docs/session-state.json" -ErrorAction SilentlyContinue

# Now start fresh
# /swarm-start
```

---

## 💡 Prevention Tips

1. **Watch context usage** - If conversation gets very long, consider handoff
2. **Complete waves atomically** - Don't stop mid-wave if possible
3. **Commit after each wave** - Clean git state aids recovery
4. **Update report.xlsx** - It's your backup breadcrumb trail

---

**Remember**: Session handoff is a safety net, not a failure. It's how we handle LLM limitations gracefully!
