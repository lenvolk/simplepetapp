# MyPetVenues Project Memory

## Project Summary
A pet-friendly location discovery platform ("Yelp/Meetup for pets") - Blazor WebAssembly app.

## 🚨 CRITICAL LEARNING (2026-01-24)

**Bug Found**: Orchestrator was DISPLAYING commands in markdown instead of EXECUTING them.

**Fix Applied**: Updated `.github/prompts/swarm-mode.prompt.md` with explicit instructions to use `run_in_terminal` tool.

**Rule**: ALWAYS use `run_in_terminal` tool to execute PowerShell commands.
- ❌ WRONG: Show `git worktree add` in a code block
- ✅ RIGHT: Call `run_in_terminal` tool with that command

**Verified Working** (2026-01-24):
- Copilot CLI: v0.0.370 ✅
- Git worktree creation: Tested successfully ✅
- Start-Job + copilot: Tested successfully ✅
- Job monitoring: Tested successfully ✅

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

### Files Reference
- Implementation Plan: .docs/implementation.md
- Demo Tasks (simple): .docs/demo-tasks.md
- Swarm Instructions: .github/instructions/swarm-instruction.md
- Orchestrator Prompt: .github/prompts/swarm-mode.prompt.md

---

## Agent Progress Log

> Agents update this section when working on tasks

(Waiting for orchestrator to start...)

