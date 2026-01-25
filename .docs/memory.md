# MyPetVenues Project Memory

## Project Summary
A pet-friendly location discovery platform ("Yelp/Meetup for pets") - Blazor WebAssembly app.

## Progress
- [ ] Wave 0: Foundation (Project Structure, Models, Global Styles)
- [ ] Wave 1: Services & Layout (Mock Services, Layout Components, Theme)
- [ ] Wave 2: Components (VenueCard, StarRating, ReviewCard, SearchFilters, Badges)
- [ ] Wave 3: Pages (Home, Venues, VenueDetail, Profile, Booking)
- [ ] Wave 4: Integration (Final wiring and testing)

---

## 🐝 Swarm Mode Demo

### Status: Ready for Fresh Build

The application has been cleaned. Use the orchestrator with .docs/implementation.md to rebuild from scratch.

### Documentation Updated (2026-01-25)

**Key changes to swarm documentation:**
- **Job naming convention**: Changed from `wave-N-taskname` to `agent-<taskname>` (e.g., `agent-models`, `agent-services`)
- **Clarified agent types**:
  - **Background CLI Agents** (`Start-Job` + `copilot` CLI): Actual workers that edit files
  - **runSubagent tool**: For analysis/research only, runs synchronously in chat
- **Updated all monitoring commands** to use `Get-Job | Where-Object { $_.Name -like "agent-*" }`
- **Files updated**: swarm-instruction.md, README.md, swarm-mode.prompt.md

### Files Reference
- Implementation Plan: .docs/implementation.md
- Demo Tasks (simple): .docs/demo-tasks.md
- Swarm Instructions: .github/instructions/swarm-instruction.md
- Orchestrator Prompt: .github/prompts/swarm-mode.prompt.md
- **Execution Report: .docs/report.xlsx** (Excel workbook with sheets: Summary, Tasks, Waves, Agents, Timeline)

---

## Agent Progress Log

> Agents update this section when working on tasks. Detailed metrics (timing, tokens, context window) are tracked in `.docs/report.xlsx`.

(Waiting for orchestrator to start...)

