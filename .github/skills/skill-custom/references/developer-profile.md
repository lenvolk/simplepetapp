# Developer Profile — Len Volk

## Identity

- **GitHub**: `lenvolk` (ID: 52181728)
- **Email**: lvolkov@outlook.com
- **Secondary**: `mosksky` (mosksky@gmail.com) — occasional commits

## Working Patterns

### Commit Style Spectrum

The developer uses different commit styles depending on context:

| Mode | Style | When Used |
|------|-------|-----------|
| Checkpoint | `"ok"`, `"first draft"`, `"before implement"` | Save points before/after risky changes |
| Standard | `"Add venue search component"` | Most commits — verb-first, descriptive |
| Task-numbered | `"T052 Add seed data helper"` | Phase-based work with tracking |
| Conventional | `"docs: update copilot instructions"` | Latest preferred style |
| Detailed | Multi-line with bullet body | Major milestones |

**Evolution**: terse → descriptive → task-numbered → conventional commits.
Latest branches use `docs:`, `feat:`, `fix:`, `chore:` prefixes.

### Iteration Pattern

Hallmark behavior — initial implementation followed by rapid refinement:

```
"Add swarm instructions"
→ "Enhance swarm instructions"
→ "Refactor swarm documentation"
→ "Update agent terminology"
→ "Add error prevention"
→ "enforce mandatory report updates"
```

Typical session: 2-6 hours, 10-30+ commits, often on weekends or late nights
(2-5 AM deep work sessions observed). Commits arrive every 5-15 minutes during
focused sprints.

### Documentation-First Approach

- PRD written **before** implementation begins
- `copilot-instructions.md` maintained as a living document
- Agent instruction files authored for each AI role
- `how2.md` walkthroughs created for presentations
- Memory files (`memory.md`) for persistent AI context across sessions

### Anti-Hallucination Discipline

Explicit rules documented to prevent AI agents from making incorrect assumptions:

- "hallucination prevention rules for MyPetVenues folder existence"
- "ground truth verification steps"
- "decision tree clarity for folder verification"

**Rule**: Always run `list_dir` or `Test-Path` before assuming a file/folder exists.

### Phase-Based Execution

Large efforts organized into numbered phases:

```
Phase 4 → Phase 5 (Observability) → Phase 6 (Secretless) → Complete
```

Each phase has task-numbered commits (T051-T066) creating an auditable trail.
Merge commits follow: `"Merge T052"`, `"Merge T055"`.

### Presentation-Driven Development

The repo serves as both product AND teaching material:
- Walkthrough agendas created alongside code
- README includes demo instructions ("Option B demo")
- Branches represent independent demo tracks

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Core app + skills framework |
| `AgentOrchestration` | Multi-agent system (Coder/Designer/Orchestrator/Planner) |
| `001-aca-modernization` | Azure Container Apps deployment |
| `SpecKit` | PRD drafting workflow |
| `dev-container` | Cloud dev environment |
| `structured-autonomy` | Autonomous agent patterns |
| `swarm-mode` | Multi-agent CLI orchestration |
| `swarm-mode-apm` | APM enhancements + slash commands |

Branches are **long-lived exploration tracks**, not short-lived feature branches.

## AI Agent Roles Defined

- **Coder** — Implementation
- **Designer** — UI/UX
- **Orchestrator** — Task coordination
- **Planner** — Architecture planning
- **Debugging Agent** — Systematic bug resolution

## Key Preferences

1. Interface-first design (`IXxxService` → `MockXxxService`)
2. SOLID principles — single responsibility per service
3. Scoped CSS for every Razor component
4. Mobile-first responsive design
5. Event-based state notifications (`OnStateChanged` pattern)
6. Secretless cloud deployment (RBAC/Entra ID)
7. OpenTelemetry for observability
8. Measured optimizations with documented metrics
