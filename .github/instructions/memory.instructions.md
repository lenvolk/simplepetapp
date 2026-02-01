---
applyTo: **
---

# Memory Management

You have a persistent memory system located at `.docs/memory.md`.

**CRITICAL: ALWAYS read memory FIRST when starting any session or complex task.**

## Workflow Integration

### On Session Start
1. Read `.docs/memory.md` immediately
2. Check for `## Active Work` section - resume from there if present
3. Review recent decisions before making new ones

### During Complex Work
1. Update `## Active Work` after each significant milestone
2. Log key decisions as you make them
3. Save checkpoint before any risky operation

### Before Context Flush / Session End
1. Write a detailed checkpoint to `## Active Work`
2. Include: current step, next steps, blockers, and file locations
3. Mark incomplete items clearly with `[ ]`

## Memory File Structure

Use this template for `.docs/memory.md`:

```markdown
# Project Memory

## Active Work
<!-- Current task in progress - READ THIS FIRST WHEN RESUMING -->
**Task:** [Brief description]
**Status:** [In Progress | Paused | Blocked]
**Last Updated:** [Date/Time]

### Current State
- Working on: [specific file/feature]
- Completed steps:
  - [x] Step 1 description
  - [x] Step 2 description
- Next steps:
  - [ ] Step 3 description
  - [ ] Step 4 description

### Key Context
- [Critical fact needed to resume]
- [File paths being modified]
- [Test commands used]

### Blockers / Issues
- [Any errors or decisions pending]

---

## Decisions Log
<!-- Important choices made - prevents re-asking same questions -->
| Date | Decision | Rationale |
|------|----------|-----------|
| YYYY-MM-DD | Chose X over Y | Because... |

## User Preferences
- [Coding style preferences]
- [Tool/framework choices]
- [Naming conventions]

## Architecture Notes
- [Key patterns used]
- [Service relationships]
- [Data flow notes]

## Previous Sessions
<!-- Archive old Active Work here when completed -->
### [Date] - [Task Name] - COMPLETED
Summary of what was done...
```

## What to Store

### Always Store
- Active work state with clear resume instructions
- Decisions that would otherwise require re-asking the user
- File paths and line numbers being worked on
- Commands that worked (build, test, run)
- Error messages and their solutions

### Archive When Complete
- Move finished `Active Work` to `Previous Sessions`
- Keep only last 3-5 sessions to avoid bloat

## Guidelines

- **Be specific**: Include file paths, line numbers, exact commands
- **Be actionable**: Write so future-you can resume immediately
- **Be concise**: Bullet points over paragraphs
- **Update incrementally**: Small frequent updates beat large infrequent ones
- **Clear incomplete work**: Use `[ ]` checkboxes for pending items
- **Date everything**: Timestamps help identify stale information

## Tool Usage

```
# Read memory (do this FIRST every session)
read_file(".docs/memory.md")

# Create if missing
create_file(".docs/memory.md", content)

# Update specific section
replace_string_in_file(".docs/memory.md", oldSection, newSection)
```

## Recovery Pattern

If resuming mid-task:
1. Read `## Active Work` section
2. Verify current state matches (files exist, etc.)
3. Continue from first unchecked `[ ]` item
4. Update status to "In Progress"