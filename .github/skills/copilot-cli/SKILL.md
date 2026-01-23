---
name: copilot-cli
description: Run GitHub Copilot CLI for autonomous coding tasks. Use when spawning background agents, automating code changes, running non-interactive prompts, or orchestrating parallel development work. Triggers on 'copilot cli', 'background agent', 'spawn agent', 'yolo mode', 'auto-approve tools', or requests to run Copilot in a terminal/worktree.
---

# Copilot CLI

GitHub Copilot CLI is a command-line AI coding assistant that can execute prompts, edit files, run commands, and commit changes autonomously.

## Quick Reference

For a quick cheat-sheet response with ASCII art, respond with the [template](./TEMPLATE.md) and fill in any `{placeholders}` as needed.

## Installation

Verify installation:
```powershell
copilot -v
```

If not installed:
```powershell
winget install GitHub.Copilot.Prerelease
```

## Core Usage Patterns

### Interactive Mode (default)
```powershell
copilot
```

### Non-Interactive (single prompt, exits after)
```powershell
copilot -p "Fix the bug in main.js"
```

### YOLO Mode (auto-approve all tools)
```powershell
copilot --allow-all-tools
```

### Non-Interactive YOLO (required combo for automation)
```powershell
copilot -p "Your task here" --allow-all-tools
```

## Key Options

| Option | Purpose |
|--------|---------|
| `-p, --prompt <text>` | Non-interactive mode; exits after completion |
| `-i, --interactive <prompt>` | Start interactive + auto-execute prompt |
| `--allow-all-tools` | Auto-approve all tool execution (env: `COPILOT_ALLOW_ALL`) |
| `--allow-all-paths` | Disable path verification |
| `--allow-tool [tools...]` | Allow specific tools without prompting |
| `--deny-tool [tools...]` | Block specific tools |
| `--model <model>` | Select model (see references/models.md) |
| `--continue` | Resume most recent session |
| `--resume [sessionId]` | Resume specific session |
| `--add-dir <directory>` | Add directory to allowed paths |
| `-s, --silent` | Output only agent response (for scripting) |

## Spawning Background Agents

For parallel task orchestration, spawn Copilot CLI in PowerShell jobs:

```powershell
Start-Job -Name "agent-taskname" -ScriptBlock {
    Set-Location "C:\path\to\worktree"
    copilot -p "Your detailed task prompt" --allow-all-tools
}
```

Monitor jobs:
```powershell
Get-Job | Format-Table Name, State, HasMoreData
Receive-Job -Name "agent-taskname"
```

## Tool Permissions

Fine-grained control over what Copilot can do:

```powershell
# Allow all git commands except push
copilot --allow-tool 'shell(git:*)' --deny-tool 'shell(git push)'

# Allow file editing
copilot --allow-tool 'write'

# Allow MCP server tools except one
copilot --deny-tool 'MyMCP(denied_tool)' --allow-tool 'MyMCP'
```

## Environment Variables

- `COPILOT_ALLOW_ALL` - Equivalent to `--allow-all-tools`

## Session Management

Resume previous work:
```powershell
copilot --continue              # Most recent session
copilot --resume                # Session picker
copilot --resume <sessionId>    # Specific session
copilot --allow-all-tools --resume  # Resume with auto-approval
```

## Best Practices for Automation

1. Always use `-p` + `--allow-all-tools` for non-interactive automation
2. Use `--silent` when capturing output for scripts
3. Set working directory before running (`Set-Location`)
4. For parallel agents, use separate git worktrees to avoid conflicts
5. Consider `--model` to select appropriate model for task complexity

## References

- See [references/models.md](references/models.md) for available models
- See [references/examples.md](references/examples.md) for common automation patterns
