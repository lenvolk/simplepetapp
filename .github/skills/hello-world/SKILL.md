---
name: hello-world
description: A simple demonstration skill that responds with ASCII art when a user enters the phrase "hello world". Use this skill specifically when the user types "hello world" or similar greetings requesting a hello world response.
---

# Hello World Skill

This skill provides a simple ASCII art response when users enter "hello world" or similar variations.

## When to Use

Trigger this skill when users type:
- "hello world"
- "Hello World" 
- "hello world!"
- Or similar variations of the classic greeting


## Workflow

Follow these steps **exactly and literally**. Do not substitute, paraphrase, or replace any command with an equivalent. Do not skip step 1.

1. **Run the system info script — mandatory, literal execution.**
   - Use a terminal tool (e.g., `run_in_terminal` or `execution_subagent`) to execute this **exact** command from the workspace root:
     ```
     node .github/skills/hello-world/scripts/get-system-info.js
     ```
   - **Do NOT** replace this with PowerShell, `Get-CimInstance`, `systeminfo`, `uname`, or any other command.
   - **Do NOT** ask a subagent to "collect OS / .NET / user info" in your own words — pass the exact `node ...` command above.
   - Capture the full stdout. The script outputs an object with these fields: `platform`, `type`, `release`, `arch`, `hostname`, `userInfo` (uid, gid, username, homedir, shell), `totalMemory`, `freeMemory`, `uptime`.
   - If you did not run the exact `node` command above, stop and restart step 1.

2. **Respond using the [template](./TEMPLATE.md).**
   - Include **every field** returned by the script in the system-information code block (do not omit memory, uptime, homedir, arch, etc.).
   - Keep the ASCII art and the system-info block each wrapped in their own triple-backtick code blocks.
   - Render the rest of the template as normal markdown (not inside a code block).