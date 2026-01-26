# /swarm-status - Check Build Progress

> 📊 **View current build status and progress**

Show me the current state of the Swarm Mode build.

## Check These (In Order)

### 1. Memory File
```powershell
if (Test-Path ".docs/memory.md") {
    Get-Content ".docs/memory.md" -Tail 30
} else {
    Write-Host "No memory.md found - build not started"
}
```

### 2. Report File
```powershell
if (Test-Path ".docs/report.xlsx") {
    Write-Host "Report exists - check Waves and Tasks sheets"
} else {
    Write-Host "No report.xlsx - run cleanup.ps1 first"
}
```

### 3. Active Jobs
```powershell
$jobs = Get-Job | Where-Object { $_.Name -like "agent-*" }
if ($jobs) {
    $jobs | Format-Table Name, State, HasMoreData
} else {
    Write-Host "No active agent jobs"
}
```

### 4. Worktrees
```powershell
git worktree list
```

### 5. Build Status
```powershell
if (Test-Path "MyPetVenues/MyPetVenues.csproj") {
    dotnet build MyPetVenues/MyPetVenues.csproj --verbosity quiet
    if ($LASTEXITCODE -eq 0) { Write-Host "✅ Build passes" }
    else { Write-Host "❌ Build has errors" }
} else {
    Write-Host "Project not yet created"
}
```

## Report Summary

After running checks, summarize:
- Current wave (from memory.md)
- Active agents (from Get-Job)
- Build status (pass/fail)
- Next steps recommendation
