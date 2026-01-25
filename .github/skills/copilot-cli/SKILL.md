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

## First Launch Flow

On first launch, Copilot CLI performs several setup steps:

### 1. Authentication Check
If not logged in via GitHub CLI (`gh`), you'll see:
```
● Logged in with gh as user: <username>
```
If not authenticated, use `/login` command and follow on-screen instructions.

### 2. Folder Trust Prompt
When asked **"Do you trust the files in this folder?"**:
- Select **1 (Yes)** to proceed for this session
- Select **2 (Yes, and remember)** for permanent trust
- The orchestrator should automatically select **YES** when spawning agents

### 3. Model Selection (First Run)
After folder trust, you may be prompted to select a model. Use `/model` in interactive mode to change later.

**Default model**: Claude Sonnet 4.5 (1x cost multiplier)

### Exiting Copilot CLI
To exit interactive mode, press **Ctrl+C twice**.

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
| `--model <model>` | Select model (CLI flag) |
| `/model` | Select model (interactive slash command) |
| `/login` | Authenticate with GitHub |
| `Ctrl+C` (twice) | Exit interactive mode |

## Model Selection

Choose a model based on task complexity and cost considerations:

| Model | Cost | Best For |
|-------|------|----------|
| Claude Sonnet 4.5 (default) | 1x | General tasks, balanced |
| Claude Haiku 4.5 | 0.33x | Quick edits, cost-sensitive |
| Claude Opus 4.5 | 3x | Complex refactoring |
| GPT-5.1-Codex-Max | 1x | Code generation |
| GPT-5.1-Codex-Mini | 0.33x | Fast code tasks |

**IMPORTANT**: When spawning agents, inform the user which model you selected and why:
```
Using Claude Sonnet 4.5 (default) - balanced performance for this task
```

## Spawning Background Agents

For parallel task orchestration, spawn agents in PowerShell jobs:

```powershell
Start-Job -Name "agent-taskname" -ScriptBlock {
    Set-Location "C:\path\to\worktree"
    copilot -p "Your detailed task prompt" --allow-all-tools
}
```

Monitor jobs:
```powershell
Get-Job | Where-Object { $_.Name -like "agent-*" }
Receive-Job -Name "agent-taskname"
```

## Best Practices for Automation

1. Always use `-p` + `--allow-all-tools` for non-interactive automation
2. Set working directory before running (`Set-Location`)
3. For parallel agents, use separate git worktrees to avoid conflicts
4. Name jobs with `agent-` prefix for monitor compatibility (e.g., `agent-models`, `agent-services`)
5. **Folder trust**: The CLI will prompt for folder trust on first run in a directory. In automation, ensure the folder is pre-trusted or handle the prompt
6. **Authentication**: Verify `gh auth status` before spawning agents to ensure login is valid
7. **Model selection**: Use `--model <model>` flag to explicitly set model; inform user of selection

## References

- [GitHub Copilot CLI Docs](https://docs.github.com/en/copilot)
