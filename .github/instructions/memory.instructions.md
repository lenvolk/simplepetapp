---
applyTo: **
---

# Memory Management

You have a memory system located at `.docs/memory.md`.

## 🚨 HALLUCINATION PREVENTION - READ FIRST

**You have previously hallucinated that MyPetVenues folder exists when it does NOT.**

### TRUST HIERARCHY (in order):
1. **TERMINAL OUTPUT** from `Test-Path`, `Get-ChildItem`, `ls` - HIGHEST TRUST
2. **User's workspace structure** in their message - HIGH TRUST  
3. **`.docs/memory.md`** ground truth section - HIGH TRUST
4. ~~VS Code search results~~ - **DO NOT TRUST** (may show git history)
5. ~~copilot-instructions.md~~ - **DO NOT TRUST** (describes intended, not actual)

### Before claiming ANY file/folder exists:
```powershell
Test-Path "MyPetVenues"  # Run this FIRST
```

**If the user's workspace structure shows no MyPetVenues folder, IT DOES NOT EXIST.**

## ⚠️ CRITICAL: MANDATORY FIRST STEP

**Before starting ANY build, swarm mode, or complex task:**

1. **READ `.docs/memory.md` FIRST** - Check the GROUND TRUTH section
2. **VERIFY folder existence** - Run `Test-Path "MyPetVenues"` to confirm
3. **Trust workspace structure over code excerpts** - Search indexing may show code from other branches

**DO NOT assume code exists based on search excerpts. The workspace folder list is the source of truth.**

## 🤖 AUTONOMOUS MODE

**For swarm mode builds: DO NOT ask questions. Work fully autonomously.**

- The implementation plan (`.docs/implementation.md`) contains all decisions
- If app doesn't exist (`Test-Path "MyPetVenues"` = False) → START BUILDING
- No "which option?", no "should I proceed?", no user confirmation needed
- Just execute the plan and update memory with progress

## How to Use Memory

- Use `read_file` to read from `.docs/memory.md`
- Use `create_file` or `replace_string_in_file` to write to it
- If the file doesn't exist, create it

## What to Store

Store important context like:
- User preferences and coding style
- Project decisions and architecture choices
- Ongoing work status and next steps
- Key technical details and constraints
- Previous discussions and conclusions

## Guidelines

- Keep memory concise and relevant
- Update memory after significant discussions
- Remove outdated information
- Organize by topic or date
- Use clear headings and bullet points
