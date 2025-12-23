---
name: aca-orchestration
description: Orchestrate specs/001-aca-modernization/tasks.md with strict ordering (only [P] parallel), durable run logs, and wave planning/validation. Use when coordinating ACA modernization agents or multi-task execution workflows.
---

# ACA Orchestration (Skill)

## Default invocation
If the user message is exactly `go ahead` (or similar), treat it as:
- Execute `specs/001-aca-modernization/tasks.md` starting at **T001**.
- Proceed without additional confirmation, unless a stop condition is triggered.

## Core rules (non-negotiable)
- Only tasks explicitly marked `[P]` may run in parallel.
- All non-`[P]` tasks run sequentially in ascending task ID order.
- A `[P]` wave must be file-disjoint. If overlap exists: downgrade to sequential and log the decision.

## Source of truth
- Tasks: `specs/001-aca-modernization/tasks.md`
- Context: `specs/001-aca-modernization/plan.md`, `specs/001-aca-modernization/spec.md`, `specs/001-aca-modernization/research.md`, `specs/001-aca-modernization/quickstart.md`, `specs/001-aca-modernization/contracts/openapi.yaml`

## Required state on disk
- Run log: `.docs/orchestrator-runlog.md`
- Context folder:
  - `.docs/aca-orchestration/.context/wave-plan.md`
  - `.docs/aca-orchestration/.context/wave-plan.json` (optional)
  - `.docs/aca-orchestration/.context/last-validation.md`

## Run log template
Maintain these fields as you go:
- Current phase + current task/wave
- Completed tasks
- Wave composition (task IDs)
- Errors + remediation attempts (max 2 before stop)
- Decisions (e.g., “[P] wave downgraded due to file overlap”)

## Context engineering (progressive disclosure)
Use this pattern to reduce context:
1. Keep the agent file minimal.
2. Load this skill when orchestration starts.
3. Only load additional skills (worktrees, prompt scoping, validation) when needed.

## Stop conditions
Stop and request human input when:
- Merge conflict occurs
- A task fails after two remediation attempts
- A prerequisite tool is missing (git / .NET SDK / Azure CLI / etc.)

## References
- Worktree mechanics: `../git-worktree-execution/SKILL.md`
- Prompt scoping rules: `../prompt-scoping/SKILL.md`
- Validation rules: `../wave-validation-dotnet/SKILL.md`, `../wave-validation-bicep/SKILL.md`
