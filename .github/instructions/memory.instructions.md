---
applyTo: **
---

# Memory Management

You have a memory system located at `.docs/memory.md`.

## � DECISION TREE - USE THIS FIRST

```
Does workspace structure list "MyPetVenues/" folder?
    │
    ├─ NO → App doesn't exist → BUILD IT
    │       DO NOT claim "already built"
    │       DO NOT cite code excerpts as evidence
    │
    └─ YES → App exists → Work with it
```

## 🚨 HALLUCINATION PREVENTION

**You have previously hallucinated that MyPetVenues exists when it does NOT.**

### TRUST HIERARCHY:
1. **User's workspace structure** in their message - HIGHEST TRUST
2. **Terminal output** from `Test-Path`, `Get-ChildItem` - HIGH TRUST  
3. **`.docs/memory.md`** status field - HIGH TRUST
4. ~~VS Code search results~~ - DO NOT TRUST (may show git history)
5. ~~copilot-instructions.md~~ - DO NOT TRUST (describes intended, not actual)
6. ~~Code snippets in context~~ - DO NOT TRUST (may be from other branches)

### FORBIDDEN PHRASES:
- ❌ "The app appears to already exist..."
- ❌ "Based on the code excerpts I can see..."
- ❌ "The MyPetVenues application is already complete..."
- ❌ Any claim that code exists without workspace folder verification

## 🤖 AUTONOMOUS MODE

**For swarm mode builds: DO NOT ask questions. Work fully autonomously.**

- The implementation plan (`.docs/implementation.md`) contains all decisions
- If app doesn't exist → START BUILDING
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
