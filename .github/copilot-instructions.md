# MyPetVenues - Copilot Instructions

## Project Overview

MyPetVenues is a community-driven platform for discovering, reviewing, and booking pet-friendly venues. This is a Blazor WebAssembly application with a .NET 9.0 backend.

**Product Vision**: "Yelp meets Meetup" for pet owners - a centralized, reviewed, and bookable directory of pet-friendly venues.

## Build & Run

```bash
# Build the application
dotnet build MyPetVenues/MyPetVenues.csproj

# Run the application (opens on http://localhost:5050)
dotnet run --project MyPetVenues/MyPetVenues.csproj

# Build entire solution
dotnet build simkplepetapp.sln
```

## Architecture

### Project Structure

```
MyPetVenues/              # Main Blazor WebAssembly project
├── Components/           # Reusable Razor components (VenueCard, ReviewCard, StarRating, etc.)
├── Pages/               # Routable pages (Home, Venues, VenueDetail, Profile, BookVenue)
├── Layout/              # Layout components (Header, Footer, MainLayout)
├── Models/              # Data models (Venue, User, Booking, Review)
├── Services/            # Business logic services
├── wwwroot/             # Static assets (css, images, icons)
└── Program.cs           # DI registration and app configuration
```

### Tech Stack

- **Frontend**: Blazor WebAssembly (C# 12, .NET 9.0)
- **UI Framework**: Razor components with scoped CSS
- **Data**: Mock/in-memory services (no database in v1)
- **Fonts**: Plus Jakarta Sans
- **Theme**: Pink gradient with light/dark mode support

### Service Architecture

Services follow SOLID principles with interface-based design:

- **IVenueService / MockVenueService**: Venue search, filtering, CRUD operations
- **IUserService / MockUserService**: User authentication, profile management
- **IBookingService / MockBookingService**: Booking creation, cancellation, retrieval
- **IThemeService / ThemeService**: Theme switching (light/dark mode)

All services are registered in `Program.cs`:
- `IThemeService`: Singleton
- `IVenueService`: Singleton
- `IBookingService`: Singleton
- `IUserService`: Scoped (user session-specific)

## Key Conventions

### Component Organization

1. **Razor components** are paired with scoped CSS files:
   - `VenueCard.razor` + `VenueCard.razor.css`
   - CSS scoping prevents style conflicts

2. **Reusable components** go in `Components/`:
   - VenueCard, ReviewCard, StarRating, PetBadge, AmenityTag, VenueTypeBadge, SearchFilters

3. **Routable pages** go in `Pages/`:
   - Use `@page "/route"` directive
   - Main pages: Home, Venues, VenueDetail, Profile, BookVenue

### Data Models & Enums

- **VenueType**: Park, Restaurant, Cafe, Hotel, Store, Beach, DayCare, Grooming, VetClinic
- **PetType**: Dog, Cat, Bird, Rabbit, SmallPet, All
- **BookingStatus**: Pending, Confirmed, Cancelled, Completed

All enums defined in `Models/` alongside their related classes.

### Styling Conventions

1. **CSS Variables** for theming:
   - Defined in `wwwroot/css/app.css`
   - Supports light/dark mode switching
   - Primary color: pink gradient (#e91e63 to #c2185b)

2. **Scoped CSS**:
   - Every component has its own `.razor.css` file
   - Styles are automatically scoped to prevent conflicts

3. **Responsive Design**:
   - Mobile-first approach
   - Breakpoints: `@media (max-width: 768px)` for mobile

### Mock Data Services

All services use in-memory mock data (no database):
- **MockVenueService**: 6 sample venues with reviews
- **MockUserService**: Sample user profiles with pets
- **MockBookingService**: Sample bookings linked to venues

Mock data is generated in service constructors and persists for the session duration.

## Important Implementation Details

### Navigation

- Navigation handled by Blazor Router in `App.razor`
- `MainLayout.razor` wraps all pages with Header and Footer
- `NavLink` components in Header automatically highlight active routes

### Theme Switching

- `ThemeService` manages light/dark mode state
- Components subscribe to `OnThemeChanged` event
- Theme applied via CSS class on root element

### Dependency Injection

All services registered in `Program.cs`:
```csharp
builder.Services.AddSingleton<IThemeService, ThemeService>();
builder.Services.AddSingleton<IVenueService, MockVenueService>();
builder.Services.AddSingleton<IBookingService, MockBookingService>();
builder.Services.AddScoped<IUserService, MockUserService>();
```

Use `@inject IServiceName ServiceName` in Razor components to access services.

## Current State

- ✅ All core pages implemented
- ✅ Component library complete
- ✅ Mock services with sample data
- ✅ Light/dark theme support
- ✅ Responsive design
- ⏳ No real backend (mock data only)
- ⏳ No authentication (mock user)
- ⏳ No database persistence

## Product Requirements

See `PRD-v1.md` for complete product specifications including:
- User stories with acceptance criteria
- Success metrics
- Technical architecture details
- Future roadmap (v2+)

## Future Considerations (Out of Scope v1)

- Payment processing
- Real backend API integration
- Database persistence (Entity Framework Core)
- Real authentication/authorization
- Messaging between users and venues
- Mobile app (iOS/Android)
