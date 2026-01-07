# MyPetVenues - Copilot Instructions

Pet-friendly venue discovery platform built with **Blazor WebAssembly (.NET 9)**.

## Quick Reference

| Action | Command / Location |
|--------|-------------------|
| Run dev server | `cd MyPetVenues && dotnet run --urls "http://localhost:5050"` |
| Build | `dotnet build MyPetVenues/MyPetVenues.csproj` |
| Add service | Define interface in `Services/`, register in `Program.cs` |
| Add component | Create `.razor` + `.razor.css` pair in `Components/` |
| Add page | Create in `Pages/` with `@page "/route"` directive |

## Architecture

```
MyPetVenues/           # Main Blazor WASM app
├── Components/        # Reusable: VenueCard, ReviewCard, SearchFilters, skeletons
├── Layout/            # MainLayout (theme wrapper), Header, Footer
├── Models/            # Venue, Review, Booking, User + enums (VenueType, PetType)
├── Pages/             # Home, Venues, VenueDetail, BookVenue, Profile
├── Services/          # Interface + Mock pattern (IVenueService → MockVenueService)
└── wwwroot/css/app.css  # Design tokens (CSS variables)
```

## Code Patterns

### Services - Always interface + implementation
```csharp
// Services/VenueService.cs
public interface IVenueService {
    Task<List<Venue>> GetAllVenuesAsync();
    Task<Venue?> GetVenueByIdAsync(int id);
}
public class MockVenueService : IVenueService { /* mock data */ }

// Program.cs - register as singleton or scoped
builder.Services.AddSingleton<IVenueService, MockVenueService>();
```

### Components - Parameters with EditorRequired
```razor
@code {
    [Parameter, EditorRequired]
    public Venue Venue { get; set; } = default!;
    
    [Parameter]
    public EventCallback OnClick { get; set; }
}
```

### Pages - Async data loading pattern
```razor
@page "/venues/{VenueId:int}"
@inject IVenueService VenueService
@inject ILoadingService LoadingService

@code {
    [Parameter] public int VenueId { get; set; }
    private Venue? _venue;

    protected override async Task OnInitializedAsync() {
        LoadingService.SetLoading("venue:detail", true);
        _venue = await VenueService.GetVenueByIdAsync(VenueId);
        LoadingService.SetLoading("venue:detail", false);
    }
}
```

### State - Subscribe to service events
```razor
@inject IThemeService ThemeService
@implements IDisposable

@code {
    protected override void OnInitialized() => ThemeService.OnThemeChanged += StateHasChanged;
    public void Dispose() => ThemeService.OnThemeChanged -= StateHasChanged;
}
```

## Styling Rules

**Always use CSS variables** from `wwwroot/css/app.css`:
```css
/* ✅ Correct */
.card { background: var(--card-bg); border-radius: var(--radius-xl); }

/* ❌ Wrong - no hardcoded values */
.card { background: #ffffff; border-radius: 16px; }
```

**Key tokens:**
- Colors: `--accent-primary` (pink), `--accent-secondary` (purple), `--text-primary`, `--card-bg`
- Spacing: `--space-1` (0.25rem) through `--space-16` (4rem)
- Radii: `--radius-sm` through `--radius-3xl`
- Transitions: `--transition-fast`, `--transition-base`, `--transition-slow`

**Scoped CSS:** Every component gets a `.razor.css` file (e.g., `VenueCard.razor` → `VenueCard.razor.css`)

## Domain Models

**VenueType enum:** `Park`, `Restaurant`, `Cafe`, `Hotel`, `Store`, `Beach`, `DayCare`, `Grooming`, `VetClinic`

**PetType enum:** `Dog`, `Cat`, `Bird`, `Rabbit`, `SmallPet`, `All`

## Conventions

1. **Nullable enabled** - Use `Venue?` for potentially null values, `= default!` for required parameters
2. **Loading states** - Use `LoadingService.SetLoading("key", true/false)` with skeleton components
3. **Navigation** - Inject `NavigationManager`, call `NavigateTo("/path")`
4. **Theme** - `.light-mode`/`.dark-mode` class on `app-container` in MainLayout
5. **Accessibility** - Include ARIA labels, respect `prefers-reduced-motion`

## Key Files

- **DI Setup:** `Program.cs` - all service registrations
- **Design Tokens:** `wwwroot/css/app.css` - CSS variables for theming
- **App Shell:** `Layout/MainLayout.razor` - theme class application
- **Global Imports:** `_Imports.razor` - shared using statements
