---
name: wave-validation-dotnet
description: Choose and run the narrowest .NET validation for a task/wave (build specific project first, solution later). Use after .NET code changes or when validating C#/Blazor applications.
---

# Wave Validation: .NET (Skill)

## Choose the narrowest check
- If changes touch `MyPetVenues/` only: run project build.
- If a new project is added or solution-wide changes occur: run solution build.

## Commands (repo root)
- Project build: `dotnet build MyPetVenues/MyPetVenues.csproj`
- Solution build: `dotnet build simkplepetapp.sln`

## Output expectations
Report:
- Which command ran
- Pass/fail
- If fail: first actionable error + file likely responsible
