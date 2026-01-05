---
name: mypetvenunes
description: Domain expertise for MyPetVenues, a Blazor WebAssembly pet-friendly venue discovery platform. Use this skill when refactoring, updating, debugging, or extending the application. Provides architecture patterns (SOLID services, DI), component conventions (Razor + scoped CSS), CSS theming system (light/dark mode with CSS variables), and data models (Venue, User, Booking, Review). Triggers on tasks involving MyPetVenues pages, components, services, models, or styling.
---

# MyPetVenues Development Skill

Domain knowledge for the MyPetVenues Blazor WebAssembly application.

## Quick Reference

| Aspect | Details |
|--------|---------|
| **Stack** | Blazor WASM, .NET 9, C# 13 |
| **Build** | `dotnet build MyPetVenues/MyPetVenues.csproj` |
| **Run** | `dotnet run --project MyPetVenues/MyPetVenues.csproj` |
| **Theme** | Pink gradient, light/dark mode |
| **Font** | Plus Jakarta Sans |

## Project Structure

```
MyPetVenues/
├── Program.cs          # DI registration
├── Components/         # Reusable: VenueCard, StarRating, PetBadge, etc.
├── Layout/             # MainLayout, Header, Footer
├── Models/             # Venue, User, Booking, Review + enums
├── Pages/              # Home, Venues, VenueDetail, Profile, BookVenue
├── Services/           # IVenueService, IUserService, IBookingService, IThemeService
└── wwwroot/css/app.css # Global styles + CSS variables
```

## Key Conventions

### Service Pattern
- Interface + Mock implementation
- Singletons for stateless, Scoped for user-specific
- Async methods returning `Task<T>`

### Component Pattern
- `[Parameter, EditorRequired]` for required props
- `EventCallback<T>` for output events
- Scoped CSS file per component using CSS variables

### Styling Pattern
- All colors via CSS variables (`--accent-primary`, `--card-bg`, etc.)
- Theme toggle via `.dark-mode`/`.light-mode` class on `.app-container`
- Card hover: `translateY(-8px)` + shadow increase

## References

Load these based on task:

- **Architecture work**: See [references/architecture.md](references/architecture.md) for services, DI, routes
- **Component work**: See [references/components.md](references/components.md) for component catalog
- **Styling work**: See [references/styling.md](references/styling.md) for CSS variables, theme system
- **Data layer work**: See [references/models.md](references/models.md) for model schemas

## Common Tasks

### Add a new component
1. Create `Components/NewComponent.razor`
2. Create `Components/NewComponent.razor.css`
3. Use CSS variables from app.css
4. Follow parameter conventions (see components.md)

### Add a new page
1. Create `Pages/NewPage.razor` with `@page "/route"`
2. Inject needed services
3. Create `Pages/NewPage.razor.css`
4. Add navigation link in Header.razor

### Add a new service
1. Define interface in `Services/INewService.cs`
2. Create mock implementation `Services/MockNewService.cs`
3. Register in `Program.cs` with appropriate lifetime

### Modify theme colors
1. Edit CSS variables in `wwwroot/css/app.css`
2. Update both `:root` (light) and `.dark-mode` sections
