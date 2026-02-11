# MyPetVenues Architecture Reference

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | Blazor WebAssembly (.NET 9.0, C# 12) |
| Components | Razor components with scoped CSS |
| Data (v1) | In-memory mock services |
| Theme | Pink gradient (#e91e63 → #c2185b), light/dark mode |
| Font | Plus Jakarta Sans |
| Cloud (future) | Azure Container Apps, Cosmos DB, ACR, App Insights |
| IaC | Bicep, RBAC/Entra ID (secretless) |
| Observability | OpenTelemetry, Application Insights |
| Testing | Playwright (browser), xUnit (unit) |
| Localization | JSON-based (wwwroot/locales/en.json, ru.json), ILanguageService |

## Project Structure

```
MyPetVenues/
├── Components/     # Reusable: VenueCard, ReviewCard, StarRating, PetBadge,
│                   #   AmenityTag, VenueTypeBadge, SearchFilters
├── Pages/          # Routable: Home, Venues, VenueDetail, Profile, BookVenue
├── Layout/         # Header, Footer, MainLayout
├── Models/         # Venue, User, Booking, Review + enums
├── Services/       # Interface + Mock implementation pairs
├── wwwroot/        # Static: css/app.css, images/, locales/
└── Program.cs      # DI registration
```

## Service Registration (Program.cs)

```csharp
builder.Services.AddSingleton<IThemeService, ThemeService>();
builder.Services.AddSingleton<IVenueService, MockVenueService>();
builder.Services.AddSingleton<IBookingService, MockBookingService>();
builder.Services.AddScoped<IUserService, MockUserService>();
```

Guidelines:
- **Singleton** for app-wide state that persists across session
- **Scoped** for user/session-specific state

## Data Models & Enums

- **VenueType**: Park, Restaurant, Cafe, Hotel, Store, Beach, DayCare, Grooming, VetClinic
- **PetType**: Dog, Cat, Bird, Rabbit, SmallPet, All
- **BookingStatus**: Pending, Confirmed, Cancelled, Completed

All enums defined in `Models/` alongside related classes.

## Styling System

CSS variables defined in `wwwroot/css/app.css`:
- Support light/dark mode via CSS class on root element
- `ThemeService` fires `OnThemeChanged` event — components subscribe
- Primary gradient: `#e91e63` → `#c2185b`
- Mobile breakpoint: `@media (max-width: 768px)`
- Every `.razor` component MUST have a paired `.razor.css`

## Navigation

- Blazor Router in `App.razor`
- `MainLayout.razor` wraps pages with Header + Footer
- `NavLink` components in Header auto-highlight active routes
- Add new pages: `@page "/route"` directive + link in Header

## Localization (if applicable)

- `ILanguageService` singleton following `ThemeService` event pattern
- JSON locale files in `wwwroot/locales/` (en.json, ru.json)
- Subscribe to `OnLanguageChanged` for reactive updates

## Current State

| Status | Item |
|--------|------|
| ✅ | Core pages (Home, Venues, VenueDetail, Profile, BookVenue) |
| ✅ | Component library (VenueCard, ReviewCard, StarRating, etc.) |
| ✅ | Mock services with sample data |
| ✅ | Light/dark theme |
| ✅ | Responsive design |
| ⏳ | Real backend API (mock only) |
| ⏳ | Authentication (mock user) |
| ⏳ | Database persistence |

## Infrastructure Patterns (from ACA branch)

When deploying to Azure, follow the phase-gated approach:

1. **Requirements** — PRD + architecture decisions documented
2. **Code** — Application code with interfaces ready for real backends
3. **Observability** — OpenTelemetry, App Insights, structured logging middleware
4. **Security** — RBAC, Entra ID, secretless (no connection strings)
5. **Deploy** — ACR build, Container Apps deployment, Cosmos DB provisioning

Use Bicep for IaC. Measure and document optimizations ("43% time savings").

## Skills Framework Pattern

```
.github/skills/skill-name/
├── SKILL.md              # YAML frontmatter (name, description) + instructions
├── TEMPLATE.md           # Response template with {placeholders} (optional)
├── scripts/              # Helper scripts — Python, Node.js, Bash (optional)
└── references/           # Reference docs loaded on demand (optional)
```

Skills trigger based on frontmatter `description`. Body loads only after trigger.
