---
name: git-worktree-execution
description: Create isolated git worktrees/branches per task, merge back safely, and clean up. Use when runners execute tasks in parallel or sequentially.
compatibility: Requires git CLI and a shell (PowerShell on Windows supported).
metadata:
  platform: windows
---

# Git Worktree Execution (Skill)

## Naming conventions
- Branch: `task-<TaskID>` (example: `task-T003`)
- Worktree path (repo sibling): `..\worktree-<TaskID>` (example: `..\worktree-T003`)

## Create a worktree
From repo root:
- `git worktree add -b task-T003 ..\worktree-T003 HEAD`

If the branch already exists:
- `git worktree add ..\worktree-T003 task-T003`

## Merge back to main (safe default)
From repo root:
- `git checkout main`
- `git pull`
- `git merge --no-ff task-T003`

If conflicts occur: stop and ask for input.

## Clean up
- `git worktree remove ..\worktree-T003`
- `git branch -d task-T003` (or `-D` only if explicitly safe)

## Guardrails
- Never run two tasks in the same worktree.
- Never run `[P]` tasks in parallel if they touch the same files.
