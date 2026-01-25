````markdown
# Copilot CLI Quick Reference

```
  ____                 _   _         _      ____   _       ___ 
 / ___|  ___   _ __   (_) | |  ___  | |_   / ___| | |     |_ _|
| |     / _ \ | '_ \  | | | | / _ \ | __| | |     | |      | | 
| |___ | (_) || |_) | | | | || (_) || |_  | |___  | |___   | | 
 \____| \___/ | .__/  |_| |_| \___/  \__|  \____| |_____| |___|
              |_|                                              
```

## Installation

```powershell
# Check if installed
copilot --version

# Install if needed
winget install GitHub.Copilot
```

## First Run Flow

1. **Login check** - If not authenticated, use `/login`
2. **Folder trust** - Select **1 (Yes)** or **2 (Yes, remember)**
3. **Model selection** - Default: Claude Sonnet 4.5 (1x)

**Exit**: Press `Ctrl+C` twice

## Essential Commands

| Mode | Command |
|------|---------|
| Interactive | `copilot` |
| Single prompt | `copilot -p "your task"` |
| YOLO mode | `copilot --allow-all-tools` |
| Non-interactive YOLO | `copilot -p "task" --allow-all-tools` |
| Resume session | `copilot --continue` |
| Silent (scripting) | `copilot -p "task" --allow-all-tools -s` |

## Key Flags

```
-p, --prompt <text>       Non-interactive mode (exits after)
-i, --interactive <text>  Interactive + auto-execute prompt
--allow-all-tools         Auto-approve all tools (YOLO)
--allow-all-paths         Allow any file path access
--allow-tool [tools...]   Allow specific tools
--deny-tool [tools...]    Block specific tools
--model <model>           Select AI model
--continue                Resume most recent session
--resume [id]             Resume specific session
-s, --silent              Output only response (for scripts)
--add-dir <dir>           Add allowed directory
```

## Spawn Background Agent

```powershell
Start-Job -Name "agent-{task_name}" -ScriptBlock {
    Set-Location "{worktree_path}"
    copilot -p "{task_prompt}" --allow-all-tools
}
```

## Monitor Jobs

```powershell
Get-Job | Format-Table Name, State
Receive-Job -Name "agent-{task_name}"
```

## Tool Permission Examples

```powershell
# Allow git, block push
copilot --allow-tool 'shell(git:*)' --deny-tool 'shell(git push)'

# Allow file editing only
copilot --allow-tool 'write'

# Read-only mode
copilot --allow-tool 'read' --deny-tool 'write' --deny-tool 'shell'
```

## Available Models

- `claude-opus-4.5` / `claude-sonnet-4.5` / `claude-sonnet-4` / `claude-haiku-4.5`
- `gpt-5.2` / `gpt-5.1-codex-max` / `gpt-5.1-codex` / `gpt-5`
- `gemini-3-pro-preview`

---
*Run `copilot --help` for full documentation*
````
