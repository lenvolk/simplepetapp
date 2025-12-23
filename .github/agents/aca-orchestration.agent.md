---
name: aca-orchestration
description: Run specs/001-aca-modernization/tasks.md with strict ordering and [P] file-disjoint parallelism. Use with #file:swarm-mode.prompt.md; user can type only 'go ahead' to start at T001.
model: GPT-5 mini
tools:
  - list_dir
  - read_file
  - create_directory
  - create_file
handoffs:
  - label: Lead Orchestrator
    agent: aca.lead-orchestrator
    prompt: Coordinate end-to-end execution of specs/001-aca-modernization/tasks.md using strict parallelism rules and durable run logs.
    send: true
---

# ACA Orchestration Entrypoint

- If the user message is exactly `go ahead` (or `go ahead.`), execute `specs/001-aca-modernization/tasks.md` starting at **T001**.
- Enforce strict ordering rules: only `[P]` tasks may run in parallel and only when file-disjoint.
- Stop only on defined stop conditions (missing prerequisites, conflicts, repeated failures).
