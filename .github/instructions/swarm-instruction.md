---
applyTo: "**"
---

# Swarm Mode: The Brain 🧠

> **What is this?** A beginner-friendly guide to orchestrating multiple AI agents working in parallel.
> Think of it like a conductor leading an orchestra - each musician (agent) plays their part, and you coordinate them all!

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
                    │ .docs/report.md │
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
```
📄 demo-tasks.md
├── Task 1: Add venue map (no dependencies)
├── Task 2: Add favorites button (no dependencies)  
├── Task 3: Create email service (no dependencies)
└── Task 4: Add booking confirmation (depends on Task 3)
```

### Step 2: Build Waves
```
Wave 0: [Task 1, Task 2, Task 3]  ← Can run together!
Wave 1: [Task 4]                  ← Must wait for Task 3
```

### Step 3: Spawn Agents
For each task in Wave 0, we create a separate agent using `gh copilot` CLI:
```powershell
# Agent 1 works on Task 1 (background job)
Start-Job -Name "wave-0-task1" -ScriptBlock {
    Set-Location "C:\path\to\worktree-task1"
    gh copilot -p "Add venue map component" --agent workspace --allow-all-tools
}

# Agent 2 works on Task 2 (runs in parallel!)
Start-Job -Name "wave-0-task2" -ScriptBlock {
    Set-Location "C:\path\to\worktree-task2"
    gh copilot -p "Add favorites button" --agent workspace --allow-all-tools
}

# Agent 3 works on Task 3 (runs in parallel!)
Start-Job -Name "wave-0-task3" -ScriptBlock {
    Set-Location "C:\path\to\worktree-task3"
    gh copilot -p "Create email service" --agent workspace --allow-all-tools
}

# Monitor all agents
Get-Job | Where-Object { $_.Name -like "wave-*" }
```

### Step 4: Track Progress
Each agent updates memory when done:
```markdown
## Task Progress
- [x] Task 1: Add venue map - COMPLETED by Agent-1 at 10:15 AM
- [x] Task 2: Add favorites - COMPLETED by Agent-2 at 10:18 AM
- [x] Task 3: Email service - COMPLETED by Agent-3 at 10:20 AM
```

### Step 4b: Monitor Running Agents
Use the monitor script to see active agents:
```powershell
# Run the swarm monitor
.\monitor-swarm.ps1

# Or check manually
Get-Job | Where-Object { $_.Name -like "wave-*" }
```

The monitor shows:
- **Active Agents**: Count of running background jobs
- **RUNNING**: Which agents are working and their wave
- **COMPLETED**: Finished agents

### Step 5: Generate Report
When all tasks are done, create a summary report in `.docs/report.md`

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
4. **Check the report** in `.docs/report.md`

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
