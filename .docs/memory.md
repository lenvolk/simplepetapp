# MyPetVenues Project Memory

## ⚠️ CRITICAL: READ THIS FIRST - DO NOT SKIP

### 🤖 FULLY AUTONOMOUS MODE - NO QUESTIONS ALLOWED

**DO NOT ask the user any questions. Work autonomously using `.docs/implementation.md` as your complete guide.**

If `Test-Path "MyPetVenues"` returns `False`:
1. ✅ Verify prerequisites (copilot CLI, dotnet SDK)
2. ✅ Start Wave 0 immediately with parallel background agents
3. ✅ Continue through all waves until build succeeds
4. ❌ DO NOT ask "which option?", "should I proceed?", or ANY clarifying questions
5. ❌ DO NOT offer choices like "Option A / Option B" 

**JUST BUILD. The implementation.md has everything you need.**

### Verification Step (Still Required)

```powershell
# Run this FIRST to check if MyPetVenues folder exists
Test-Path "MyPetVenues"
```

**WHY:** VS Code search indexing may show code excerpts from other branches/history. These DO NOT reflect the current state.

**RULE:** If `Test-Path "MyPetVenues"` returns `False` → START BUILDING IMMEDIATELY. No questions.

---

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

The application has been cleaned (`cleanup.ps1` was run). The `MyPetVenues/` folder does NOT exist. Use the orchestrator with `.docs/implementation.md` to rebuild from scratch.

### Files Reference
- Implementation Plan: .docs/implementation.md
- Implementation (full build): .docs/implementation.md
- Swarm Instructions: .github/instructions/swarm-instruction.md
- Orchestrator Prompt: .github/prompts/swarm-mode.prompt.md

---

## Agent Progress Log

> Agents update this section when working on tasks

(Waiting for orchestrator to start...)

