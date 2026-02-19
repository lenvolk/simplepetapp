# MyPetVenues — Performance Review

> **Date:** 2026-02-19
> **Scope:** Full application review (services, components, pages, static assets, project config)

---

## Critical Issues

### 1. Oversized Images (~19 MB total)

The `wwwroot/images/` directory contains **19 MB** of unoptimized images. Several individual files exceed what an entire page should weigh:

| File | Size |
|------|------|
| `pets/dog6.png` | 6.0 MB |
| `pets/dog7.jpg` | 4.0 MB |
| `pets/dog1.png` | 1.9 MB |
| `pets/dog4.png` | 1.9 MB |
| `pets/cat2.jpg` | 976 KB |
| `pets/dog8.jpg` | 572 KB |

- No WebP/AVIF formats are used.
- No responsive images (`srcset` / `<picture>`).
- A single 6 MB PNG can take 30+ seconds on a 3G connection.

### 2. Search Input Triggers Re-render on Every Keystroke

`Components/SearchFilters.razor` line 9 uses `@bind:event="oninput"`, which fires a full component re-render (and parent LINQ re-evaluation) on every keystroke with no debounce.

### 3. Virtualization Imported but Never Used

The `_Imports.razor` imports `Microsoft.AspNetCore.Components.Web.Virtualization`, but no list in the app uses the `<Virtualize>` component. All lists (venues, reviews, bookings) render every item to the DOM at once.

### 4. No `@key` Directives on Any List

Every `@foreach` loop in the app (venue grids, review lists, amenity tags, pet badges) lacks a `@key` directive. Blazor cannot efficiently diff these lists and falls back to full re-rendering.

---

## High Priority

### 5. Render-Blocking Google Fonts Import

`wwwroot/css/app.css` line 7:
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
```
This `@import` blocks rendering until the external stylesheet is fetched. Self-hosting the font or loading via `<link rel="preload">` would eliminate the delay.

### 6. No WASM Trimming or AOT

`MyPetVenues.csproj` has no `<PublishTrimmed>`, `<RunAOTCompilation>`, or compression settings. The default publish bundle ships unused framework code, resulting in a significantly larger download than necessary.

### 7. Pages Do Not Implement IDisposable

None of the five page components (`Home`, `Venues`, `VenueDetail`, `Profile`, `BookVenue`) implement `IDisposable`. Only `Header.razor` does. If any page subscribes to singleton service events in the future, it will leak memory. The `ThemeService.OnThemeChanged` event (singleton lifetime) is an existing leak vector — any component that subscribes without unsubscribing will be retained in memory.

---

## Medium Priority

### 8. Venues Page Loads Data Twice on Init

`Pages/Venues.razor` calls `LoadVenues()` from both `OnInitializedAsync` and `OnParametersSetAsync`, causing a redundant data load and double render on initial navigation.

### 9. VenueDetail Page — Sequential Awaits with Intermediate StateHasChanged

`Pages/VenueDetail.razor` `LoadVenueData` makes three sequential async calls (`GetVenueByIdAsync`, `GetVenueReviewsAsync`, `GetCurrentUserAsync`) with a `StateHasChanged()` call between them, triggering multiple re-renders when one would suffice.

### 10. O(n×m) Favorite Venue Lookup

`Services/UserService.cs` `GetFavoriteVenuesAsync` filters all venues with `_currentUser.FavoriteVenueIds.Contains(v.Id)` where `FavoriteVenueIds` is a `List<int>`. This is O(n×m). Using a `HashSet<int>` would make it O(n).

### 11. Repeated LINQ in Render Paths

Several components evaluate LINQ expressions directly in markup on every render:

- `Pages/BookVenue.razor` line 97: `_venues.Where(v => v.PricePerHour > 0)` re-evaluated each render.
- `Pages/BookVenue.razor` line 151: `TimeSpan.Parse()` called inside a LINQ filter in markup.
- `Components/SearchFilters.razor` lines 22, 33: `Enum.GetValues<VenueType>()` and `Enum.GetValues<PetType>()` allocate new arrays each render.

### 12. Artificial Task.Delay Calls

- `Pages/Venues.razor` line 117: `await Task.Delay(300)` on every search.
- `Pages/BookVenue.razor` line 431: `await Task.Delay(1500)` on booking confirmation.

These exist to simulate latency but actively degrade user experience.

### 13. AmenityTag String Matching on Every Render

`Components/AmenityTag.razor` `GetAmenityEmoji()` runs 25+ `case` comparisons with `ToLower()` on every render. A static `Dictionary<string, string>` lookup would be O(1).

### 14. Large Scoped CSS Files

| File | Lines |
|------|-------|
| `Pages/Profile.razor.css` | 690 |
| `Pages/Home.razor.css` | 503 |
| `Pages/BookVenue.razor.css` | 503 |
| `Pages/VenueDetail.razor.css` | 404 |

These are parsed and bundled into the app CSS. Splitting or reducing them would improve bundle weight.

### 15. `transition: all` in Multiple Components

Several component CSS files use `transition: all 0.2s ease` instead of specifying exact properties, which forces the browser to watch and animate every CSS property change.

---

## Low Priority

### 16. No `ShouldRender` Overrides

No component implements `ShouldRender()`. Components re-render on every parent update regardless of whether their parameters changed.

### 17. Unused HttpClient Registration

`Program.cs` registers an `HttpClient` that is never injected or used anywhere in the app.

### 18. DI Lifetime Inconsistencies

- `MockUserService` is registered as **Scoped**, but holds mutable singleton-like state (`_currentUser`). In Blazor WASM scoped ≈ singleton, but this would break on Blazor Server.
- `VenueService` and `BookingService` are **Singleton** with mutable lists — safe in WASM but a data-corruption risk if ever moved to Server.

### 19. Task.FromResult Overhead

All mock service methods wrap synchronous results in `Task.FromResult<>`, adding unnecessary `Task` allocations. Acceptable for mocks, but worth noting.

### 20. DateTime.Now in Hot Paths

`Components/ReviewCard.razor` calls `DateTime.Now` on every render to compute relative dates. Caching the result in `OnInitialized` would avoid repeated syscalls.
