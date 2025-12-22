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

## Skill activation (to reduce context)
When starting orchestration, load these skill files on demand (do not inline their contents here):
- `.github/skills/aca-orchestration/SKILL.md`
- `.github/skills/prompt-scoping/SKILL.md` (when crafting delegated prompts)
- `.github/skills/git-worktree-execution/SKILL.md` (when runners manipulate worktrees)
- `.github/skills/wave-validation-dotnet/SKILL.md` and `.github/skills/wave-validation-bicep/SKILL.md` (when validating)

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

## Context engineering
Use the progressive-disclosure approach described in `.github/skills/aca-orchestration/SKILL.md`.

## Output / state
See `.github/skills/aca-orchestration/SKILL.md` for required run log fields and context folder layout.

## Stop conditions
See `.github/skills/aca-orchestration/SKILL.md`.

## Recommended models

Consistency is preferred over micro-optimizing; use the same model across agents unless you have strong cost/latency constraints.

- Entrypoint + Lead Orchestrator: `GPT-5 mini` (planning + policy enforcement at lower PRU)
- Task Graph Builder: `GPT-5 mini` (wave planning + overlap analysis)
- Sequential/Parallel Runners: `GPT-4o` (implementation/execution; optimize for speed/cost)
- Wave Checker: `GPT-4o` (build/validation parsing; escalate to `GPT-4.1` only for tricky failures)
