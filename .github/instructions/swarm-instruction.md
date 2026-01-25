---
applyTo: "**"
---

# Swarm Mode: The Brain 🧠

> **What is this?** A beginner-friendly guide to orchestrating multiple AI agents working in parallel.
> Think of it like a conductor leading an orchestra - each musician (agent) plays their part, and you coordinate them all!

> **📊 Excel Updates**: To update `.docs/report.xlsx`, use the **xlsx skill** (`.github/skills/xlsx/SKILL.md`).
> Read the skill documentation first for proper openpyxl usage and formula preservation.

## 🎯 The Big Picture

```
┌─────────────────────────────────────────────────────────────────┐
│                    🎭 ORCHESTRATOR (You)                        │
│         Reads plan → Assigns tasks → Tracks progress            │
└─────────────────────────────────────────────────────────────────┘
                              │
           ┌──────────────────┼──────────────────┐
           ▼                  ▼                  ▼
    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │  🤖 Agent 1 │    │  🤖 Agent 2 │    │  🤖 Agent 3 │
    │   Task A    │    │   Task B    │    │   Task C    │
    └─────────────┘    └─────────────┘    └─────────────┘
           │                  │                  │
           └──────────────────┼──────────────────┘
                              ▼
                    ┌─────────────────┐
                    │  📝 Memory File │
                    │ .docs/memory.md │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  📊 Final Report│
                    │ .docs/report.xlsx │
                    └─────────────────┘
```

## 📚 Key Concepts (L200 - Beginner Friendly)

### 1. What is a Subagent?
A subagent is an AI assistant that works on ONE specific task. Think of it like hiring a specialist:
- **Agent A**: "Add a new button to the homepage"
- **Agent B**: "Create a new service file"
- **Agent C**: "Update the CSS theme"

Each agent works independently and reports back when done!

### 2. What is a Wave?
A wave is a group of tasks that can run **at the same time** because they don't depend on each other.

```
Wave 0: [Task A, Task B, Task C]  ← All run in parallel!
           ▼ (wait for all to finish)
Wave 1: [Task D]                  ← Depends on A, B, C
```

### 3. Why Use Memory?
Memory (`.docs/memory.md`) is how agents communicate:
- Each agent writes: "I finished Task X" with details
- Orchestrator reads: "Oh, Task X is done! Time for the next wave"

## 🔧 How It Works (Step by Step)

### Step 1: Read the Plan
The orchestrator (YOU as Copilot) reads the task plan and analyzes it:
```
📄 demo-tasks.md or implementation.md
├── Task 1: Add venue map (no dependencies)
├── Task 2: Add favorites button (no dependencies)  
├── Task 3: Create email service (no dependencies)
└── Task 4: Add booking confirmation (depends on Task 3)
```

### Step 2: Build Waves (AI Decision)
Analyze dependencies and group independent tasks:
```
Wave 0: [Task 1, Task 2, Task 3]  ← Can run together!
Wave 1: [Task 4]                  ← Must wait for Task 3
```

### Step 3: Create Worktrees for Isolation
Before spawning agents, create isolated git worktrees:
```powershell
# Create worktree for each task in the wave
git worktree add ..\wt-task1 -b task-1
git worktree add ..\wt-task2 -b task-2
git worktree add ..\wt-task3 -b task-3
```

### Step 4: Spawn Agents via Terminal ⚠️ CRITICAL
**YOU MUST spawn agents using `run_in_terminal` with `Start-Job` and the `copilot` CLI.**

```powershell
# Spawn Wave 0 agents (run this in terminal)
Start-Job -Name "wave-0-task1" -ScriptBlock {
    Set-Location "C:\Temp\GIT\wt-task1"
    copilot -p "Your detailed task prompt here. When done, commit changes and update .docs/memory.md" --allow-all-tools
}

Start-Job -Name "wave-0-task2" -ScriptBlock {
    Set-Location "C:\Temp\GIT\wt-task2"
    copilot -p "Your detailed task prompt here. When done, commit changes and update .docs/memory.md" --allow-all-tools
}
```

**Job naming convention**: `wave-{N}-{taskname}` (e.g., `wave-0-models`, `wave-1-services`)

### Step 5: Wait for Wave Completion
Monitor and wait for all jobs in the wave to complete:
```powershell
# Check status
Get-Job | Where-Object { $_.Name -like "wave-0-*" }

# Wait for all wave-0 jobs
Get-Job | Where-Object { $_.Name -like "wave-0-*" } | Wait-Job
```

### Step 6: Merge and Continue
After wave completes:
```powershell
# Merge completed branches
git merge task-1 --no-ff -m "Merge task-1"
git merge task-2 --no-ff -m "Merge task-2"

# Clean up worktrees
Remove-Item ..\wt-task1 -Recurse -Force
git worktree prune
git branch -d task-1
```

Then proceed to Wave 1, repeating steps 3-6.

### Step 7: Track Progress in Memory
Update `.docs/memory.md` as waves complete:
```markdown
## Agent Progress Log
- 10:15 ✅ Wave 0 complete (3 agents)
- 10:20 🔄 Wave 1 started (1 agent)
- 10:25 ✅ Wave 1 complete
```

### Step 8: Generate Report
Create final summary in `.docs/report.xlsx`

## ⚠️ IMPORTANT: Do NOT Use runSubagent

The `runSubagent` tool runs agents internally and they are **invisible** to PowerShell monitoring.

**WRONG** (invisible to monitor):
```
runSubagent("Build models...")  ← Cannot be monitored!
```

**CORRECT** (visible in monitor):
```powershell
Start-Job -Name "wave-0-models" -ScriptBlock {
    copilot -p "Build models..." --allow-all-tools
}
```

## 📊 The Report Format

Every orchestration session should produce a report like this:

```markdown
# Swarm Execution Report

## Summary
- **Total Tasks**: 4
- **Total Time**: 12 minutes
- **Waves Executed**: 2

## Task Details

| Task | Agent | Status | Duration | Model Used | Tokens |
|------|-------|--------|----------|------------|--------|
| Add venue map | Agent-1 | ✅ Done | 3m 15s | gpt-4 | 2,450 |
| Add favorites | Agent-2 | ✅ Done | 4m 02s | gpt-4 | 1,890 |
| Email service | Agent-3 | ✅ Done | 5m 30s | gpt-4 | 3,210 |
| Booking confirm | Agent-4 | ✅ Done | 2m 45s | gpt-4 | 1,650 |
```

## 📝 How to Update report.xlsx

The report file (`.docs/report.xlsx`) is an Excel workbook with multiple sheets. **Use the xlsx skill** to update it properly.

### Report Structure
| Sheet | Purpose |
|-------|---------|
| **Summary** | Overall execution stats (total time, task count, success rate) |
| **Tasks** | Detailed task log with status, duration, tokens, agent info |
| **Waves** | Wave-by-wave breakdown with timing |
| **Agents** | Agent performance metrics |
| **Timeline** | Chronological event log |

### Using openpyxl to Update the Report

```python
from openpyxl import load_workbook
from datetime import datetime

# Load existing report
wb = load_workbook('.docs/report.xlsx')

# Update Tasks sheet - add a completed task row
tasks_sheet = wb['Tasks']
next_row = tasks_sheet.max_row + 1
tasks_sheet[f'A{next_row}'] = 'Add venue map'      # Task name
tasks_sheet[f'B{next_row}'] = 'Agent-1'            # Agent ID
tasks_sheet[f'C{next_row}'] = '✅ Done'            # Status
tasks_sheet[f'D{next_row}'] = '3m 15s'             # Duration
tasks_sheet[f'E{next_row}'] = 'Claude Sonnet 4'   # Model
tasks_sheet[f'F{next_row}'] = 2450                 # Tokens
tasks_sheet[f'G{next_row}'] = datetime.now()       # Timestamp

# Update Summary sheet formulas (they auto-calculate)
summary_sheet = wb['Summary']
# Example: Total tasks formula already exists as =COUNTA(Tasks!A:A)-1

wb.save('.docs/report.xlsx')
```

### Key Points for Agents
1. **Always load existing file** - Don't create new, use `load_workbook()`
2. **Append rows** - Use `max_row + 1` to find next available row
3. **Preserve formulas** - Summary sheet has formulas that auto-calculate from Tasks data
4. **Save after updates** - Don't forget `wb.save()`

### Orchestrator Responsibility
The **orchestrator** (not subagents) should update report.xlsx after each wave completes:
- Update wave timing in Waves sheet
- Mark tasks complete in Tasks sheet
- Log agent performance in Agents sheet

Subagents update `.docs/memory.md` for progress tracking; the orchestrator consolidates into the Excel report.

## 🎓 Learning Path

### Beginner (You Are Here!)
1. Understand what agents are ✅
2. Learn about waves and dependencies ✅
3. See how memory enables coordination ✅
4. Run a simple 2-task demo

### Intermediate
- Create your own task plans
- Handle task failures gracefully
- Use git worktrees for isolation

### Advanced
- Complex dependency graphs
- Dynamic task generation
- Production error handling

## 🚀 Quick Start Demo

Want to try it? Here's a simple 3-task demo you can run:

1. **Create a plan file** (`.docs/demo-tasks.md`)
2. **Run the orchestrator** with `swarm-mode.prompt.md`
3. **Watch agents work** in parallel
4. **Check the report** in `.docs/report.xlsx`

See [demo-tasks.md](../../.docs/demo-tasks.md) for an example plan!

## 💡 Key Takeaways

| Concept | What It Means | Why It Matters |
|---------|---------------|----------------|
| **Orchestrator** | The boss that assigns work | Keeps everything organized |
| **Subagent** | A worker that does one task | Parallel = faster! |
| **Wave** | Tasks that run simultaneously | Maximize efficiency |
| **Memory** | Shared progress tracking | Agents stay coordinated |
| **Report** | Final summary of work | Know what happened |

## ⚠️ Common Mistakes to Avoid

1. **Running dependent tasks in parallel** - Task B needs Task A? Don't run them together!
2. **Forgetting to track progress** - Always update memory when a task completes
3. **No error handling** - What if an agent fails? Have a plan!
4. **Too many agents at once** - Start with 2-3, not 10

---

🎉 **Congratulations!** You now understand the basics of multi-agent orchestration!

Next: Check out [swarm-mode.prompt.md](../prompts/swarm-mode.prompt.md) for the mechanical details of HOW to run agents.
