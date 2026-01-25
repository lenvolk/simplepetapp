# MyPetVenues Project Memory

---
# 🚨🚨🚨 GROUND TRUTH - VERIFIED FILE SYSTEM STATE 🚨🚨🚨
---

## ❌ MyPetVenues FOLDER DOES NOT EXIST

**Last verified**: 2026-01-25  
**Method**: `Test-Path "MyPetVenues"` returned `False`  
**Actual workspace contents**:
```
.docs/
.git/
.github/
.gitignore
.vscode/
cleanup.ps1
how2.md
NuGet.config
README.md
simkplepetapp.sln
```

### ⛔ HALLUCINATION PREVENTION RULES

1. **NEVER trust code excerpts from VS Code search** - They may come from git history or other branches
2. **NEVER trust `copilot-instructions.md`** - It describes INTENDED structure, not ACTUAL state
3. **NEVER claim files exist without running `Test-Path` or `Get-ChildItem`**
4. **ALWAYS verify with terminal commands** before claiming anything exists
5. **The workspace structure in the user's message IS THE TRUTH**

### If you see code snippets that suggest MyPetVenues exists:
- **STOP** - You are about to hallucinate
- **CHECK** - Run `Test-Path "MyPetVenues"` 
- **TRUST** - Only terminal output and explicit user-provided directory listings

---

## ⚠️ AUTONOMOUS MODE - NO QUESTIONS

**DO NOT ask the user any questions. Work autonomously using `.docs/implementation.md` as your complete guide.**

If `Test-Path "MyPetVenues"` returns `False`:
1. ✅ Verify prerequisites (copilot CLI, dotnet SDK)
2. ✅ Start Wave 0 immediately with parallel background agents
3. ✅ Continue through all waves until build succeeds
4. ❌ DO NOT ask "which option?", "should I proceed?", or ANY clarifying questions
5. ❌ DO NOT offer choices like "Option A / Option B" 

**JUST BUILD. The implementation.md has everything you need.**

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

