# UI Modernization - Clean and Modern Redesign

**Branch:** `feature/ui-modernization`

## Goal
Deliver a polished, accessible, and modernized MyPetVenues UI by introducing design tokens, accessibility fixes, loading skeletons, enhanced animations, and modern CSS features while preserving the existing pink-purple brand.

## Prerequisites
Make sure that the user is currently on the `feature/ui-modernization` branch before beginning implementation. If not, move them to the correct branch. If the branch does not exist, create it from the currently checked-out branch.

### Step-by-Step Instructions

#### Step 1: Design Tokens Foundation & Accessibility Fixes
- [ ] Replace global styling with tokenized, accessible foundations in `wwwroot/css/app.css`:

```css
:root {
  /* Core brand palette */
  --color-primary: #f64f9c;
  --color-primary-strong: #d23c82;
  --color-primary-weak: #ffd6ec;
  --color-secondary: #7c5dff;
  --color-secondary-strong: #5f3fe6;
  --color-secondary-weak: #e4ddff;
  --color-green: #2fbf71;
  --color-green-strong: #1c9c5a;
  --color-green-weak: #d6f5e6;
  --color-surface: #0f0f15;
  --color-surface-elevated: #171724;
  --color-surface-muted: #1f2030;
  --color-surface-contrast: #ffffff;
  --color-border: #2d2e42;
  --color-border-strong: #41445f;
  --color-info: #2f80ed;
  --color-warning: #f2c94c;
  --color-error: #eb5757;
  --color-success: #27ae60;
  --color-focus: #6ee7ff;

  /* Typography scale */
  --font-family-base: "Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;

  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;

  /* Radii */
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.25rem;
  --radius-full: 999px;

  /* Shadows */
  --shadow-xs: 0 4px 10px rgba(0, 0, 0, 0.08);
  --shadow-sm: 0 6px 14px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.18);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 22px 60px rgba(0, 0, 0, 0.24);

  /* Transitions */
  --transition-fast: 120ms ease-out;
  --transition-base: 180ms ease;
  --transition-slow: 260ms ease-in-out;

  /* Breakpoints */
  --bp-xs: 480px;
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;

  color-scheme: light dark;
}

:root.light {
  --color-surface: #f9f7fb;
  --color-surface-elevated: #ffffff;
  --color-surface-muted: #f0ecf7;
  --color-surface-contrast: #0f0f15;
  --color-border: #e2dff0;
  --color-border-strong: #cfcadb;
  --color-text: #111018;
  --color-text-muted: #4b4a63;
  --color-text-subtle: #737291;
  background: #f9f7fb;
  color: var(--color-text);
}

:root.dark {
  --color-text: #f4f3ff;
  --color-text-muted: #c7c6da;
  --color-text-subtle: #9b9ab3;
  background: #0f0f15;
  color: var(--color-text);
}

:root.green {
  --color-primary: #1fbf9f;
  --color-primary-strong: #15a180;
  --color-primary-weak: #c8f5eb;
  --color-secondary: #2f855a;
  --color-secondary-strong: #256844;
  --color-secondary-weak: #d9f3e7;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

* { box-sizing: border-box; }
html, body {
  margin: 0;
  min-height: 100%;
  font-family: var(--font-family-base);
  background: var(--color-surface);
  color: var(--color-text);
  scroll-behavior: smooth;
}

a { color: inherit; text-decoration: none; }
a:hover { color: var(--color-primary); }

:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

.skip-to-content {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-2) var(--space-4);
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--radius-md);
  transition: var(--transition-base);
  z-index: 9999;
}
.skip-to-content:focus-visible {
  top: var(--space-2);
  box-shadow: var(--shadow-md);
}

header, footer {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: #fff;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-full);
  border: none;
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-base);
}
.btn:hover, .btn:focus-visible {
  transform: translateY(-1px) scale(1.01);
  box-shadow: var(--shadow-md);
  background: var(--color-primary-strong);
}
.btn:active { transform: translateY(0); }

.container {
  width: min(1200px, 100% - 2.5rem);
  margin: 0 auto;
  padding: var(--space-6) 0;
}

.card {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-5);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}
.card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }

.text-gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  color: transparent;
}

.utility-grid {
  display: grid;
  gap: var(--space-4);
}
@media (min-width: var(--bp-md)) {
  .utility-grid.grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .utility-grid.grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

main { display: block; }

/* Header & footer focus ring override for high contrast */
header a:focus-visible, footer a:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

/* Reduce default animations when motion preference is set */
@media (prefers-reduced-motion: reduce) {
  .btn, .card { transition: none; }
}
```

- [ ] Add accessible header structure with skip link, aria labels, and keyboard shortcuts in `Layout/Header.razor`:

```razor
<header class="site-header" role="navigation" aria-label="Primary">
  <a class="skip-to-content" href="#main-content">Skip to content</a>
  <div class="header-inner">
    <button class="logo" @onclick="() => Navigation.NavigateTo("/")" aria-label="Go to home">🐾 MyPetVenues</button>
    <nav class="nav" aria-label="Main navigation">
      <a href="/" @onclick:preventDefault="true" @onclick="() => Navigation.NavigateTo("/")">Home</a>
      <a href="/venues" @onclick:preventDefault="true" @onclick="() => Navigation.NavigateTo("/venues")">Venues</a>
      <a href="/profile" @onclick:preventDefault="true" @onclick="() => Navigation.NavigateTo("/profile")">Profile</a>
      <a href="/book" @onclick:preventDefault="true" @onclick="() => Navigation.NavigateTo("/book")">Book</a>
    </nav>
    <div class="actions">
      <button class="icon-btn" aria-label="Toggle theme" @onclick="ToggleTheme">
        <span aria-hidden="true">🌗</span>
      </button>
      <button class="icon-btn" aria-label="Open search" @onclick="FocusSearch" @onkeydown="HandleSearchShortcut">
        <span aria-hidden="true">🔍</span>
      </button>
      <button class="cta" @onclick="() => Navigation.NavigateTo("/venues")">Find a Venue</button>
    </div>
    <button class="mobile-menu" aria-label="Toggle navigation" @onclick="ToggleMenu">
      <span aria-hidden="true">☰</span>
    </button>
  </div>
  <div class="mobile-drawer" hidden="@(!_isMenuOpen)" role="menu">
    <button class="icon-btn close" aria-label="Close menu" @onclick="ToggleMenu">✕</button>
    <a role="menuitem" href="/" @onclick:preventDefault="true" @onclick="() => NavigateAndClose("/")">Home</a>
    <a role="menuitem" href="/venues" @onclick:preventDefault="true" @onclick="() => NavigateAndClose("/venues")">Venues</a>
    <a role="menuitem" href="/profile" @onclick:preventDefault="true" @onclick="() => NavigateAndClose("/profile")">Profile</a>
    <a role="menuitem" href="/book" @onclick:preventDefault="true" @onclick="() => NavigateAndClose("/book")">Book</a>
  </div>
</header>

@code {
  private bool _isMenuOpen;

  [Inject] public NavigationManager Navigation { get; set; } = default!;
  [Inject] public ThemeService Theme { get; set; } = default!;
  [Inject] public IJSRuntime JS { get; set; } = default!;

  protected override void OnAfterRender(bool firstRender)
  {
    if (firstRender)
    {
      JS.InvokeVoidAsync("window.addEventListener", "keydown", DotNetObjectReference.Create(this), "HandleGlobalKey");
    }
  }

  [JSInvokable]
  public void HandleGlobalKey(KeyboardEventArgs e)
  {
    if (e.CtrlKey && e.Key == "k")
    {
      FocusSearch();
    }
    if (e.Key == "Escape" && _isMenuOpen)
    {
      ToggleMenu();
      StateHasChanged();
    }
  }

  private void ToggleTheme() => Theme.ToggleTheme();
  private void ToggleMenu() => _isMenuOpen = !_isMenuOpen;
  private void NavigateAndClose(string uri)
  {
    _isMenuOpen = false;
    Navigation.NavigateTo(uri);
  }

  private async void FocusSearch()
  {
    await JS.InvokeVoidAsync("document.getElementById", "global-search")
      .ContinueWith(_ => JS.InvokeVoidAsync("(el) => el && el.focus()", "global-search"));
  }

  private Task HandleSearchShortcut(KeyboardEventArgs _) => Task.CompletedTask;
}
```

- [ ] Update header styles for focus visibility and responsive layout in `Layout/Header.razor.css`:

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}
.header-inner {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-5);
}
.logo {
  background: none;
  border: none;
  color: #fff;
  font-weight: 800;
  font-size: var(--text-lg);
  cursor: pointer;
}
.nav {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}
.nav a {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  color: #fff;
  font-weight: 600;
}
.nav a:hover, .nav a:focus-visible {
  background: rgba(255, 255, 255, 0.12);
}
.actions {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
}
.icon-btn {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  cursor: pointer;
}
.icon-btn:hover, .icon-btn:focus-visible {
  background: rgba(255, 255, 255, 0.16);
}
.cta {
  background: #fff;
  color: var(--color-primary);
  border: none;
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-4);
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}
.mobile-menu { display: none; }
.mobile-drawer {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-3);
  background: var(--color-surface-elevated);
  border-top: 1px solid var(--color-border);
}
.mobile-drawer a {
  color: var(--color-text);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
}
.mobile-drawer a:hover, .mobile-drawer a:focus-visible {
  background: var(--color-surface-muted);
}
.mobile-drawer .close {
  justify-self: end;
}

@media (max-width: 900px) {
  .header-inner { grid-template-columns: auto auto 1fr auto; }
  .nav { display: none; }
  .mobile-menu { display: inline-flex; background: none; border: none; color: #fff; }
}
```

- [ ] Add footer landmarks and accessibility labels in `Layout/Footer.razor`:

```razor
<footer class="site-footer" role="contentinfo" aria-label="Footer">
  <div class="footer-inner container">
    <div>
      <h3 class="text-gradient">MyPetVenues</h3>
      <p>Find the best pet-friendly venues with confidence.</p>
    </div>
    <div>
      <h4>Explore</h4>
      <ul>
        <li><a href="/venues">Venues</a></li>
        <li><a href="/book">Book</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    </div>
    <div>
      <h4>Support</h4>
      <ul>
        <li><a href="mailto:support@mypetvenues.com">Email us</a></li>
        <li><a href="/">Status</a></li>
      </ul>
    </div>
    <div>
      <h4>Newsletter</h4>
      <form class="newsletter" aria-label="Newsletter signup">
        <label class="sr-only" for="newsletter-email">Email</label>
        <input id="newsletter-email" type="email" name="email" placeholder="you@example.com" required />
        <button type="submit" class="btn">Subscribe</button>
      </form>
    </div>
  </div>
  <div class="footer-bottom">Made with ❤️ for pets everywhere.</div>
</footer>
```

- [ ] Style footer with new tokens in `Layout/Footer.razor.css`:

```css
.site-footer {
  padding-top: var(--space-6);
  color: #fff;
}
.footer-inner {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.site-footer h3 { margin: 0 0 var(--space-2); }
.site-footer h4 { margin-bottom: var(--space-2); }
.site-footer ul { list-style: none; padding: 0; margin: 0; display: grid; gap: var(--space-2); }
.site-footer a { color: #fff; }
.site-footer a:focus-visible { outline-color: #fff; }
.newsletter {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.newsletter input {
  padding: var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}
.footer-bottom {
  padding: var(--space-4) 0;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: var(--space-5);
}
```

- [ ] Align main layout spacing and focus states in `Layout/MainLayout.razor.css`:

```css
.page {
  min-height: 100vh;
  background: radial-gradient(circle at 20% 20%, rgba(246, 79, 156, 0.08), transparent 30%),
              radial-gradient(circle at 80% 10%, rgba(124, 93, 255, 0.06), transparent 32%),
              var(--color-surface);
}
main {
  padding: var(--space-6) 0 var(--space-8);
}
@media (max-width: var(--bp-sm)) {
  main { padding: var(--space-5) 0 var(--space-7); }
}
```

##### Step 1 Verification Checklist
- [ ] No build errors
- [ ] Keyboard navigation works (Tab/Shift+Tab, Enter, Escape closes mobile menu)
- [ ] Skip link focuses `#main-content` and is visible on focus
- [ ] Icon-only buttons have ARIA labels and visible focus states
- [ ] prefers-reduced-motion disables non-essential animations

#### Step 1 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 2: Loading States & Skeleton Screens
- [ ] Add centralized loading service in `Services/LoadingService.cs`:

```csharp
using System.Collections.Concurrent;

namespace MyPetVenues.Services
{
    public class LoadingService
    {
        private readonly ConcurrentDictionary<string, bool> _states = new();
        private readonly ConcurrentDictionary<string, List<Action<bool>>> _listeners = new();

        public void SetLoading(string key, bool isLoading)
        {
            _states[key] = isLoading;
            if (_listeners.TryGetValue(key, out var subs))
            {
                foreach (var sub in subs)
                {
                    sub.Invoke(isLoading);
                }
            }
        }

        public bool IsLoading(string key) => _states.TryGetValue(key, out var val) && val;

        public IDisposable Subscribe(string key, Action<bool> callback)
        {
            var list = _listeners.GetOrAdd(key, _ => new List<Action<bool>>());
            list.Add(callback);
            if (_states.TryGetValue(key, out var current)) callback(current);

            return new Unsubscriber(() =>
            {
                list.Remove(callback);
            });
        }

        private sealed class Unsubscriber : IDisposable
        {
            private readonly Action _dispose;
            public Unsubscriber(Action dispose) => _dispose = dispose;
            public void Dispose() => _dispose();
        }
    }
}
```

- [ ] Register `LoadingService` in `Program.cs`:

```csharp
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MyPetVenues;
using MyPetVenues.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped<VenueService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<BookingService>();
builder.Services.AddScoped<ThemeService>();
builder.Services.AddSingleton<LoadingService>();

await builder.Build().RunAsync();
```

- [ ] Add venue skeleton component at `Components/VenueCardSkeleton.razor`:

```razor
<div class="venue-skeleton" role="status" aria-live="polite" aria-busy="true">
  <div class="image shimmer"></div>
  <div class="content">
    <div class="line wide shimmer"></div>
    <div class="line shimmer"></div>
    <div class="pill shimmer"></div>
    <div class="line shimmer"></div>
  </div>
</div>
```

- [ ] Style venue skeleton in `Components/VenueCardSkeleton.razor.css`:

```css
.venue-skeleton {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface-elevated);
}
.image {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-md);
}
.content { display: grid; gap: var(--space-2); }
.line { height: 12px; border-radius: var(--radius-full); }
.line.wide { width: 70%; }
.pill { width: 40%; height: 10px; border-radius: var(--radius-full); }

.shimmer {
  background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .shimmer { animation: none; }
}
```

- [ ] Add review skeleton component at `Components/ReviewCardSkeleton.razor`:

```razor
<div class="review-skeleton" role="status" aria-live="polite" aria-busy="true">
  <div class="header">
    <div class="avatar shimmer"></div>
    <div class="meta">
      <div class="line shimmer"></div>
      <div class="line short shimmer"></div>
    </div>
  </div>
  <div class="line shimmer"></div>
  <div class="line shimmer"></div>
  <div class="line short shimmer"></div>
</div>
```

- [ ] Style review skeleton in `Components/ReviewCardSkeleton.razor.css`:

```css
.review-skeleton {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface-elevated);
  display: grid;
  gap: var(--space-3);
}
.header { display: grid; grid-template-columns: auto 1fr; gap: var(--space-3); align-items: center; }
.avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
}
.meta { display: grid; gap: var(--space-2); }
.line { height: 10px; border-radius: var(--radius-full); }
.line.short { width: 40%; }
.shimmer {
  background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .shimmer { animation: none; }
}
```

- [ ] Show skeletons during load in `Pages/Home.razor`:

```razor
@page "/"
@inject VenueService VenueService
@inject NavigationManager Navigation
@inject LoadingService Loading

<PageTitle>MyPetVenues</PageTitle>

<main id="main-content">
  @if (Loading.IsLoading("home-featured"))
  {
    <div class="utility-grid grid-3">
      @for (var i = 0; i < 6; i++)
      {
        <VenueCardSkeleton />
      }
    </div>
  }
  else if (featuredVenues is null)
  {
    <p>Unable to load featured venues.</p>
  }
  else
  {
    <div class="utility-grid grid-3">
      @foreach (var venue in featuredVenues)
      {
        <VenueCard Venue="venue" OnSelect="() => Navigation.NavigateTo($"/venues/{venue.Id}")" />
      }
    </div>
  }
</main>

@code {
  private List<Venue>? featuredVenues;
  private IDisposable? _subscription;

  protected override async Task OnInitializedAsync()
  {
    _subscription = Loading.Subscribe("home-featured", _ => StateHasChanged());
    Loading.SetLoading("home-featured", true);
    await Task.Delay(200);
    featuredVenues = await VenueService.GetFeaturedVenuesAsync();
    Loading.SetLoading("home-featured", false);
  }

  public void Dispose()
  {
    _subscription?.Dispose();
  }
}
```

- [ ] Style home loading grid in `Pages/Home.razor.css`:

```css
.utility-grid {
  margin-top: var(--space-5);
}
```

- [ ] Add skeletons to venues list in `Pages/Venues.razor`:

```razor
@page "/venues"
@inject VenueService VenueService
@inject NavigationManager Navigation
@inject LoadingService Loading

<PageTitle>Venues</PageTitle>

<main id="main-content">
  @if (Loading.IsLoading("venues-list"))
  {
    <div class="utility-grid grid-3">
      @for (var i = 0; i < 6; i++)
      {
        <VenueCardSkeleton />
      }
    </div>
  }
  else if (venues?.Count == 0)
  {
    <p>No venues found.</p>
  }
  else
  {
    <div class="utility-grid grid-3">
      @foreach (var venue in venues!)
      {
        <VenueCard Venue="venue" OnSelect="() => Navigation.NavigateTo($"/venues/{venue.Id}")" />
      }
    </div>
  }
</main>

@code {
  private List<Venue>? venues;
  private IDisposable? _subscription;

  protected override async Task OnInitializedAsync()
  {
    _subscription = Loading.Subscribe("venues-list", _ => StateHasChanged());
    Loading.SetLoading("venues-list", true);
    await Task.Delay(200);
    venues = await VenueService.GetVenuesAsync();
    Loading.SetLoading("venues-list", false);
  }

  public void Dispose() => _subscription?.Dispose();
}
```

- [ ] Style venues grid in `Pages/Venues.razor.css`:

```css
.utility-grid { margin-top: var(--space-5); }
```

- [ ] Add skeletons to venue detail in `Pages/VenueDetail.razor`:

```razor
@page "/venues/{Id:int}"
@inject VenueService VenueService
@inject LoadingService Loading
@inject NavigationManager Navigation

<PageTitle>Venue Details</PageTitle>

<main id="main-content">
  @if (Loading.IsLoading("venue-detail"))
  {
    <VenueCardSkeleton />
    <div class="reviews">
      @for (var i = 0; i < 3; i++)
      {
        <ReviewCardSkeleton />
      }
    </div>
  }
  else if (venue is null)
  {
    <p>Venue not found.</p>
  }
  else
  {
    <!-- existing venue detail content goes here -->
  }
</main>

@code {
  [Parameter] public int Id { get; set; }
  private Venue? venue;
  private IDisposable? _subscription;

  protected override async Task OnParametersSetAsync()
  {
    _subscription = Loading.Subscribe("venue-detail", _ => StateHasChanged());
    Loading.SetLoading("venue-detail", true);
    await Task.Delay(200);
    venue = await VenueService.GetVenueByIdAsync(Id);
    Loading.SetLoading("venue-detail", false);
  }

  public void Dispose() => _subscription?.Dispose();
}
```

- [ ] Style detail skeletons in `Pages/VenueDetail.razor.css`:

```css
.reviews { display: grid; gap: var(--space-3); margin-top: var(--space-4); }
```

##### Step 2 Verification Checklist
- [ ] No build errors
- [ ] Skeletons appear after ~200ms delay during loading on Home, Venues, Venue Detail
- [ ] Smooth transition from skeleton to real content with no flash on fast networks
- [ ] LoadingService state updates do not leak subscriptions

#### Step 2 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 3: Enhanced Animations & Micro-interactions
- [ ] Enhance global animation tokens and utilities in `wwwroot/css/app.css`:

```css
:root {
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --anim-stagger-step: 50ms;
}

.animate-lift { transition: transform 180ms var(--ease-spring), box-shadow 180ms var(--ease-smooth); }
.animate-lift:hover, .animate-lift:focus-visible { transform: translateY(-3px) scale(1.01); box-shadow: var(--shadow-lg); }
.animate-press:active { transform: scale(0.98); }
.animate-stagger > * { opacity: 0; transform: translateY(8px); animation: rise 320ms var(--ease-smooth) forwards; }
.animate-stagger > *:nth-child(n) { animation-delay: calc(var(--anim-stagger-step) * (var(--index, 1) - 1)); }

@keyframes rise {
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .animate-lift, .animate-press, .animate-stagger > * { transition: none; animation: none; }
}
```

- [ ] Apply hover/focus micro-interactions to venue cards in `Components/VenueCard.razor.css`:

```css
.card { composes: animate-lift from global; }
.card:hover .title, .card:focus-visible .title { color: var(--color-primary); }
```

- [ ] Add spring interactions to review cards in `Components/ReviewCard.razor.css`:

```css
.review-card { composes: animate-lift from global; }
.helpful-btn { composes: animate-press from global; }
```

- [ ] Implement smooth expand/collapse for search filters in `Components/SearchFilters.razor` and `Components/SearchFilters.razor.css`:

```razor
<button class="filter-toggle" @onclick="Toggle" aria-expanded="@_expanded">Filters</button>
<div class="filter-panel @( _expanded ? "open" : "" )">
  <!-- existing filter content -->
</div>

@code {
  private bool _expanded = true;
  private void Toggle() => _expanded = !_expanded;
}
```

```css
.filter-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 240ms var(--ease-smooth), opacity 200ms var(--ease-smooth);
  opacity: 0;
}
.filter-panel.open {
  max-height: 900px;
  opacity: 1;
}
.filter-toggle { composes: btn from global; }
```

- [ ] Add form focus micro-interactions in `Pages/BookVenue.razor.css`:

```css
input:focus-visible, select:focus-visible {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(246, 79, 156, 0.25);
  transform: translateY(-1px);
  transition: transform 160ms var(--ease-spring), box-shadow 160ms var(--ease-spring);
}
```

- [ ] Strengthen header hover/focus animation in `Layout/Header.razor.css`:

```css
.nav a { transition: background var(--transition-fast), transform 120ms var(--ease-spring); }
.nav a:hover, .nav a:focus-visible { transform: translateY(-2px); }
```

##### Step 3 Verification Checklist
- [ ] No build errors
- [ ] Hovering cards lifts them with smooth spring easing
- [ ] Search filters expand/collapse smoothly and respect prefers-reduced-motion
- [ ] Form fields animate focus without jitter
- [ ] Header links lift on hover/focus

#### Step 3 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 4: Modern CSS Features & Final Polish
- [ ] Add container queries and view transitions to `wwwroot/css/app.css`:

```css
@container venue-card (min-width: 400px) {
  .venue-card { grid-template-columns: 1.1fr 1fr; }
}

@media (prefers-reduced-motion: no-preference) {
  :root { view-transition-name: page; }
  ::view-transition-old(page), ::view-transition-new(page) {
    animation-duration: 220ms;
  }
}
```

- [ ] Add container query to `Components/VenueCard.razor.css`:

```css
.venue-card { display: grid; gap: var(--space-3); }
@container venue-card (max-width: 399px) {
  .venue-card { grid-template-columns: 1fr; }
}
```

- [ ] Add container query for filters in `Components/SearchFilters.razor.css`:

```css
@container sidebar (max-width: 520px) {
  .filters { grid-template-columns: 1fr; }
}
```

- [ ] Add responsive images and lazy loading in `Pages/VenueDetail.razor` image tags:

```razor
<img src="/images/venues/@venue!.Image" srcset="/images/venues/@venue!.Image 800w, /images/venues/@venue!.Image 1200w" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" alt="@venue!.Name" class="hero-img" />
```

- [ ] Enable view transitions shell in `App.razor`:

```razor
<CascadingValue Value="true" Name="UseViewTransitions">
    <Router AppAssembly="@typeof(App).Assembly">
        <Found Context="routeData">
            <RouteView RouteData="routeData" DefaultLayout="typeof(MainLayout)" />
        </Found>
        <NotFound>
            <LayoutView Layout="typeof(MainLayout)">
                <p>Sorry, there's nothing at this address.</p>
            </LayoutView>
        </NotFound>
    </Router>
</CascadingValue>
```

- [ ] Add glassmorphism to overlays in `wwwroot/css/app.css`:

```css
.glass {
  background: rgba(15, 15, 21, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-md);
}
```

##### Step 4 Verification Checklist
- [ ] No build errors
- [ ] VenueCard and SearchFilters adapt layout based on container width
- [ ] View transitions animate page navigations in supporting browsers with graceful fallback
- [ ] Venue images load with correct sizes and lazy loading works
- [ ] Glass overlays show frosted effect without readability loss

#### Step 4 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.
