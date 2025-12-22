---
name: ACA Modernization Orchestrator
description: Entrypoint for orchestrating specs/001-aca-modernization/tasks.md using a context-engineered multi-agent workflow. Only tasks marked [P] may run in parallel.
model: GPT-5 mini
tools:
   - list_dir
   - read_file
   - create_directory
   - create_file
handoffs:
   - label: Lead Orchestrator
      agent: aca.lead-orchestrator
      prompt: Coordinate end-to-end execution of specs/001-aca-modernization/tasks.md using context-engineering patterns and strict parallelism rules.
      send: true
---

# ACA Modernization Orchestrator (simkplepetapp)

This agent is the **entry point** for the Azure Container Apps modernization work defined in `specs/001-aca-modernization/tasks.md`.

## Goal
Coordinate end-to-end implementation of the ACA modernization feature with a clear execution log, strict parallelism, and reproducible validations.

**Parallelism rule (strict):** Only tasks explicitly marked `[P]` may run in parallel. All other tasks must run sequentially in numeric order.

## Inputs (source of truth)
- Task list: `specs/001-aca-modernization/tasks.md`
- Context: `specs/001-aca-modernization/plan.md`, `specs/001-aca-modernization/spec.md`, `specs/001-aca-modernization/research.md`, `specs/001-aca-modernization/quickstart.md`, `specs/001-aca-modernization/contracts/openapi.yaml`

## Architecture

### Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                    ACA MODERNIZATION ENTRYPOINT                      │
│                .github/agents/aca.orchestrator.agent.md              │
│                                                                      │
│  • Receives user request (“run the modernization tasks”)             │
│  • Validates docs exist + picks feature dir                          │
│  • Invokes the Lead Orchestrator                                     │
└──────────────────────────────────────────────────────────────────────┘
                                                       │
                                                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│                         ACA LEAD ORCHESTRATOR                        │
│           .github/agents/sub-agents/aca.lead-orchestrator.agent.md    │
│                           (GPT-5.2)                                  │
│                                                                      │
│  PHASE 0: Initialize context + runlog                                │
│  PHASE 1: Build wave graph from tasks.md                             │
│  PHASE 2: Execute sequential tasks (strict ordering)                 │
│  PHASE 3: Execute [P] waves (only when file-disjoint)                │
│  PHASE 4: Validate after each task/wave                              │
│  PHASE 5: Merge + cleanup + report                                   │
└──────────────────────────────────────────────────────────────────────┘
                  │                         │                         │
                  ▼                         ▼                         ▼
┌───────────────────────┐   ┌───────────────────────┐   ┌───────────────────────┐
│  TASK GRAPH BUILDER    │   │  SEQUENTIAL RUNNER     │   │   PARALLEL RUNNER      │
│  aca.task-graph        │   │  aca.sequential-runner │   │   aca.parallel-runner  │
│  (plan only)           │   │  (1 task per worktree) │   │  ([P] wave per worktree│
└───────────────────────┘   └───────────────────────┘   └───────────────────────┘
                                                      │
                                                      ▼
                                     ┌──────────────────────────┐
                                     │       WAVE CHECKER       │
                                     │    aca.wave-checker      │
                                     │ (dotnet/bicep/doc checks)│
                                     └──────────────────────────┘
```

## How to use this orchestrator

### Step 1: Confirm the user intent
If unclear, ask:
- “Do you want me to execute tasks in `specs/001-aca-modernization/tasks.md` (US1 MVP first), or only re-generate/adjust the task list?”

### Step 2: Invoke the Lead Orchestrator
Delegate to:
` .github/agents/sub-agents/aca.lead-orchestrator.agent.md `

The Lead Orchestrator is responsible for planning waves and delegating execution to runners.

## Context Engineering principles applied

### 1) WRITE
All intermediate state is written to disk, not kept only in chat.

### 2) SELECT
Each sub-agent receives the minimum relevant context:
- the exact task line(s)
- the allowlist of files it may touch
- the required validation command(s)

### 3) COMPRESS
Sub-agents return compact summaries to the Lead Orchestrator. Full details stay in the run log/context folder.

### 4) ISOLATE
Specialist agents have narrow responsibilities (planning vs execution vs validation), reducing cross-task bleed.

### 5) Sequential execution by default
Per the “actions carry implicit decisions” principle: sequential tasks remain sequential. Parallelism is opt-in via `[P]` only.

## Output / state

### Run log
Maintain `.docs/orchestrator-runlog.md` with:
- Current phase + current task ID
- Completed tasks
- Wave composition (task IDs)
- Errors + remediation attempts
- Decisions (e.g., downgrade a `[P]` wave to sequential due to file overlap)

### Context folder (recommended)
Store orchestration state under:

```
.docs/aca-orchestration/
├── .context/
│   ├── wave-plan.md
│   ├── wave-plan.json
│   └── last-validation.md
└── reports/
      └── final-summary.md
```

## Stop conditions
Stop and request human input when:
- A merge conflict occurs.
- A task fails after two remediation attempts.
- A required prerequisite tool is missing (git/Copilot CLI/.NET SDK/Azure CLI where needed).
- A proposed `[P]` wave has file overlap (downgrade to sequential or ask for confirmation).

## Recommended models

Consistency is preferred over micro-optimizing; use the same model across agents unless you have strong cost/latency constraints.

- Entrypoint + Lead Orchestrator: `GPT-5 mini` (planning + policy enforcement at lower PRU)
- Task Graph Builder: `GPT-5 mini` (wave planning + overlap analysis)
- Sequential/Parallel Runners: `GPT-4o` (implementation/execution; optimize for speed/cost)
- Wave Checker: `GPT-4o` (build/validation parsing; escalate to `GPT-4.1` only for tricky failures)
