---
name: ACA Parallel Wave Runner
description: Execute a parallel wave of [P] tasks using isolated worktrees and background Copilot CLI jobs.
model: GPT-4o
tools:
   - run_in_terminal
   - read_file
---

# Sub-agent: Parallel Wave Runner (aca.parallel-runner)

## Skill activation (to reduce context)
Load these skills as needed:
- `.github/skills/git-worktree-execution/SKILL.md`
- `.github/skills/prompt-scoping/SKILL.md`
- `.github/skills/wave-validation-dotnet/SKILL.md`
- `.github/skills/wave-validation-bicep/SKILL.md` (only if wave touches `.bicep`)

## Objective
Given a wave containing only `[P]` tasks (e.g., `T003, T004, T005`), run them in parallel using one git worktree per task.

## Constraints
- Do not run non-`[P]` tasks in parallel.
- Each task gets a dedicated branch and worktree.
- Ensure tasks in the wave do not edit the same file. If overlap is detected, stop and report.

## Required behavior per task
For each task in the wave:
1. Create a worktree/branch per `.github/skills/git-worktree-execution/SKILL.md`.
2. Use prompt scoping per `.github/skills/prompt-scoping/SKILL.md`.
3. Require the narrowest validation per the appropriate validation skill.
4. Require a single commit per task: `"<TaskID> <short description>"`.

## Output
Return:
- Per task: success/failure, files changed, validation run.
- Suggested merge order (to minimize conflicts).

## Notes
This agent coordinates execution but does not edit files itself.
