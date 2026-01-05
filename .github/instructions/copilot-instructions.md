# MyPetVenues - AI Agent Instructions

A Blazor WebAssembly pet-friendly venue discovery platform ("Yelp for pets").

## Quick Start

```bash
# Build
dotnet build MyPetVenues/MyPetVenues.csproj

# Run (serves at http://localhost:5039)
dotnet run --project MyPetVenues/MyPetVenues.csproj

# Or use VS Code tasks: "build (MyPetVenues)" / "run (MyPetVenues)"
```

## Architecture

**Stack:** Blazor WASM, .NET 9, C# 13

```
MyPetVenues/
├── Program.cs          # DI registration (services registered here)
├── Components/         # Reusable UI: VenueCard, StarRating, PetBadge, etc.
├── Layout/             # MainLayout (theme wrapper), Header, Footer
├── Models/             # Venue, User, Booking, Review + enums (VenueType, PetType)
├── Pages/              # Routable: Home(/), Venues(/venues), VenueDetail, Profile, BookVenue
├── Services/           # Interface + Mock implementations (SOLID pattern)
└── wwwroot/css/app.css # Global styles + CSS variables for theming
```

## Critical Patterns

### Services (SOLID)
All services use interface + implementation separation. Register in `Program.cs`:
- `Singleton` for stateless services (VenueService, BookingService, ThemeService)
- `Scoped` for user-specific state (UserService)

```csharp
// Example service interface pattern
public interface IVenueService {
    Task<List<Venue>> GetAllVenuesAsync();
    Task<Venue?> GetVenueByIdAsync(int id);
}
```

### Components
Every component has a paired `.razor.css` scoped stylesheet:
```
Components/VenueCard.razor      # Component logic
Components/VenueCard.razor.css  # Scoped styles using CSS variables
```

Parameter conventions:
```csharp
[Parameter, EditorRequired] public Venue Venue { get; set; } = default!;  // Required
[Parameter] public EventCallback OnClick { get; set; }                      // Events
```

### Theming (CSS Variables)
All colors defined in `wwwroot/css/app.css` as variables. Theme toggle via class on `.app-container`:
- Light: `:root` / `.light-mode` (default)
- Dark: `.dark-mode`

Key variables: `--accent-primary`, `--card-bg`, `--text-primary`, `--border-color`, `--shadow-color`

### Navigation
```csharp
@inject NavigationManager Navigation
Navigation.NavigateTo("/venues");
Navigation.NavigateTo($"/venues/{id}");
```

## Project-Specific Conventions

1. **Mock data only** - No real backend. All services return mock data from in-memory lists
2. **Images** - Static assets in `wwwroot/images/venues/` and `wwwroot/images/pets/`
3. **Card hover effect** - Always use `transform: translateY(-8px)` + shadow increase
4. **Border radius** - Cards: 20px, Buttons: 12px, Tags: 8px
5. **Font** - Plus Jakarta Sans (imported in app.css)

## API Integration Strategy

Service interfaces are designed for easy transition from mock to real APIs:
```csharp
// Current: MockVenueService implements IVenueService
// Future: ApiVenueService implements IVenueService
// Just swap registration in Program.cs - no component changes needed
```

## Development Workflows

### Debugging
- **F5** launches with browser debugging (Edge)
- **Blazor WASM Debug** config enables .NET breakpoints in browser
- Use browser DevTools for DOM/CSS inspection
- `dotnet watch` auto-rebuilds on file changes

### Dependencies
- **NuGet.config** forces package restore from nuget.org (required for this repo)
- No external API dependencies - fully self-contained demo

## Skill Reference

For detailed patterns, load `.github/skills/mypetvenunes/SKILL.md` which contains:
- Complete service interfaces
- Component parameter catalog  
- Full CSS variable reference
- Data model schemas
