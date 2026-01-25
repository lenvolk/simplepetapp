# Common Automation Patterns

## Single Task Automation

Fix a bug non-interactively:
```powershell
gh copilot -p "Fix the null reference exception in UserService.cs" --agent workspace --allow-all-tools -s
```

## Parallel Agent Orchestration

Spawn multiple agents in separate worktrees:
```powershell
# Create worktrees
git worktree add ../worktree-api -b task-api
git worktree add ../worktree-ui -b task-ui

# Spawn parallel agents
$apiJob = Start-Job -Name "agent-api" -ScriptBlock {
    Set-Location "C:\repo\worktree-api"
    gh copilot -p "Implement the REST API endpoints for user management. Run tests before committing." --agent workspace --allow-all-tools
}

$uiJob = Start-Job -Name "agent-ui" -ScriptBlock {
    Set-Location "C:\repo\worktree-ui"
    gh copilot -p "Create React components for user dashboard. Run linter before committing." --agent workspace --allow-all-tools
}

# Wait and collect results
Wait-Job $apiJob, $uiJob
Receive-Job $apiJob
Receive-Job $uiJob
```

## Scripted Pipeline

```powershell
# Run gh copilot with specific permissions
$result = gh copilot -p "Refactor the authentication module" `
    --agent workspace `
    --allow-all-tools `
    --model claude-sonnet-4 `
    -s

if ($LASTEXITCODE -eq 0) {
    Write-Host "Task completed successfully"
} else {
    Write-Host "Task failed"
}
```

## Resume with Auto-Approval

Continue previous session without prompts:
```powershell
gh copilot --allow-all-tools --continue
```

## Restricted Tool Access

Allow only safe operations:
```powershell
gh copilot -p "Review and suggest improvements for auth.js" `
    --allow-tool 'read' `
    --deny-tool 'write' `
    --deny-tool 'shell'
```

## MCP Server Integration

Add custom MCP servers for the session:
```powershell
gh copilot --additional-mcp-config "@mcp-servers.json"
```

## Batch Processing Template

```powershell
$tasks = @(
    @{ Name = "api"; Prompt = "Implement API endpoints"; Path = "../worktree-api" },
    @{ Name = "ui"; Prompt = "Create UI components"; Path = "../worktree-ui" },
    @{ Name = "tests"; Prompt = "Add integration tests"; Path = "../worktree-tests" }
)

$jobs = @()
foreach ($task in $tasks) {
    $jobs += Start-Job -Name "agent-$($task.Name)" -ScriptBlock {
        param($path, $prompt)
        Set-Location $path
        gh copilot -p $prompt --agent workspace --allow-all-tools
    } -ArgumentList $task.Path, $task.Prompt
}

Wait-Job $jobs
$jobs | ForEach-Object { Receive-Job $_ }
```
