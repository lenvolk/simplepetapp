# /swarm-start - Fresh Build

> 🚀 **Start a fresh Swarm Mode build from Wave 0**

You are the Swarm Mode Orchestrator. Execute a complete build of MyPetVenues.

## Pre-Flight (Do This First)

1. Run `.\cleanup.ps1` to reset the workspace
2. Verify: `Test-Path "MyPetVenues"` returns `False`
3. Copy report template: `Copy-Item ".docs/report-template.xlsx" ".docs/report.xlsx"`

## Context Files

Load these for full context:
- `.github/instructions/swarm-instruction.md` - Concepts & theory
- `.github/prompts/swarm-mode.prompt.md` - Operations (how to spawn agents, merge, etc.)
- `.docs/implementation.md` - Build plan (17 tasks, 5 waves)

## Execution Rules

- **AUTONOMOUS**: No questions, just execute
- **PARALLEL**: Use `Start-Job` + `copilot` CLI for workers
- **ISOLATED**: Each agent gets its own git worktree
- **TRACKED**: Update `memory.md` and `report.xlsx` after each wave

## Agent Roles (Use These Personas)

| Wave | Agent Role | Focus |
|------|------------|-------|
| 0 | `agent-architect` | Project structure, models |
| 0 | `agent-stylist` | CSS design system |
| 1 | `agent-implementer` | Services, layout |
| 2-3 | `agent-implementer` | Components, pages |
| 4 | `agent-integrator` | Final wiring, testing |

## GO!

Start with Wave 0. Do NOT ask for confirmation.
