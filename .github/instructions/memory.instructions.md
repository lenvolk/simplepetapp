---
applyTo: **
---

# Memory Management

You have a memory system located at `.docs/memory.md`.

**IMPORTANT: ALWAYS read your memory at the start of complex tasks to understand context.**

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

## Before Long-Running Tasks (Testing, Migrations, etc.)

**IMPORTANT:** Before starting tasks that may exhaust the context window:

1. **Write a checkpoint** to memory.md with:
   - Task being performed
   - Current progress/status
   - What has been completed
   - What remains to be done
   - Any relevant URLs, file paths, or state

2. **Example checkpoint format:**
   ```markdown
   ## Current Task: [Task Name]
   **Started:** [Date/Time]
   **Status:** In Progress
   
   ### Completed
   - [x] Step 1
   - [x] Step 2
   
   ### Remaining
   - [ ] Step 3
   - [ ] Step 4
   
   ### Notes
   - App running at: http://localhost:5050
   - Issues found: [list]
   ```

3. **After task completion:** Update memory with results and clear the checkpoint
