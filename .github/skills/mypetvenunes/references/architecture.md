# MyPetVenues Architecture Reference

## Technology Stack

- **Framework**: Blazor WebAssembly (.NET 9)
- **Language**: C# 13
- **Styling**: CSS Variables + Scoped CSS
- **Font**: Plus Jakarta Sans (Google Fonts)
- **Build**: `dotnet build MyPetVenues/MyPetVenues.csproj`
- **Run**: `dotnet run --project MyPetVenues/MyPetVenues.csproj`

## Project Structure

```
MyPetVenues/
├── Program.cs           # Entry point, DI registration
├── App.razor            # Root component
├── _Imports.razor       # Global using statements
├── Components/          # Reusable UI components
├── Layout/              # MainLayout, Header, Footer
├── Models/              # Data models and enums
├── Pages/               # Routable page components
├── Services/            # Interface + Mock implementations
└── wwwroot/
    ├── index.html       # Host page
    ├── css/app.css      # Global styles + CSS variables
    └── images/          # Static assets
```

## Service Registration Pattern

All services follow SOLID principles with interface + implementation separation:

```csharp
// Program.cs - Service Registration Order
builder.Services.AddSingleton<IThemeService, ThemeService>();
builder.Services.AddSingleton<IVenueService, MockVenueService>();
builder.Services.AddSingleton<IBookingService, MockBookingService>();
builder.Services.AddScoped<IUserService, MockUserService>();
```

**Lifetime Rules:**
- `Singleton` for stateless services (Theme, Venue, Booking)
- `Scoped` for services with user-specific state (User)

## Service Interfaces

### IVenueService
```csharp
Task<List<Venue>> GetAllVenuesAsync();
Task<List<Venue>> GetFeaturedVenuesAsync();
Task<Venue?> GetVenueByIdAsync(int id);
Task<List<Venue>> SearchVenuesAsync(string? searchTerm, VenueType? type, PetType? petType);
Task<List<Review>> GetVenueReviewsAsync(int venueId);
```

### IUserService
```csharp
Task<User?> GetCurrentUserAsync();
Task<bool> UpdateUserAsync(User user);
Task<List<Venue>> GetFavoriteVenuesAsync();
Task<bool> ToggleFavoriteAsync(int venueId);
```

### IBookingService
```csharp
Task<List<Booking>> GetUserBookingsAsync(int userId);
Task<Booking?> GetBookingByIdAsync(int id);
Task<Booking> CreateBookingAsync(Booking booking);
Task<bool> CancelBookingAsync(int bookingId);
```

### IThemeService
```csharp
bool IsDarkMode { get; }
event Action? OnThemeChanged;
void ToggleTheme();
void SetTheme(bool isDarkMode);
```

## Page Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home.razor | Landing page with hero, featured venues |
| `/venues` | Venues.razor | Search/filter venue listing |
| `/venues/{id}` | VenueDetail.razor | Single venue details + reviews |
| `/profile` | Profile.razor | User profile with tabs |
| `/booking` | BookVenue.razor | Multi-step booking wizard |

## Component Communication Patterns

**Parameters (Parent to Child):**
```csharp
[Parameter, EditorRequired]
public Venue Venue { get; set; } = default!;

[Parameter]
public bool IsFeatured { get; set; }
```

**EventCallbacks (Child to Parent):**
```csharp
[Parameter]
public EventCallback OnClick { get; set; }

[Parameter]
public EventCallback<(string?, VenueType?, PetType?)> OnSearch { get; set; }
```

## Dependency Injection in Components

```razor
@inject IVenueService VenueService
@inject IUserService UserService
@inject NavigationManager Navigation
```

## Navigation Pattern

```csharp
// Programmatic navigation
Navigation.NavigateTo("/venues");
Navigation.NavigateTo($"/venues/{venueId}");
Navigation.NavigateTo($"/venues?type={type}&search={term}");
```

## Data Loading Pattern

Use `OnInitializedAsync` for initial data fetch:

```csharp
private List<Venue>? _featuredVenues;

protected override async Task OnInitializedAsync()
{
    _featuredVenues = await VenueService.GetFeaturedVenuesAsync();
}
```

Render loading state while data is null:
```razor
@if (_venues is null)
{
    <div class="loading-state">Loading...</div>
}
else
{
    @foreach (var venue in _venues) { ... }
}
```
