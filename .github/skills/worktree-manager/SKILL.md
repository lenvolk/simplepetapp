---
name: worktree-manager
description: Create, manage, and cleanup git worktrees with Copilot CLI agents for parallel development on Windows. USE THIS SKILL when user says "create worktree", "spin up worktrees", "new worktree for X", "worktree status", "cleanup worktrees", or wants parallel development branches. Also triggers on "launch agent in worktree X", "sync worktrees", or creating PRs from worktree branches. Handles worktree creation, dotnet builds, validation, agent launching, and global registry management.
---

# Git Worktree Manager (Windows/PowerShell)

Manage parallel development using git worktrees with GitHub Copilot CLI agents. Each worktree is an isolated copy of the repo on a different branch, stored centrally.

**IMPORTANT**: All operations can be performed manually using PowerShell and git. Scripts are helpers, not requirements.

## File Locations

| File | Purpose |
|------|---------|
| `$env:USERPROFILE\.copilot\worktree-registry.json` | **Global registry** - tracks all worktrees |
| `.github/skills/worktree-manager/scripts/` | **PowerShell helpers** |
| `$env:TEMP\worktrees\` | **Worktree storage** - all worktrees live here |

---

## Core Concepts

### Centralized Worktree Storage

All worktrees live in `$env:TEMP\worktrees\<project>\<branch-slug>\`:

```
C:\Users\...\AppData\Local\Temp\worktrees\
└── simplepetapp\
    ├── feature-dark-mode\      # branch: feature/dark-mode
    ├── feature-booking-api\    # branch: feature/booking-api
    └── fix-venue-search\       # branch: fix/venue-search
```

### Branch Slug Convention

Branch names are slugified: `feature/auth` → `feature-auth`

```powershell
$branchSlug = "feature/auth" -replace '/', '-'
```

### Port Allocation

- **Pool**: 5100-5199 (100 ports for Blazor apps)
- **Per worktree**: 1 port (Blazor WASM is client-only)
- **Check availability**: `Get-NetTCPConnection -LocalPort $port`

---

## Global Registry Schema

Location: `$env:USERPROFILE\.copilot\worktree-registry.json`

```json
{
  "worktrees": [
    {
      "id": "guid",
      "project": "simplepetapp",
      "repoPath": "C:\\Temp\\GIT\\simplepetapp",
      "branch": "feature/dark-mode",
      "branchSlug": "feature-dark-mode",
      "worktreePath": "C:\\Users\\...\\Temp\\worktrees\\simplepetapp\\feature-dark-mode",
      "ports": [5100],
      "createdAt": "2026-01-25T18:00:00Z",
      "validatedAt": null,
      "agentLaunchedAt": null,
      "task": "Implement dark mode toggle",
      "prNumber": null,
      "status": "active"
    }
  ],
  "portPool": {
    "start": 5100,
    "end": 5199,
    "allocated": [5100]
  }
}
```

---

## Workflows

### 1. Create Worktree with Agent

**User says:** "Create worktree for feature/booking-api"

**Steps:**

```powershell
# 1. Setup variables
$project = Split-Path (git remote get-url origin) -Leaf -ErrorAction SilentlyContinue
if (-not $project) { $project = Split-Path (Get-Location) -Leaf }
$project = $project -replace '\.git$', ''
$repoRoot = git rev-parse --show-toplevel
$branch = "feature/booking-api"
$branchSlug = $branch -replace '/', '-'
$worktreePath = "$env:TEMP\worktrees\$project\$branchSlug"

# 2. Allocate port
$port = & ".\.github\skills\worktree-manager\scripts\Get-AllocatedPorts.ps1" -Count 1

# 3. Create worktree
New-Item -ItemType Directory -Path "$env:TEMP\worktrees\$project" -Force
git worktree add $worktreePath -b $branch
# If branch exists: git worktree add $worktreePath $branch

# 4. Copy project resources
Copy-Item -Path ".github" -Destination $worktreePath -Recurse -Force
Copy-Item -Path ".docs" -Destination $worktreePath -Recurse -Force -ErrorAction SilentlyContinue

# 5. Build in worktree
Push-Location $worktreePath
dotnet build MyPetVenues/MyPetVenues.csproj
Pop-Location

# 6. Register
& ".\.github\skills\worktree-manager\scripts\Register-Worktree.ps1" `
    -Project $project -Branch $branch -WorktreePath $worktreePath `
    -RepoPath $repoRoot -Ports $port -Task "Implement booking API"

# 7. Launch agent
& ".\.github\skills\worktree-manager\scripts\Start-WorktreeAgent.ps1" `
    -WorktreePath $worktreePath -Task "Implement booking API endpoint"
```

### 2. Create Multiple Worktrees (Parallel)

**User says:** "Spin up worktrees for feature/a, feature/b, feature/c"

**Approach:**
1. Allocate all ports upfront: `Get-AllocatedPorts.ps1 -Count 3`
2. Create worktrees sequentially (git limitation)
3. Launch agents as background jobs or separate terminals:

```powershell
# Launch as PowerShell jobs for parallel execution
$worktrees | ForEach-Object {
    Start-Job -Name "agent-$($_.branchSlug)" -ScriptBlock {
        param($path, $task)
        Set-Location $path
        copilot -p $task --allow-all-tools
    } -ArgumentList $_.worktreePath, $_.task
}
```

### 3. Check Status

```powershell
# All worktrees
& ".\.github\skills\worktree-manager\scripts\Get-WorktreeStatus.ps1"

# Specific project
& ".\.github\skills\worktree-manager\scripts\Get-WorktreeStatus.ps1" -Project "simplepetapp"

# Manual query
$registry = Get-Content "$env:USERPROFILE\.copilot\worktree-registry.json" | ConvertFrom-Json
$registry.worktrees | Format-Table project, branch, ports, status, task
```

### 4. Cleanup Worktree

```powershell
# Cleanup keeping branch
& ".\.github\skills\worktree-manager\scripts\Remove-Worktree.ps1" `
    -Project "simplepetapp" -Branch "feature/booking-api"

# Cleanup AND delete branch
& ".\.github\skills\worktree-manager\scripts\Remove-Worktree.ps1" `
    -Project "simplepetapp" -Branch "feature/booking-api" -DeleteBranch
```

**Manual cleanup:**
```powershell
# 1. Kill processes on port
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5100).OwningProcess -Force

# 2. Remove worktree
git worktree remove "$env:TEMP\worktrees\simplepetapp\feature-booking-api" --force
git worktree prune

# 3. Update registry (remove entry, release port)
```

### 5. Create PR from Worktree

After creating a PR, update registry with PR number:

```powershell
Push-Location $worktreePath
$branch = git branch --show-current
$prNum = (gh pr view --json number | ConvertFrom-Json).number

$registry = Get-Content "$env:USERPROFILE\.copilot\worktree-registry.json" | ConvertFrom-Json
$entry = $registry.worktrees | Where-Object { $_.branch -eq $branch }
if ($entry) {
    $entry.prNumber = $prNum
    $registry | ConvertTo-Json -Depth 10 | Set-Content "$env:USERPROFILE\.copilot\worktree-registry.json"
}
Pop-Location
```

---

## Script Reference

| Script | Purpose |
|--------|---------|
| `Initialize-Registry.ps1` | Create empty registry file |
| `Get-AllocatedPorts.ps1 -Count N` | Allocate N ports from pool |
| `Register-Worktree.ps1` | Add worktree to registry |
| `Get-WorktreeStatus.ps1` | Show all worktrees and their status |
| `Remove-Worktree.ps1` | Clean up worktree and release resources |
| `Start-WorktreeAgent.ps1` | Launch Copilot CLI agent in worktree |

---

## Integration with copilot-cli Skill

This skill complements the `copilot-cli` skill:

- **copilot-cli**: Runs agents in single directory, good for quick tasks
- **worktree-manager**: Isolates work in separate git worktrees for parallel feature development

**Combined pattern:**
```powershell
# Create worktree, then use copilot-cli patterns to launch agent
& ".\.github\skills\worktree-manager\scripts\Start-WorktreeAgent.ps1" `
    -WorktreePath $worktreePath -Task "Implement feature X" -Terminal "pwsh"
```

---

## Common Issues

### "Worktree already exists"
```powershell
git worktree list
git worktree remove $path --force
git worktree prune
```

### "Branch already exists"
```powershell
# Use existing branch (omit -b flag)
git worktree add $worktreePath $branch
```

### "Port already in use"
```powershell
Get-NetTCPConnection -LocalPort 5100
# Kill process or pick different port
```

### Build fails in worktree
```powershell
# Restore NuGet packages
dotnet restore $worktreePath\MyPetVenues\MyPetVenues.csproj
dotnet build $worktreePath\MyPetVenues\MyPetVenues.csproj
```

---

## Example Session

**User:** "Create worktree for feature/review-system"

**Response:**
```
Creating worktree for feature/review-system...

1. ✓ Allocated port: 5101
2. ✓ Created worktree at: C:\...\Temp\worktrees\simplepetapp\feature-review-system
3. ✓ Copied .github and .docs directories
4. ✓ Build succeeded
5. ✓ Registered in worktree registry
6. ✓ Launched Copilot agent

Agent running in new terminal window.
Task: Implement review system with star ratings and comments
```
