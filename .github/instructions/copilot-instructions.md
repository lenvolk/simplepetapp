---
applyTo: "**"
---

# Copilot Instructions for MyPetVenues

## 🚨 WARNING: THIS FILE DESCRIBES INTENDED STRUCTURE

**This file describes the TARGET architecture. The MyPetVenues folder MAY NOT EXIST.**

Before assuming ANY code exists:
1. Check the user's workspace structure in their message
2. Run `Test-Path "MyPetVenues"` to verify
3. Read `.docs/memory.md` for ground truth

**If MyPetVenues folder doesn't exist, it needs to be BUILT from scratch using `.docs/implementation.md`**

---

## Project Overview

**MyPetVenues** (aka "PetSpots") is a Blazor WebAssembly (.NET 9) app for discovering pet-friendly venues. Currently a frontend-only prototype with mock data services.

## Architecture

```
MyPetVenues/           # Blazor WASM client (main app)
├── Models/            # Domain models: Venue, Review, Booking, User
├── Services/          # Mock*Service implementations with interfaces
├── Components/        # Reusable Razor components with scoped CSS
├── Pages/             # Routable pages (@page directives)
├── Layout/            # MainLayout, Header, Footer
└── wwwroot/           # Static assets (css/app.css, images/)

MyPetVenues.Api/       # Empty - future backend placeholder
MyPetVenues.Shared/    # Empty - future shared models placeholder
```

## Key Patterns

### Service Pattern
All data access uses interface + mock implementation. Services registered in `Program.cs`:
```csharp
builder.Services.AddSingleton<IThemeService, ThemeService>();
builder.Services.AddSingleton<IVenueService, MockVenueService>();
builder.Services.AddSingleton<IBookingService, MockBookingService>();
builder.Services.AddScoped<IUserService, MockUserService>();
```
When implementing real services, keep the interface and swap the implementation.

### Mock Data Generation
Mock services generate realistic sample data in their constructors (see `VenueService.cs`):
- `GenerateMockVenues()` creates 6 venues across different `VenueType` categories
- `GenerateMockReviews()` creates 8 reviews linked by `VenueId`
- Each venue has realistic amenities, pet policies, ratings, and hours
- When adding mock data, follow the existing pattern with varied ratings (4.5-4.9) and review counts

### Component Structure
Each component has paired `.razor` and `.razor.css` files for scoped styling:
- `VenueCard.razor` + `VenueCard.razor.css`
- Components use `[Parameter]` for inputs, `EventCallback` for outputs

### Styling Conventions
- **CSS Variables**: All colors, spacing via `--var-name` in `app.css`
- **Theme Support**: Light/dark mode via `.light-mode`/`.dark-mode` classes
- **Color Palette**: Pink gradient theme (`--accent-primary: #db2777`)
- **Font**: Plus Jakarta Sans (imported via Google Fonts)
- **BEM-ish naming**: `.venue-card`, `.venue-card-header`, `.featured-badge`

### Enums & Types
Key enums (use these EXACT values):
- `VenueType`: Park, Restaurant, Cafe, Hotel, Store, Beach, DayCare, Grooming, VetClinic
- `PetType`: Dog, Cat, Bird, Rabbit, SmallPet, All *(NOT "Small"!)*
- `BookingStatus`: Pending, Confirmed, Cancelled, Completed

### Model Properties (Canonical Reference)
Use these exact property names to avoid mismatches:
```
Venue: Id, Name, Description, Address, City, ImageUrl, Rating, ReviewCount,
       Type, AllowedPets, Amenities, OpeningHours, IsFeatured, ContactPhone, Website
Review: Id, VenueId, UserId, UserName, Rating, Comment, VisitDate, PetName
Booking: Id, UserId, VenueId, BookingDate, TimeSlot, NumberOfPets, Notes, Status
User: Id, Name, Email, ProfileImageUrl, Pets, FavoriteVenueIds, Bookings
Pet: Name, Type, Breed, Age, ImageUrl
```

## Build & Run

```powershell
# Build
dotnet build MyPetVenues/MyPetVenues.csproj

# Run (hot reload enabled)
dotnet run --project MyPetVenues/MyPetVenues.csproj
# Opens at https://localhost:5001 or http://localhost:5000
```

Or use VS Code tasks: `build (MyPetVenues)`, `run (MyPetVenues)`

## File Naming

- Pages: PascalCase (`VenueDetail.razor`)
- Components: PascalCase (`VenueCard.razor`)
- Services: `{Name}Service.cs` with `I{Name}Service` interface
- Images: lowercase with dashes (`images/venues/park1.jpg`)

## When Adding Features

1. **New Page**: Create in `Pages/`, add `@page "/route"`, inject services via `@inject`
2. **New Component**: Create `.razor` + `.razor.css` pair in `Components/`
3. **New Service**: Define interface, implement mock, register in `Program.cs`
4. **New Model**: Add to `Models/` namespace `MyPetVenues.Models`

## Code Style

- Nullable enabled (`<Nullable>enable</Nullable>`)
- Implicit usings enabled
- Use `string.Empty` over `""`
- Use collection expressions `new List<T> { }` → `[]` where appropriate
- Async methods return `Task<T>` and suffix with `Async`

### Razor Syntax Warning
When using lambdas with string literals in Razor attributes:
```razor
// ❌ BAD - escaped quotes cause CS1646/CS1525 errors:
<button @onclick="() => SetTab(\"pets\")">Pets</button>

// ✅ GOOD - use single quotes for outer attribute:
<button @onclick='() => SetTab("pets")'>Pets</button>

// ✅ ALSO GOOD - use @() wrapper:
<button @onclick="@(() => SetTab("pets"))">Pets</button>
```

## Testing Notes

No test project exists yet. When adding tests:
- Use xUnit
- Mock services implement interfaces, making them easy to test
- Consider `bUnit` for Blazor component testing

## Future Deployment

Target: **Azure Container Apps** (not yet configured)
- Containerize the Blazor WASM app when ready
- `MyPetVenues.Api/` placeholder will become the backend API
