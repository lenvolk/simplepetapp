# ACA Orchestration Quick Reference

**For agents executing `specs/001-aca-modernization/tasks.md`**

---

## 🚀 Quick Start

User says: **"go ahead"**

You do:
1. Read `specs/001-aca-modernization/lessons-learned.md` first
2. Run pre-flight checks
3. Execute tasks with pre-emptive fixes applied
4. Use parallel waves for speedup
5. Validate at checkpoints (not every task)

---

## ✅ Pre-flight Checklist

```powershell
# Verify tools
git rev-parse --git-dir          # Git repo?
dotnet --version                  # .NET 9.0?
az --version                      # Azure CLI?

# Create run log (if missing)
New-Item -ItemType File -Path .docs/orchestrator-runlog.md -Force
```

---

## ⚡ High-Value Parallel Waves

Execute these in parallel (saves ~42 minutes total):

| Wave | After Task | Tasks in Wave | Files | Time Saved |
|------|-----------|---------------|-------|------------|
| 1.1  | T002 | T003, T004, T005 | parameters, scripts, Docker | 9 min |
| 2.1  | T012 | T013, T019, T020, T021, T023 | options, handlers, factory | 12 min |
| 2.2  | T014 | T015, T016 | UI auth, routing | 4 min |
| 3.1  | T024 | T025, T026 | networking, monitoring | 4 min |
| 4.1  | T036 | T037, T040, T043, T046 | all contracts | 9 min |
| 5.1  | T054 | T055, T058 | logging, health checks | 4 min |

**Total saved: 42 minutes** (70 tasks: 4 hours with optimization vs 7 hours sequential)

---

## 🛡️ Pre-emptive Fixes (Auto-Apply)

### Fix 1: After T012 (Shared project created)
Add to `MyPetVenues/MyPetVenues.csproj`:
```xml
<ItemGroup>
  <ProjectReference Include="..\MyPetVenues.Shared\MyPetVenues.Shared.csproj" />
</ItemGroup>
```

### Fix 2: In T050 (API services)
Remove from `MyPetVenues/Program.cs`:
```csharp
builder.Services.AddScoped<IVenueService, VenueService>();
builder.Services.AddScoped<IBookingService, BookingService>();
builder.Services.AddScoped<IUserService, UserService>();
```

### Fix 3: In T035 (Cosmos module)
Place cosmos **before** containerapps in `infra/main.bicep`:
```bicep
module cosmos './modules/cosmos.bicep' = { ... }
module containerapps './modules/containerapps.bicep' = { 
  dependsOn: [cosmos]
}
```

### Fix 4: In T034 (Cosmos outputs)
Add to `infra/modules/cosmos.bicep`:
```bicep
output accountId string = cosmosAccount.id
```

---

## 📊 Validation Checkpoints

**Don't build after every task!** Build at these checkpoints:

| Checkpoint | After | Command | Why |
|------------|-------|---------|-----|
| 1 | Wave 2.1 | `dotnet build simkplepetapp.sln` | Foundation services |
| 2 | T017 | `dotnet build simkplepetapp.sln` | Project references |
| 3 | Wave 4.1 | `dotnet build simkplepetapp.sln` | All contracts |
| 4 | T051 | `dotnet build simkplepetapp.sln` | UI services |
| 5 | Phase 5 | `dotnet build simkplepetapp.sln` | Observability |
| 6 | Phase 6 | `dotnet build simkplepetapp.sln` | RBAC |
| 7 | Phase 7 | `dotnet build simkplepetapp.sln` | Final |

**Result**: 7 builds instead of 70 (90% reduction)

---

## 🔄 Parallel Wave Execution Pattern

```powershell
# 1. Create all worktrees for the wave
git worktree add ..\worktree-T003 -b task-T003
git worktree add ..\worktree-T004 -b task-T004
git worktree add ..\worktree-T005 -b task-T005

# 2. Execute tasks in parallel (separate terminals or async)
# Each agent works in its worktree independently

# 3. Wait for all completions

# 4. Validate ONCE for the entire wave
dotnet build simkplepetapp.sln

# 5. Merge sequentially (avoid conflicts)
git merge task-T003 --no-ff -m "Merge T003"
git merge task-T004 --no-ff -m "Merge T004"
git merge task-T005 --no-ff -m "Merge T005"

# 6. Cleanup all worktrees
Remove-Item ..\worktree-T003 -Recurse -Force
Remove-Item ..\worktree-T004 -Recurse -Force
Remove-Item ..\worktree-T005 -Recurse -Force
git worktree prune
git branch -d task-T003 task-T004 task-T005
```

---

## 🚨 Error Handling

If a task fails:
1. **First attempt**: Fix in worktree, retry
2. **Second attempt**: Check `lessons-learned.md`, apply fix
3. **Third attempt**: Stop and request user input

Common issues:
- Missing reference → Apply Fix 1
- Service registration error → Apply Fix 2
- Bicep scope error → Apply Fix 3
- RBAC failure → Apply Fix 4

---

## 📈 Success Metrics

After completion, verify:
- [x] 70 commits (one per task)
- [x] Build succeeds: `dotnet build simkplepetapp.sln`
- [x] 3 projects compile: Shared, WASM, API
- [x] Only 1 warning (RedirectToLogin component - non-blocking)
- [x] All files committed: `git status` clean

---

## 📚 Reference Files

- **Tasks**: `specs/001-aca-modernization/tasks.md` (70 tasks)
- **Lessons**: `specs/001-aca-modernization/lessons-learned.md` (issues/fixes)
- **Orchestrator**: `.github/prompts/swarm-mode.prompt.md` (rules)
- **Skill**: `.github/skills/aca-orchestration/SKILL.md` (patterns)
- **Run log**: `.docs/orchestrator-runlog.md` (session notes)

---

## 🎯 Goal

**Zero user intervention from "go ahead" to completion.**

With these optimizations, the next execution should:
- Take ~4 hours (down from 7)
- Run 7 builds (down from 70)
- Execute 6 parallel waves automatically
- Apply 4 pre-emptive fixes automatically
- Complete all 70 tasks without questions

**Ready to deploy to Azure!**
