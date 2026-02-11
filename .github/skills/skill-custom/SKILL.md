---
name: skill-custom
description: Developer signature and workflow conventions for the MyPetVenues codebase. Use when implementing features, fixing bugs, refactoring, or making any code changes to MyPetVenues. Provides the developer's proven patterns for commit messages, iteration workflow, phase-based planning, documentation practices, and quality gates. Activate for any task involving code generation, architecture decisions, or project planning within this repository.
---

# MyPetVenues — Developer-Aligned Development Skill

Apply these conventions whenever building, improving, or extending MyPetVenues.

## Build & Verify

```bash
dotnet build MyPetVenues/MyPetVenues.csproj
dotnet run --project MyPetVenues/MyPetVenues.csproj   # http://localhost:5050
```

Always run `dotnet build` after changes. Verify no regressions before committing.

## Workflow: Implementing Changes

Follow this sequence for any change:

1. **Understand** — Read relevant files; verify folder/file existence before assuming
2. **Plan** — Break work into numbered phases/tasks (T001, T002…) for non-trivial work
3. **Implement** — Make incremental changes; commit after each logical unit
4. **Verify** — Build succeeds; test in browser if UI change
5. **Document** — Update `copilot-instructions.md` if architecture changes; update PRD if scope changes
6. **Commit** — Use conventional commit format (see below)

## Commit Conventions

Use conventional commit prefixes:

```
feat(scope): add venue search autocomplete
fix(booking): correct date validation on weekend slots
docs: update copilot-instructions with new service
chore: remove deprecated helper scripts
refactor(services): extract shared filtering logic
```

For major milestones, add bullet-pointed body:
```
feat(venues): add real-time availability checking

- Add IAvailabilityService interface and mock implementation
- Register as Singleton in Program.cs
- Wire up to VenueDetail page availability panel
- Add AvailabilityBadge component with scoped CSS
```

## Architecture Conventions

### Adding a New Service

1. Define interface `IXxxService` in `Services/XxxService.cs`
2. Implement `MockXxxService` in the same file
3. Register in `Program.cs`:
   - Use `Singleton` for app-wide state (venues, bookings, theme)
   - Use `Scoped` for session-specific state (user)
4. Inject via `@inject IXxxService XxxService` in Razor components
5. Follow the event pattern from `ThemeService` for state change notifications:
   ```csharp
   public event Action? OnStateChanged;
   private void NotifyStateChanged() => OnStateChanged?.Invoke();
   ```

### Adding a New Component

1. Create `ComponentName.razor` + `ComponentName.razor.css` in `Components/`
2. Use CSS variables from `wwwroot/css/app.css` for theming
3. Support light/dark mode via existing CSS variable system
4. Use `@media (max-width: 768px)` for mobile breakpoints
5. Import is automatic via `_Imports.razor`

### Adding a New Page

1. Create `PageName.razor` + `PageName.razor.css` in `Pages/`
2. Add `@page "/route"` directive
3. Add navigation link in `Layout/Header.razor`
4. Inject required services with `@inject`

### Adding a New Model

1. Create class in `Models/` with public properties
2. Add enums in the same file alongside the model
3. Update mock service constructors to generate sample data

## Quality Gates

Before considering work complete:

- [ ] `dotnet build MyPetVenues/MyPetVenues.csproj` passes
- [ ] UI renders correctly (if applicable)
- [ ] Light and dark modes both work (if UI change)
- [ ] Mobile responsive layout preserved (if UI change)
- [ ] `copilot-instructions.md` updated (if architecture change)
- [ ] Scoped CSS file created for every new `.razor` component

## Developer Working Style

Understanding how the developer works helps align agent behavior. See
[references/developer-profile.md](references/developer-profile.md) for the full
analysis. Key points:

- **Iterative refinement** — Initial implementation → 3-10 follow-up commits is normal. Don't over-engineer the first pass.
- **Documentation-first** — Docs are written alongside (or before) code, not after.
- **Checkpoint commits** — Terse commits ("ok", "first draft") are intentional save points before major changes.
- **Verify before assuming** — Anti-hallucination rule: always check file/folder existence before referencing.
- **Phase-based planning** — Large work is broken into numbered phases (Phase 1…N) with task IDs (T001…).
- **Demo-ready code** — The repo doubles as presentation material; keep code clean and well-commented.

## Skill & Agent Framework

When creating new skills or agent definitions, follow the established pattern:
```
.github/skills/skill-name/
├── SKILL.md              # YAML frontmatter + instructions
├── TEMPLATE.md           # Response template (optional)
└── scripts/              # Helper scripts (optional)
```

See [references/architecture.md](references/architecture.md) for the full
project architecture, tech stack, and infrastructure patterns.
