---
name: copilot-cli
description: Run GitHub Copilot CLI for autonomous coding tasks. Use when spawning background agents, automating code changes, running non-interactive prompts, or orchestrating parallel development work. Triggers on 'copilot cli', 'background agent', 'spawn agent', 'yolo mode', 'auto-approve tools', or requests to run Copilot in a terminal/worktree.
---

# GitHub Copilot CLI (copilot)

GitHub Copilot CLI is a command-line AI coding assistant that can execute prompts, edit files, run commands, and commit changes autonomously. It's a standalone terminal-native tool.

## Quick Reference

For a quick cheat-sheet response with ASCII art, respond with the [template](./TEMPLATE.md) and fill in any `{placeholders}` as needed.

## Installation

```powershell
# Install Copilot CLI
winget install GitHub.Copilot

# Verify
copilot --version
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
| `--allow-all-tools` | Auto-approve all tool execution |
| `--model <model>` | Select model |

## Spawning Background Agents

For parallel task orchestration, spawn agents in PowerShell jobs:

```powershell
Start-Job -Name "wave-0-taskname" -ScriptBlock {
    Set-Location "C:\path\to\worktree"
    copilot -p "Your detailed task prompt" --allow-all-tools
}
```

Monitor jobs:
```powershell
Get-Job | Where-Object { $_.Name -like "wave-*" }
Receive-Job -Name "wave-0-taskname"
```

## Best Practices for Automation

1. Always use `-p` + `--allow-all-tools` for non-interactive automation
2. Set working directory before running (`Set-Location`)
3. For parallel agents, use separate git worktrees to avoid conflicts
4. Name jobs with `wave-X-` prefix for monitor compatibility

## References

- [GitHub Copilot CLI Docs](https://docs.github.com/en/copilot)
