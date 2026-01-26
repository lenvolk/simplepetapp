---
applyTo: "**"
---

# 🚨🚨🚨 CRITICAL REMINDER - READ BEFORE EVERY BUILD 🚨🚨🚨

> **PAST FAILURE**: On 2026-01-26, the orchestrator completed a full build but FORGOT to update
> `report.xlsx` because it got absorbed in fixing 32+ build errors. The report was empty at the end.
>
> **ROOT CAUSE**: Report updates felt "lower priority" than making progress on the actual build.
>
> **FIX**: Report updates are now a **BLOCKING REQUIREMENT**. You CANNOT proceed to Wave N+1
> until you have updated report.xlsx for Wave N. This is not optional documentation.

---

# Swarm Mode: The Brain 🧠

> **What is this?** A beginner-friendly guide to orchestrating multiple AI agents working in parallel.
> Think of it like a conductor leading an orchestra - each musician (agent) plays their part, and you coordinate them all!

> **📊 Excel Updates**: To update `.docs/report.xlsx`, use the **xlsx skill** (`.github/skills/xlsx/SKILL.md`).
> Read the skill documentation first for proper openpyxl usage and formula preservation.

## ⚠️ PRE-FLIGHT CHECK (MANDATORY FIRST STEP)

### 🤖 FULLY AUTONOMOUS MODE - NO USER INTERACTION

**This is a fully autonomous workflow. DO NOT ask any questions.**

The implementation plan (`.docs/implementation.md`) contains all decisions. Just execute:
1. Verify `Test-Path "MyPetVenues"` returns `False`
2. Check prerequisites (copilot CLI, dotnet SDK)
3. Start Wave 0 immediately
4. Continue through all waves until complete

**FORBIDDEN:**
- ❌ Asking "Which option would you prefer?"
- ❌ Asking "Should I proceed?"
- ❌ Offering choices like "Option A / Option B / Option C"
- ❌ Waiting for user confirmation

**REQUIRED:**
- ✅ Just start building
- ✅ Follow implementation.md exactly
- ✅ Update memory.md with progress
- ✅ **Update report.xlsx AFTER EACH WAVE** (not just at the end!)

---

## � Quick Entry Points (Slash Commands)

| Command | What It Does | When to Use |
|---------|--------------|-------------|
| `/swarm-start` | Fresh build from Wave 0 | Starting a new demo |
| `/swarm-resume` | Continue interrupted build | After session handoff |
| `/swarm-status` | Check progress & state | Anytime during build |

These prompt files in `.github/prompts/` are auto-discovered by VS Code Copilot.

---

## �📊 MANDATORY: Incremental Report Updates

**YOU MUST update `.docs/report.xlsx` after EACH wave completes, NOT just at the end!**

This is critical for:
1. Real-time demo visibility
2. Progress tracking if session is interrupted
3. Accurate timing data capture

### When to Update report.xlsx

| Event | Update These Sheets |
|-------|---------------------|
| **Pre-flight complete** | Timeline (add "Pre-flight" event) |
| **Wave N agents spawned** | Agents, Timeline |
| **Wave N complete** | Waves, Tasks, Timeline |
| **Subagent research done** | Research, Timeline |
| **Final build passes** | Summary, Timeline |

### Python Code to Run After EACH Wave

**After Wave N completes, run this in terminal:**

```python
python -c "
from openpyxl import load_workbook
from datetime import datetime

wb = load_workbook('.docs/report.xlsx')

# Update Waves sheet
waves = wb['Waves']
row = 2 + WAVE_NUMBER  # Replace WAVE_NUMBER with 0, 1, 2, etc.
waves[f'A{row}'] = 'Wave N'
waves[f'B{row}'] = AGENT_COUNT
waves[f'C{row}'] = 'START_TIME'
waves[f'D{row}'] = 'END_TIME'
waves[f'E{row}'] = 'DURATION'
waves[f'F{row}'] = '✅ Complete'

# Update Timeline sheet
timeline = wb['Timeline']
next_row = timeline.max_row + 1
timeline[f'A{next_row}'] = datetime.now().strftime('%H:%M')
timeline[f'B{next_row}'] = 'Wave N Complete'
timeline[f'C{next_row}'] = 'Merged X branches, Y files changed'

# Update Agents sheet for each agent in this wave
agents = wb['Agents']
# Add one row per agent...

# Update Tasks sheet
tasks = wb['Tasks']
# Add one row per task...

wb.save('.docs/report.xlsx')
print('✅ Report updated for Wave N')
"
```

### Orchestrator Checklist (Per Wave)

```
□ Wave N Start
  ├── Create worktrees
  ├── Spawn agents via Start-Job
  └── Log agents to report.xlsx Agents sheet

□ Wave N Wait
  └── Get-Job | Wait-Job

□ Wave N Complete  
  ├── Check job outputs
  ├── Merge branches
  ├── Run dotnet build
  ├── Fix any errors
  ├── **UPDATE report.xlsx** ← MANDATORY!
  │   ├── Waves sheet: add wave row
  │   ├── Tasks sheet: add task rows
  │   ├── Agents sheet: update status
  │   └── Timeline sheet: add event
  ├── Clean up worktrees
  └── Update memory.md

□ Proceed to Wave N+1
```

---

**BEFORE starting ANY swarm mode orchestration, you MUST:**

1. **Read `.docs/memory.md`** - It contains the actual project state
2. **Verify folder existence** - Run `Test-Path "MyPetVenues"` in terminal
3. **DO NOT trust code excerpts** - Search indexing may show code from other branches/history

```powershell
# Run these commands FIRST before spawning any agents:
Test-Path "MyPetVenues"          # Should return False if cleaned
Get-ChildItem -Directory | Select-Object Name  # Verify actual folders
```

**RULE:** If `Test-Path "MyPetVenues"` returns `False` → the app does NOT exist → proceed with building from Wave 0.

**WHY:** VS Code search may show code excerpts from git history or other branches. These DO NOT reflect the current state. Always verify with actual file system checks.

---

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
              ┌───────────────────────────────────┐
              │  After EACH wave completes:       │
              │  1. Update 📝 .docs/memory.md     │
              │  2. Update 📊 .docs/report.xlsx   │ ← MANDATORY!
              └───────────────────────────────────┘
```

### Report Update Flow (Per Wave)
```
Wave 0 spawned → Wave 0 complete → UPDATE report.xlsx → Wave 1 spawned → ...
                                         ↑
                                   DON'T SKIP THIS!
```

## 📚 Key Concepts (L200 - Beginner Friendly)

### 1. What is a Background CLI Agent?
A **Background CLI Agent** is a Copilot instance running in its own terminal via `Start-Job` + `copilot` CLI. These are the actual workers that edit files:
- **agent-homepage**: "Add a new button to the homepage"
- **agent-services**: "Create a new service file"
- **agent-css**: "Update the CSS theme"

Each agent works in an isolated git worktree and reports back when done!

> **Note**: This is different from the `runSubagent` tool in VS Code, which runs synchronously within Copilot chat for analysis/research tasks.

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
📄 implementation.md
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

### Step 4: Spawn Background CLI Agents ⚠️ CRITICAL
**YOU MUST spawn agents using `run_in_terminal` with `Start-Job` and the `copilot` CLI.**

```powershell
# Spawn Wave 0 agents (run this in terminal)
Start-Job -Name "agent-models" -ScriptBlock {
    Set-Location "C:\Temp\GIT\wt-models"
    copilot -p "Your detailed task prompt here. When done, commit changes and update .docs/memory.md" --allow-all-tools
}

Start-Job -Name "agent-services" -ScriptBlock {
    Set-Location "C:\Temp\GIT\wt-services"
    copilot -p "Your detailed task prompt here. When done, commit changes and update .docs/memory.md" --allow-all-tools
}
```

**Job naming convention**: `agent-<taskname>` (e.g., `agent-models`, `agent-services`, `agent-layout`)

### Step 5: Wait for Wave Completion
Monitor and wait for all jobs in the wave to complete:
```powershell
# Check status of all agents
Get-Job | Where-Object { $_.Name -like "agent-*" }

# Wait for specific agents in current wave
Get-Job | Where-Object { $_.Name -in @("agent-models", "agent-services") } | Wait-Job

# Or wait for all agents
Get-Job | Where-Object { $_.Name -like "agent-*" } | Wait-Job
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

**⚠️ IMMEDIATELY after merge: Update report.xlsx!** (See "Incremental Report Updates" section above)

Then proceed to Wave 1, repeating steps 3-6.

### Step 7: Track Progress in Memory
Update `.docs/memory.md` as waves complete:
```markdown
## Agent Progress Log
- 10:15 ✅ Wave 0 complete (3 agents)
- 10:20 🔄 Wave 1 started (1 agent)
- 10:25 ✅ Wave 1 complete
```

### Step 8: Update Report (After EACH Wave!)
**DO NOT wait until the end!** Update `.docs/report.xlsx` after EVERY wave:
- Add completed agents to Agents sheet
- Add completed tasks to Tasks sheet  
- Add wave summary to Waves sheet
- Add timeline event to Timeline sheet
- Update Summary sheet totals at the very end

## 🔄 Background CLI Agents vs runSubagent Tool

| Aspect | Background CLI Agent | runSubagent Tool |
|--------|---------------------|------------------|
| **How to spawn** | `Start-Job` + `copilot` CLI | `runSubagent(...)` in Copilot chat |
| **Execution** | True parallel, isolated worktree | Synchronous, within chat context |
| **Can edit files?** | ✅ YES - this is their purpose | Optional - primarily for analysis |
| **Visible in terminal?** | ✅ YES - monitored via `Get-Job` | ❌ NO - runs internally |
| **Use for** | Actual coding tasks | Research, analysis, quick queries |

**For parallel task execution, always use Background CLI Agents:**
```powershell
Start-Job -Name "agent-models" -ScriptBlock {
    Set-Location "C:\Temp\GIT\wt-models"
    copilot -p "Build models..." --allow-all-tools
}
```

## � Specialized Agent Roles (APM-Inspired)

Instead of generic `agent-taskname`, use role-based personas for better results:

| Role | Focus Area | Best For |
|------|------------|----------|
| `agent-architect` | Structure, patterns, foundations | Project setup, models, configuration |
| `agent-stylist` | Visual design, CSS, UX | Themes, animations, layouts |
| `agent-implementer` | Feature code, business logic | Services, components, pages |
| `agent-integrator` | Wiring, testing, validation | Program.cs, final build, fixes |

**Why roles matter?** Different tasks need different expertise focus:
- An architect thinks about patterns and structure
- A stylist knows CSS tricks and animations
- An integrator knows dependency injection and testing

**Example prompt for agent-stylist:**
```
You are agent-stylist, a CSS and design specialist.
Your focus: Beautiful, unique designs (NOT generic AI slop!).
- Use CSS variables for consistency
- Create smooth animations
- Consider both light and dark themes
```

---

## �🔬 Subagent Research Checkpoints (Optimization)

Use subagents between waves to analyze completed work and enrich prompts for the next wave. This improves agent accuracy and reduces errors.

### When to Use Subagent Research

| Checkpoint | Research Task | Benefit |
|------------|---------------|---------|
| After Wave 0 (Models) | Analyze model properties and enums | Services get exact type signatures |
| After Wave 1 (Services) | Review service interfaces | Components know available methods |
| After Wave 2 (Components) | List component parameters | Pages use correct bindings |
| After Any Wave | Analyze build errors | Next wave includes fixes |

### Example: Research Between Waves

```
Wave 0 completes (models, CSS, project structure)
    ↓
You: "Use a subagent to analyze Models/*.cs and list all 
     properties and enums the services should expose"
    ↓
Copilot: [Calls runSubagent internally, waits for result]
Copilot: "Analysis complete:
         - Venue: Id, Name, Rating, VenueType, AllowedPets...
         - VenueType enum: Park, Cafe, Hotel, Beach...
         - PetType enum: Dog, Cat, Bird..."
    ↓
Wave 1 agents get enriched prompts with actual model details
```

### Subagent Research Prompts

**After Wave 0 (Models created):**
```
Use a subagent to analyze MyPetVenues/Models/*.cs and summarize:
1. All class properties with their types
2. All enum values
3. Any relationships between models
```

**After Wave 1 (Services created):**
```
Use a subagent to review MyPetVenues/Services/I*.cs interfaces and list:
1. All available methods
2. Parameter types and return types
3. Methods that components will likely need
```

**After Any Wave (Build check):**
```
Use a subagent to run 'dotnet build' and analyze any errors.
Summarize fixes needed for the next wave.
```

### Why This Helps

- **Fresh context**: Subagent gets focused context, not cluttered conversation history
- **Accurate prompts**: Next wave agents get exact property names, method signatures
- **Fewer errors**: Reduces "method not found" or "property doesn't exist" issues
- **No file conflicts**: Subagents analyze only; they don't interfere with worktrees

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

> ⚠️ **Before starting any build**: Ensure `report.xlsx` exists by running `cleanup.ps1` or:
> ```powershell
> Copy-Item ".docs/report-template.xlsx" ".docs/report.xlsx"
> ```

### Report Structure
| Sheet | Purpose | Key Columns |
|-------|---------|-------------|
| **Summary** | Overall execution stats (auto-calculated) | Agent counts, totals |
| **Tasks** | Detailed task log | Task, Agent, **Type**, Status, Duration |
| **Waves** | Wave-by-wave breakdown | Wave #, Agent count, Duration |
| **Research** | 🆕 **Subagent research calls** | Purpose, Findings, Enriched Wave |
| **Agents** | Background CLI Agent metrics | Agent, Task, **Type**, Worktree |
| **Timeline** | Chronological event log | Timestamp, Event, Details |

### Agent Type Values (Critical for Demo!)

The **Type** column distinguishes agent types for students:
- `Background CLI` - Workers spawned via `Start-Job` + `copilot` CLI (true parallel)
- `Subagent` - Research calls via `runSubagent` in chat (synchronous analysis)

### Using openpyxl to Update the Report

```python
from openpyxl import load_workbook
from datetime import datetime

# Load existing report
wb = load_workbook('.docs/report.xlsx')

# ===== Update Tasks sheet - Background CLI Agent task =====
tasks_sheet = wb['Tasks']
next_row = tasks_sheet.max_row + 1
tasks_sheet[f'A{next_row}'] = 'Add venue map'      # Task name
tasks_sheet[f'B{next_row}'] = 'agent-models'       # Agent ID
tasks_sheet[f'C{next_row}'] = 'Background CLI'    # Type (important!)
tasks_sheet[f'D{next_row}'] = '✅ Done'            # Status
tasks_sheet[f'E{next_row}'] = '3m 15s'             # Duration
tasks_sheet[f'F{next_row}'] = 'Claude Sonnet 4'   # Model
tasks_sheet[f'G{next_row}'] = 2450                 # Tokens
tasks_sheet[f'H{next_row}'] = datetime.now()       # Timestamp

# ===== Update Research sheet - Subagent research call =====
research_sheet = wb['Research']
next_row = research_sheet.max_row + 1
research_sheet[f'A{next_row}'] = 'R1'                          # Research ID
research_sheet[f'B{next_row}'] = 'Wave 0'                      # After which wave
research_sheet[f'C{next_row}'] = 'Analyze model properties'   # Purpose
research_sheet[f'D{next_row}'] = 'Found 12 Venue properties, 9 VenueTypes'  # Findings
research_sheet[f'E{next_row}'] = '45s'                         # Duration
research_sheet[f'F{next_row}'] = 850                           # Tokens
research_sheet[f'G{next_row}'] = 'Wave 1'                      # Which wave benefited
research_sheet[f'H{next_row}'] = datetime.now()                # Timestamp

# ===== Update Agents sheet - Background CLI Agent =====
agents_sheet = wb['Agents']
next_row = agents_sheet.max_row + 1
agents_sheet[f'A{next_row}'] = 'agent-models'
agents_sheet[f'B{next_row}'] = 'Create domain models'
agents_sheet[f'C{next_row}'] = 'Background CLI'    # Type (important!)
agents_sheet[f'D{next_row}'] = 'Wave 0'
agents_sheet[f'E{next_row}'] = 'wt-models'
agents_sheet[f'F{next_row}'] = '2m 30s'
agents_sheet[f'G{next_row}'] = 1850
agents_sheet[f'H{next_row}'] = '✅ Done'

wb.save('.docs/report.xlsx')
```

### Key Points for Agents
1. **Always load existing file** - Don't create new, use `load_workbook()`
2. **Append rows** - Use `max_row + 1` to find next available row
3. **Set Type column** - Always specify "Background CLI" or "Subagent"
4. **Track Research** - Log subagent calls in Research sheet for demo visibility
5. **Preserve formulas** - Summary sheet auto-calculates from other sheets
6. **Save after updates** - Don't forget `wb.save()`

### Orchestrator Responsibility
The **orchestrator** updates report.xlsx **incrementally after each wave**:

**This is NOT optional!** Update the report:
1. **After spawning agents**: Log to Agents sheet with status "🔄 Running"
2. **After wave completes**: Update Waves sheet, change agent status to "✅ Done"
3. **After subagent research**: Log to Research sheet
4. **After fixes applied**: Log to Timeline sheet
5. **After final wave**: Update Summary sheet totals

### Complete Example: Update Report After Wave 0

Run this Python code in terminal after Wave 0 completes:

```python
python -c "
from openpyxl import load_workbook

wb = load_workbook('.docs/report.xlsx')

# ===== Waves sheet =====
waves = wb['Waves']
waves['A2'] = 'Wave 0'
waves['B2'] = 3  # agent count
waves['C2'] = '18:13'  # start time
waves['D2'] = '18:17'  # end time
waves['E2'] = '~4 min'
waves['F2'] = '✅ Complete'

# ===== Agents sheet =====
agents = wb['Agents']
agent_data = [
    ('agent-foundation', 'Create project structure', 'Background CLI', 'Wave 0', 'wt-foundation', '~3 min', 2500, '✅ Done'),
    ('agent-models', 'Create domain models', 'Background CLI', 'Wave 0', 'wt-models', '~3 min', 2200, '✅ Done'),
    ('agent-styles', 'Create CSS design system', 'Background CLI', 'Wave 0', 'wt-styles', '~4 min', 3100, '✅ Done'),
]
for i, row in enumerate(agent_data, start=2):
    for j, val in enumerate(row):
        agents.cell(row=i, column=j+1, value=val)

# ===== Tasks sheet =====
tasks = wb['Tasks']
task_data = [
    ('Create Blazor project', 'agent-foundation', 'Background CLI', '✅ Done', '~3 min', 'Claude Sonnet 4', 2500, '18:13'),
    ('Create domain models', 'agent-models', 'Background CLI', '✅ Done', '~3 min', 'Claude Sonnet 4', 2200, '18:14'),
    ('Create CSS design system', 'agent-styles', 'Background CLI', '✅ Done', '~4 min', 'Claude Sonnet 4', 3100, '18:16'),
]
for i, row in enumerate(task_data, start=2):
    for j, val in enumerate(row):
        tasks.cell(row=i, column=j+1, value=val)

# ===== Timeline sheet =====
timeline = wb['Timeline']
timeline['A2'] = '18:10'
timeline['B2'] = 'Pre-flight'
timeline['C2'] = 'Verified prerequisites'
timeline['A3'] = '18:13'
timeline['B3'] = 'Wave 0 Start'
timeline['C3'] = 'Spawned 3 agents'
timeline['A4'] = '18:17'
timeline['B4'] = 'Wave 0 Complete'
timeline['C4'] = 'Merged branches, build passed'

wb.save('.docs/report.xlsx')
print('✅ Report updated for Wave 0')
"
```

**Repeat similar updates after Wave 1, 2, 3, 4!**

## 📏 Context Budgeting (Know Your Limits)

LLMs have finite context windows. Plan accordingly:

| Guideline | Why |
|-----------|-----|
| Each wave should use < 25% of orchestrator's context | Leave room for errors and research |
| 5+ agents per wave? Add research checkpoint | Consolidate findings before continuing |
| Large file edits = high token cost | Consider splitting into smaller tasks |
| Long conversations = context pressure | Use session handoff if needed |

**Signs you're running low on context:**
- Copilot repeats itself or forgets earlier decisions
- Responses become generic or vague
- Agent prompts lose specificity

**Solution**: Use `/swarm-resume` after exporting state. See `.docs/session-handoff.md`.

---

## 🛟 Session Handoff (When Context Fills Up)

If context gets too full mid-build, don't start over!

1. **Export state**: Save progress to `.docs/session-state.json`
2. **Start fresh**: Open new Copilot chat
3. **Resume**: Use `/swarm-resume` to continue

Full protocol: `.docs/session-handoff.md`

**Key insight**: Session handoff is a feature, not a failure. It's how you handle LLM limits gracefully.

---

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

1. **Create a plan file** (`.docs/implementation.md`)
2. **Run the orchestrator** with `swarm-mode.prompt.md`
3. **Watch agents work** in parallel
4. **Check the report** in `.docs/report.xlsx`

See [implementation.md](../../.docs/implementation.md) for the full build plan!

## 💡 Key Takeaways

| Concept | What It Means | Why It Matters |
|---------|---------------|----------------|
| **Orchestrator** | Copilot in chat that assigns work | Keeps everything organized |
| **Background CLI Agent** | `Start-Job` + `copilot` worker | Parallel execution = faster! |
| **Wave** | Tasks that run simultaneously | Maximize efficiency |
| **Memory** | Shared progress tracking | Agents stay coordinated |
| **Report** | **Incremental** summary after each wave | Track progress in real-time |

## ⚠️ Common Mistakes to Avoid

1. **Running dependent tasks in parallel** - Task B needs Task A? Don't run them together!
2. **Forgetting to track progress** - Always update memory when a task completes
3. **No error handling** - What if an agent fails? Have a plan!
4. **Too many agents at once** - Start with 2-3, not 10
5. **⚠️ Waiting until the end to update report.xlsx** - Update AFTER EACH WAVE, not at the end!

---

🎉 **Congratulations!** You now understand the basics of multi-agent orchestration!

Next: Check out [swarm-mode.prompt.md](../prompts/swarm-mode.prompt.md) for the mechanical details of HOW to run agents.
