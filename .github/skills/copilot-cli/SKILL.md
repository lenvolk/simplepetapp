---
name: copilot-cli
description: Run GitHub Copilot CLI for autonomous coding tasks. Use when spawning background agents, automating code changes, running non-interactive prompts, or orchestrating parallel development work. Triggers on 'copilot cli', 'background agent', 'spawn agent', 'yolo mode', 'auto-approve tools', or requests to run Copilot in a terminal/worktree.
---

# GitHub Copilot CLI (gh copilot)

GitHub Copilot CLI is a command-line AI coding assistant that can execute prompts, edit files, run commands, and commit changes autonomously. It runs as an extension to GitHub CLI (`gh`).

## Quick Reference

For a quick cheat-sheet response with ASCII art, respond with the [template](./TEMPLATE.md) and fill in any `{placeholders}` as needed.

## Installation

```powershell
# 1. Install GitHub CLI
winget install GitHub.cli

# 2. Authenticate
gh auth login

# 3. Install Copilot extension
gh extension install github/gh-copilot

# 4. Verify
gh copilot --version
```

## Core Usage Patterns

### Interactive Mode (default)
```powershell
gh copilot
```

### Non-Interactive (single prompt, exits after)
```powershell
gh copilot -p "Fix the bug in main.js"
```

### With Workspace Agent (can edit files)
```powershell
gh copilot --agent workspace
```

### YOLO Mode (auto-approve all tools)
```powershell
gh copilot --allow-all-tools
```

### Non-Interactive YOLO with Workspace (required combo for automation)
```powershell
gh copilot -p "Your task here" --agent workspace --allow-all-tools
```

## Key Options

| Option | Purpose |
|--------|---------|
| `-p, --prompt <text>` | Non-interactive mode; exits after completion |
| `--agent workspace` | Use workspace agent (can read/write files) |
| `--allow-all-tools` | Auto-approve all tool execution |
| `--model <model>` | Select model |

## Spawning Background Agents

For parallel task orchestration, spawn agents in PowerShell jobs:

```powershell
Start-Job -Name "wave-0-taskname" -ScriptBlock {
    Set-Location "C:\path\to\worktree"
    gh copilot -p "Your detailed task prompt" --agent workspace --allow-all-tools
}
```

Monitor jobs:
```powershell
Get-Job | Where-Object { $_.Name -like "wave-*" }
Receive-Job -Name "wave-0-taskname"
```

## Best Practices for Automation

1. Always use `-p` + `--agent workspace` + `--allow-all-tools` for non-interactive automation
2. Set working directory before running (`Set-Location`)
3. For parallel agents, use separate git worktrees to avoid conflicts
4. Name jobs with `wave-X-` prefix for monitor compatibility

## References

- [GitHub Copilot CLI Docs](https://docs.github.com/en/copilot)
