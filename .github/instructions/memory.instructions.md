---
applyTo: **
---

# Memory Management

You have a memory system located at `.docs/memory.md`.

## ⚠️ CRITICAL: MANDATORY FIRST STEP

**Before starting ANY build, swarm mode, or complex task:**

1. **READ `.docs/memory.md` FIRST** - It contains the actual project state
2. **VERIFY folder existence** - Run `Test-Path "MyPetVenues"` to confirm
3. **Trust workspace structure over code excerpts** - Search indexing may show code from other branches

**DO NOT assume code exists based on search excerpts. The workspace folder list is the source of truth.**

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
