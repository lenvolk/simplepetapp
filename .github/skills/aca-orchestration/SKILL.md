---
name: aca-orchestration
description: Orchestrate specs/001-aca-modernization/tasks.md with strict ordering (only [P] parallel), durable run logs, and wave planning/validation. Use when coordinating ACA modernization agents or multi-task execution workflows.
---

# ACA Orchestration (Skill)

## Default invocation
If the user message is exactly `go ahead` (or similar), treat it as:
- Execute `specs/001-aca-modernization/tasks.md` starting at **T001**.
- Proceed without additional confirmation, unless a stop condition is triggered.
- **FIRST**: Read `specs/001-aca-modernization/lessons-learned.md` for pre-emptive fixes and optimizations.

## Pre-flight checks (before T001)
Before starting execution, verify:
1. Git repository initialized: `git rev-parse --git-dir`
2. .NET SDK 9.0 available: `dotnet --version`
3. Azure CLI available (for Bicep validation): `az --version`
4. Create run log: `.docs/orchestrator-runlog.md` (if missing)
5. Review lessons learned: `specs/001-aca-modernization/lessons-learned.md`

## Core rules (non-negotiable)
- Only tasks explicitly marked `[P]` may run in parallel.
- All non-`[P]` tasks run sequentially in ascending task ID order.
- A `[P]` wave must be file-disjoint. If overlap exists: downgrade to sequential and log the decision.
- **Apply pre-emptive fixes** from lessons-learned.md to prevent known issues.
- **Validate after waves**, not after individual tasks (reduces build overhead by 75%).

## Pre-emptive fixes (apply automatically)
These fixes prevent known issues encountered in prior execution:

### Fix 1: Project references (apply after T012)
When creating MyPetVenues.Shared, immediately add reference to MyPetVenues.csproj:
```xml
<ItemGroup>
  <ProjectReference Include=\"..\\MyPetVenues.Shared\\MyPetVenues.Shared.csproj\" />
</ItemGroup>
```

### Fix 2: Service registration cleanup (apply in T050)
When adding API services, remove old mock registrations from MyPetVenues/Program.cs:
- Remove: `builder.Services.AddScoped<IVenueService, VenueService>();`
- Remove: `builder.Services.AddScoped<IBookingService, BookingService>();`
- Remove: `builder.Services.AddScoped<IUserService, UserService>();`

### Fix 3: Cosmos module ordering (apply in T035)
Place cosmos module BEFORE containerapps in infra/main.bicep:
```bicep
module cosmos './modules/cosmos.bicep' = { ... }
module containerapps './modules/containerapps.bicep' = { 
  dependsOn: [cosmos]
  ...
}
```

### Fix 4: Cosmos outputs (apply in T034)
Include accountId in cosmos.bicep outputs:
```bicep
output accountId string = cosmosAccount.id
```

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
- A task fails after two remediation attempts (check lessons-learned.md first)
- A prerequisite tool is missing (git / .NET SDK / Azure CLI / etc.)

## Performance optimizations

### High-value parallel waves (execute these in parallel)
- **Wave 1.1** (after T002): T003, T004, T005 (3 tasks, ~9min saved)
- **Wave 2.1** (after T012): T013, T019, T020, T021, T023 (5 tasks, ~12min saved)
- **Wave 2.2** (after T014): T015, T016 (2 tasks, ~4min saved)
- **Wave 3.1** (after T024): T025, T026 (2 tasks, ~4min saved)
- **Wave 4.1** (after T036): T037, T040, T043, T046 (4 tasks, ~9min saved)
- **Wave 5.1** (after T054): T055, T058 (2 tasks, ~4min saved)

Total time saved: ~42 minutes on 70-task execution

### Validation checkpoints (run solution build at these points)
- After Wave 2.1 (foundation services)
- After T017 (project references)
- After Wave 4.1 (contracts)
- After T050-T051 (UI services)
- After Phase 5 complete (observability)
- After Phase 6 complete (RBAC)
- Final: After Phase 7 complete

## References
- Worktree mechanics: `../git-worktree-execution/SKILL.md`
- Prompt scoping rules: `../prompt-scoping/SKILL.md`
- Validation rules: `../wave-validation-dotnet/SKILL.md`, `../wave-validation-bicep/SKILL.md`
