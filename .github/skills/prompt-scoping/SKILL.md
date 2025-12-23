---
name: prompt-scoping
description: Write minimal, file-scoped prompts for Copilot/agents (SELECT/COMPRESS/ISOLATE) to reduce context usage and prevent unintended edits. Use when creating task instructions for automated agents or parallel execution.
---

# Prompt Scoping (Skill)

## Objective
Reduce context window usage and prevent scope creep by passing only:
- Task line(s)
- Explicit allowlist of files
- Explicit do-not-touch list
- Single validation command

## Prompt skeleton
Include these sections verbatim (fill in values):

1) Task
- Task ID: <Txxx>
- Exact task text: <paste>

2) Allowed files (allowlist)
- <path1>
- <path2>

3) Do not touch
- Anything outside the allowlist
- Secrets/credentials

4) Validation
- Run: <single command>
- Report: pass/fail + short error summary

5) Output
- List changed files
- Short rationale

## Common scoping mistakes
- Passing whole specs/plan documents when only one task line is needed
- Not enumerating allowed file paths
- Not requiring a validation command
