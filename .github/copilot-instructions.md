# MyPetVenues

Pet-friendly venue discovery platform — "Yelp meets Meetup" for pet owners.
See [PRD-v1.md](../PRD-v1.md) for product requirements, user stories, and roadmap.

## Build & Run

```bash
dotnet build MyPetVenues/MyPetVenues.csproj
dotnet run --project MyPetVenues/MyPetVenues.csproj   # http://localhost:5039
dotnet build simkplepetapp.sln                         # full solution
```

No tests yet. No real backend — all data is in-memory mock services.

## Architecture

**Blazor WebAssembly** app targeting **.NET 9.0** (C# 12, nullable enabled, implicit usings).

```
MyPetVenues/              # Blazor WASM — the only active project
├── Components/           # Reusable Razor components (VenueCard, ReviewCard, StarRating, etc.)
├── Pages/                # Routable pages (@page directive): Home, Venues, VenueDetail, Profile, BookVenue
├── Layout/               # MainLayout wraps all pages with Header + Footer
├── Models/               # Data models + enums (Venue, User, Booking, Review)
├── Services/             # Interface + mock implementation per domain
├── wwwroot/css/app.css   # CSS variables, theme, fonts (Plus Jakarta Sans)
└── Program.cs            # DI registration
```

`MyPetVenues.Api/` and `MyPetVenues.Shared/` directories exist as empty placeholders (not in the .sln yet).

## Conventions

### Services

- Interface-based DI registered in `Program.cs`
- All methods return `Task<T>` (async-ready for future real backend)
- Lifetimes: `IThemeService`, `IVenueService`, `IBookingService` → **Singleton**; `IUserService` → **Scoped**
- Inject in Razor via `@inject IVenueService VenueService`

### Components

- Every `.razor` file has a paired `.razor.css` for scoped styles
- Reusable components → `Components/`; routable pages → `Pages/`
- Use `[Parameter, EditorRequired]` for required component inputs
- Loading and not-found states in every page

### Styling

- **CSS variables** in `wwwroot/css/app.css` — supports light/dark mode via `ThemeService`
- **Primary palette**: pink gradient `#e91e63` → `#c2185b`
- **Mobile-first**: breakpoint at `max-width: 768px`
- Never add global styles to component CSS — use scoped `.razor.css` only
