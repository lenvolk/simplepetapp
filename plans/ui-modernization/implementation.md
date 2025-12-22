# UI Modernization - Clean and Modern Redesign

## Goal
Ship the four-phase UI modernization (tokens + accessibility, skeleton loading, animation polish, modern CSS features) for MyPetVenues while preserving the existing brand.

## Prerequisites
Make sure that the use is currently on the `feature/ui-modernization` branch before beginning implementation.
If not, move them to the correct branch. If the branch does not exist, create it from main.

### Step-by-Step Instructions

#### Step 1: Design Tokens & Accessibility Foundation
- [ ] Replace global styles with tokenized, a11y-friendly version in `MyPetVenues/wwwroot/css/app.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

:root {
    --color-pink-50:#fdf2f8;--color-pink-100:#fce7f3;--color-pink-200:#fbcfe8;--color-pink-300:#f9a8d4;--color-pink-400:#f472b6;--color-pink-500:#ec4899;--color-pink-600:#db2777;--color-pink-700:#be185d;
    --color-purple-500:#9333ea;--color-purple-600:#7e22ce;
    --color-green-400:#4ade80;--color-green-500:#22c55e;--color-green-600:#16a34a;
    --color-success:#22c55e;--color-warning:#f59e0b;--color-error:#ef4444;--color-info:#3b82f6;
    --color-gray-50:#f9fafb;--color-gray-100:#f3f4f6;--color-gray-200:#e5e7eb;--color-gray-300:#d1d5db;--color-gray-400:#9ca3af;--color-gray-500:#6b7280;--color-gray-600:#4b5563;--color-gray-700:#374151;--color-gray-800:#1f2937;--color-gray-900:#111827;
    --space-1:0.25rem;--space-2:0.5rem;--space-3:0.75rem;--space-4:1rem;--space-5:1.25rem;--space-6:1.5rem;--space-8:2rem;--space-10:2.5rem;--space-12:3rem;--space-16:4rem;
    --text-xs:.75rem;--text-sm:.875rem;--text-base:1rem;--text-lg:1.125rem;--text-xl:1.25rem;--text-2xl:1.5rem;--text-3xl:1.875rem;
    --radius-sm:.375rem;--radius-md:.5rem;--radius-lg:.75rem;--radius-xl:1rem;--radius-2xl:1.25rem;--radius-full:9999px;
    --shadow-xs:0 1px 2px rgba(0,0,0,.05);--shadow-sm:0 2px 6px rgba(0,0,0,.08);--shadow-md:0 6px 16px rgba(0,0,0,.12);--shadow-lg:0 12px 32px rgba(0,0,0,.18);--shadow-xl:0 20px 45px rgba(0,0,0,.24);
    --transition-fast:120ms;--transition-base:200ms;--transition-slow:320ms;--layout-max-width:1400px;
}

:root,.light-mode{--accent-primary:var(--color-pink-600);--accent-secondary:var(--color-purple-500);--accent-tertiary:var(--color-pink-500);--accent-glow:rgba(219,39,119,.28);--bg-primary:#fdf2f8;--bg-secondary:#fff;--bg-gradient:linear-gradient(135deg,#fdf2f8 0%,#fce7f3 50%,#f5d0fe 100%);--card-bg:#fff;--card-featured-bg:linear-gradient(135deg,rgba(219,39,119,.05),rgba(147,51,234,.05));--header-bg:rgba(255,255,255,.85);--footer-bg:#fdf2f8;--text-primary:var(--color-gray-800);--text-secondary:var(--color-gray-600);--text-muted:var(--color-gray-400);--border-color:rgba(219,39,119,.18);--shadow-color:rgba(219,39,119,.12);--shadow-hover:rgba(219,39,119,.22);--input-bg:#fff;--button-secondary-bg:#fdf2f8;--nav-hover-bg:rgba(219,39,119,.1);--tag-bg:#fdf2f8;--tag-hover-bg:#fce7f3}
.dark-mode{--accent-primary:var(--color-pink-500);--accent-secondary:var(--color-purple-600);--accent-tertiary:var(--color-pink-400);--accent-glow:rgba(236,72,153,.4);--bg-primary:#0f0f1a;--bg-secondary:#1a1a2e;--bg-gradient:linear-gradient(135deg,#0f0f1a 0%,#1a1a2e 50%,#16213e 100%);--card-bg:#1a1a2e;--card-featured-bg:linear-gradient(135deg,rgba(236,72,153,.12),rgba(168,85,247,.12));--header-bg:rgba(15,15,26,.9);--footer-bg:#0f0f1a;--text-primary:#f9fafb;--text-secondary:#d1d5db;--text-muted:#6b7280;--border-color:rgba(236,72,153,.22);--shadow-color:rgba(0,0,0,.32);--shadow-hover:rgba(236,72,153,.32);--input-bg:#16213e;--button-secondary-bg:#1a1a2e;--nav-hover-bg:rgba(236,72,153,.15);--tag-bg:rgba(236,72,153,.1);--tag-hover-bg:rgba(236,72,153,.2)}

*{margin:0;padding:0;box-sizing:border-box}html,body,#app{height:100%}html{scroll-behavior:smooth}body{font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;background:var(--bg-gradient);color:var(--text-primary)}#app{min-height:100%}
.app-container{background:var(--bg-gradient);color:var(--text-primary);min-height:100vh;transition:background var(--transition-base) ease,color var(--transition-base) ease}

h1,h2,h3,h4,h5,h6{font-weight:700;line-height:1.2;color:var(--text-primary)}h1{font-size:clamp(2rem,5vw,3.5rem)}h2{font-size:clamp(1.75rem,4vw,2.5rem)}h3{font-size:clamp(1.5rem,3vw,2rem)}h4{font-size:1.25rem}p{color:var(--text-secondary)}a{color:var(--accent-primary);text-decoration:none;transition:color var(--transition-base) ease}a:hover{color:var(--accent-secondary)}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 24px;font-size:var(--text-base);font-weight:600;border-radius:var(--radius-lg);border:none;cursor:pointer;transition:all var(--transition-base) ease;text-decoration:none}.btn-primary{background:linear-gradient(135deg,var(--accent-primary),var(--accent-secondary));color:#fff}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px var(--accent-glow)}.btn-secondary{background:var(--button-secondary-bg);color:var(--text-primary);border:2px solid var(--border-color)}.btn-secondary:hover{border-color:var(--accent-primary);color:var(--accent-primary)}.btn-outline{background:transparent;color:var(--accent-primary);border:2px solid var(--accent-primary)}.btn-outline:hover{background:var(--accent-primary);color:#fff}.btn-large{padding:16px 32px;font-size:1.1rem}

input,select,textarea{font-family:inherit}.valid.modified:not([type=checkbox]){outline:2px solid var(--color-success)}.invalid{outline:2px solid var(--color-error)}.validation-message{color:var(--color-error);font-size:.85rem;margin-top:4px}

.skip-to-content{position:absolute;left:-999px;top:8px;background:var(--accent-primary);color:#fff;padding:10px 16px;border-radius:var(--radius-md);z-index:1100;transition:left var(--transition-base) ease}.skip-to-content:focus{left:16px;outline:2px solid #fff}:focus-visible{outline:2px solid var(--accent-primary);outline-offset:2px}button:focus-visible,a:focus-visible{box-shadow:0 0 0 4px var(--accent-glow)}

#blazor-error-ui{color-scheme:light only;background:linear-gradient(135deg,var(--accent-primary),var(--accent-secondary));bottom:0;box-shadow:0 -4px 20px var(--shadow-color);display:none;left:0;padding:1rem 1.5rem;position:fixed;width:100%;z-index:1000;color:#fff}#blazor-error-ui .dismiss{cursor:pointer;position:absolute;right:1rem;top:50%;transform:translateY(-50%);font-size:1.25rem}.blazor-error-boundary{background:linear-gradient(135deg,#ef4444,#dc2626);padding:1.5rem;color:#fff;border-radius:var(--radius-lg);margin:20px}.blazor-error-boundary::after{content:"Oops! Something went wrong. 🐾"}

.loading-progress{position:relative;display:block;width:10rem;height:10rem;margin:25vh auto 1rem auto}.loading-progress circle{fill:none;stroke:var(--border-color);stroke-width:.5rem;transform-origin:50% 50%;transform:rotate(-90deg)}.loading-progress circle:last-child{stroke:var(--accent-primary);stroke-dasharray:calc(3.141*var(--blazor-load-percentage,0%)*0.8),500%;transition:stroke-dasharray .1s ease-in-out}.loading-progress-text{position:absolute;text-align:center;font-weight:700;font-size:1.25rem;color:var(--accent-primary);inset:calc(25vh + 4rem) 0 auto 0}.loading-progress-text:after{content:var(--blazor-load-percentage-text,"🐾 Loading...")}

.text-gradient{background:linear-gradient(135deg,var(--accent-primary),var(--accent-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.mt-1{margin-top:var(--space-2)}.mt-2{margin-top:var(--space-4)}.mt-3{margin-top:var(--space-6)}.mt-4{margin-top:var(--space-8)}.mb-1{margin-bottom:var(--space-2)}.mb-2{margin-bottom:var(--space-4)}.mb-3{margin-bottom:var(--space-6)}.mb-4{margin-bottom:var(--space-8)}

@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}.animate-fade-in{animation:fadeIn .5s ease-out forwards}.animate-pulse{animation:pulse 2s ease-in-out infinite}.animate-float{animation:float 3s ease-in-out infinite}

::-webkit-scrollbar{width:10px}::-webkit-scrollbar-track{background:var(--bg-primary)}::-webkit-scrollbar-thumb{background:linear-gradient(135deg,var(--accent-primary),var(--accent-secondary));border-radius:5px}::-webkit-scrollbar-thumb:hover{background:var(--accent-primary)}::selection{background:var(--accent-primary);color:#fff}

code{color:var(--accent-primary);background:var(--tag-bg);padding:2px 6px;border-radius:4px;font-family:'Fira Code',monospace}

@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
```

- [ ] Update header accessibility and skip link in `MyPetVenues/Layout/Header.razor`:

```razor
@using MyPetVenues.Services
@inject NavigationManager Navigation
@inject IThemeService ThemeService
@implements IDisposable

<a class="skip-to-content" href="#main-content">Skip to main content</a>

<header class="site-header" role="banner" @onkeydown:document="HandleGlobalKeydown">
    <div class="header-container">
        <a href="/" class="logo" @onclick:preventDefault @onclick="NavigateHome">
            <span class="logo-icon" aria-hidden="true">🐾</span>
            <span class="logo-text">MyPetVenues</span>
        </a>
        <button class="mobile-menu-btn" aria-label="Toggle navigation menu" aria-expanded="@_isMobileMenuOpen" aria-controls="primary-nav" @onclick="ToggleMobileMenu">
            @_isMobileMenuOpen ? "✕" : "☰"
        </button>
        <nav id="primary-nav" class="main-nav @(_isMobileMenuOpen ? "open" : "")" role="navigation" aria-label="Primary">
            <a href="/" class="nav-link @(IsActive("/") ? "active" : "")" aria-current="@(IsActive("/") ? "page" : null)" @onclick:preventDefault @onclick="NavigateHome"><span aria-hidden="true">🏠</span> Home</a>
            <a href="/venues" class="nav-link @(IsActive("/venues") ? "active" : "")" aria-current="@(IsActive("/venues") ? "page" : null)" @onclick:preventDefault @onclick="NavigateVenues"><span aria-hidden="true">📍</span> Venues</a>
            <a href="/booking" class="nav-link @(IsActive("/booking") ? "active" : "")" aria-current="@(IsActive("/booking") ? "page" : null)" @onclick:preventDefault @onclick="NavigateBooking"><span aria-hidden="true">📅</span> Book Now</a>
            <a href="/profile" class="nav-link @(IsActive("/profile") ? "active" : "")" aria-current="@(IsActive("/profile") ? "page" : null)" @onclick:preventDefault @onclick="NavigateProfile"><span aria-hidden="true">👤</span> Profile</a>
        </nav>
        <div class="header-actions">
            <button class="theme-toggle" aria-label="Toggle color theme" @onclick="ToggleTheme">
                @(ThemeService.IsDarkMode ? "☀️" : "🌙")
            </button>
        </div>
    </div>
</header>

@code {
    private bool _isMobileMenuOpen;

    protected override void OnInitialized()
    {
        ThemeService.OnThemeChanged += StateHasChanged;
        Navigation.LocationChanged += OnLocationChanged;
    }

    private void OnLocationChanged(object? sender, Microsoft.AspNetCore.Components.Routing.LocationChangedEventArgs e) => StateHasChanged();
    private void ToggleMobileMenu() => _isMobileMenuOpen = !_isMobileMenuOpen;
    private void NavigateHome() => Navigate("/");
    private void NavigateVenues() => Navigate("/venues");
    private void NavigateBooking() => Navigate("/booking");
    private void NavigateProfile() => Navigate("/profile");
    private void Navigate(string path){ _isMobileMenuOpen = false; Navigation.NavigateTo(path);}    
    private bool IsActive(string path){ var currentPath = new Uri(Navigation.Uri).AbsolutePath; return path == "/" ? currentPath=="/" || currentPath=="" : currentPath.StartsWith(path,StringComparison.OrdinalIgnoreCase);}    
    private void ToggleTheme() => ThemeService.ToggleTheme();

    private void HandleGlobalKeydown(KeyboardEventArgs args)
    {
        if (args.Key == "Escape" && _isMobileMenuOpen){ _isMobileMenuOpen = false; StateHasChanged(); }
        if (args.CtrlKey && (args.Key?.Equals("k", StringComparison.OrdinalIgnoreCase) ?? false))
        { args.PreventDefault(); Navigation.NavigateTo("/venues?focus=search"); }
    }

    public void Dispose()
    {
        ThemeService.OnThemeChanged -= StateHasChanged;
        Navigation.LocationChanged -= OnLocationChanged;
    }
}
```

- [ ] Sync header styling with tokens in `MyPetVenues/Layout/Header.razor.css`:

```css
.site-header{background:var(--header-bg);backdrop-filter:blur(20px);border-bottom:1px solid var(--border-color);position:sticky;top:0;z-index:1100;transition:all var(--transition-slow) ease}
.header-container{max-width:var(--layout-max-width);margin:0 auto;padding:var(--space-4) var(--space-6);display:flex;align-items:center;justify-content:space-between;gap:var(--space-4)}
.logo{display:flex;align-items:center;gap:var(--space-2);text-decoration:none;transition:transform var(--transition-base) ease}
.logo:hover{transform:scale(1.02)}
.logo-icon{font-size:2rem;animation:bounce 2s infinite}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.logo-text{font-size:1.5rem;font-weight:800;background:linear-gradient(135deg,var(--accent-primary),var(--accent-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.main-nav{display:flex;align-items:center;gap:var(--space-2)}
.nav-link{display:inline-flex;align-items:center;gap:var(--space-1);padding:10px 18px;text-decoration:none;color:var(--text-secondary);font-weight:500;border-radius:var(--radius-lg);transition:all var(--transition-base) ease}
.nav-link:hover{color:var(--accent-primary);background:var(--nav-hover-bg)}
.nav-link.active{color:#fff;background:linear-gradient(135deg,var(--accent-primary),var(--accent-secondary));box-shadow:0 4px 15px var(--accent-glow)}
.header-actions{display:flex;align-items:center;gap:var(--space-2)}
.theme-toggle{background:var(--button-secondary-bg);border:1px solid var(--border-color);width:44px;height:44px;border-radius:50%;cursor:pointer;font-size:1.25rem;display:flex;align-items:center;justify-content:center;transition:all var(--transition-base) ease}
.theme-toggle:hover{transform:rotate(20deg) scale(1.08);background:var(--accent-primary);border-color:var(--accent-primary);color:#fff}
.mobile-menu-btn{display:none;background:var(--button-secondary-bg);border:1px solid var(--border-color);width:44px;height:44px;border-radius:var(--radius-lg);cursor:pointer;font-size:1.5rem;align-items:center;justify-content:center;color:var(--text-primary);transition:all var(--transition-base) ease}
.mobile-menu-btn:hover{background:var(--nav-hover-bg);border-color:var(--accent-primary)}
@media(max-width:900px){.mobile-menu-btn{display:flex}.main-nav{position:fixed;top:80px;left:0;right:0;background:var(--header-bg);backdrop-filter:blur(20px);flex-direction:column;padding:var(--space-4);gap:var(--space-2);border-bottom:1px solid var(--border-color);transform:translateY(-120%);opacity:0;transition:all var(--transition-slow) ease;z-index:1090}.main-nav.open{transform:translateY(0);opacity:1}.nav-link{width:100%;justify-content:center;padding:14px}}
```

- [ ] Add footer semantics and spacing in `MyPetVenues/Layout/Footer.razor` and `MyPetVenues/Layout/Footer.razor.css`:

```razor
<footer class="site-footer" role="contentinfo">
    <div class="footer-container">
        <div class="footer-main">
            <div class="footer-brand">
                <div class="footer-logo">
                    <span class="logo-icon" aria-hidden="true">🐾</span>
                    <span class="logo-text">MyPetVenues</span>
                </div>
                <p class="footer-tagline">Discover pet-friendly places for you and your furry friends! 🐕🐱</p>
                <div class="social-links" aria-label="Social links">
                    <a href="#" class="social-link" aria-label="Facebook">📘</a>
                    <a href="#" class="social-link" aria-label="Twitter">🐦</a>
                    <a href="#" class="social-link" aria-label="Instagram">📸</a>
                    <a href="#" class="social-link" aria-label="TikTok">🎵</a>
                </div>
            </div>
            <div class="footer-links" aria-label="Footer navigation">
                <div class="footer-column"><h4>Explore</h4><a href="/venues">🌳 Parks</a><a href="/venues">☕ Cafés</a><a href="/venues">🍽️ Restaurants</a><a href="/venues">🏨 Hotels</a></div>
                <div class="footer-column"><h4>Resources</h4><a href="#">📖 Pet Care Tips</a><a href="#">📝 Blog</a><a href="#">❓ FAQ</a><a href="#">📞 Contact Us</a></div>
                <div class="footer-column"><h4>Company</h4><a href="#">👥 About Us</a><a href="#">💼 Careers</a><a href="#">🤝 Partners</a><a href="#">📰 Press</a></div>
                <div class="footer-column"><h4>Legal</h4><a href="#">📜 Terms of Service</a><a href="#">🔒 Privacy Policy</a><a href="#">🍪 Cookie Policy</a></div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="footer-newsletter" aria-label="Newsletter signup">
                <span>📬 Stay updated with pet-friendly spots!</span>
                <form class="newsletter-form" novalidate>
                    <label class="sr-only" for="newsletter-email">Email address</label>
                    <input id="newsletter-email" type="email" placeholder="Enter your email" aria-required="true" />
                    <button type="button">Subscribe</button>
                </form>
            </div>
            <div class="footer-copyright">
                <p>© @DateTime.Now.Year MyPetVenues. Made with ❤️ for pet lovers everywhere.</p>
                <p class="footer-pets" aria-hidden="true">🐕 🐱 🐰 🐦 🐹</p>
            </div>
        </div>
    </div>
</footer>
```

```css
.site-footer{background:var(--footer-bg);border-top:1px solid var(--border-color);padding:var(--space-10) 0 0 0;margin-top:var(--space-12)}
.footer-container{max-width:var(--layout-max-width);margin:0 auto;padding:0 var(--space-6)}
.footer-main{display:grid;grid-template-columns:1.5fr 2fr;gap:var(--space-10);padding-bottom:var(--space-6);border-bottom:1px solid var(--border-color)}
.footer-brand{display:flex;flex-direction:column;gap:var(--space-4)}
.footer-logo{display:flex;align-items:center;gap:var(--space-2)}
.footer-logo .logo-icon{font-size:2rem}.footer-logo .logo-text{font-size:1.5rem;font-weight:800;background:linear-gradient(135deg,var(--accent-primary),var(--accent-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.footer-tagline{color:var(--text-secondary);font-size:1rem;line-height:1.6;margin:0}
.social-links{display:flex;gap:var(--space-2)}
.social-link{display:flex;align-items:center;justify-content:center;width:44px;height:44px;background:var(--card-bg);border:1px solid var(--border-color);border-radius:var(--radius-lg);font-size:1.25rem;text-decoration:none;transition:all var(--transition-base) ease}
.social-link:hover{transform:translateY(-3px);background:var(--accent-primary);border-color:var(--accent-primary);color:#fff}
.footer-links{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-6)}
.footer-column h4{color:var(--text-primary);font-size:1rem;font-weight:700;margin:0 0 var(--space-3) 0}
.footer-column a{display:block;color:var(--text-secondary);text-decoration:none;padding:6px 0;font-size:.9rem;transition:all var(--transition-base) ease}
.footer-column a:hover{color:var(--accent-primary);transform:translateX(4px)}
.footer-bottom{padding:var(--space-6) 0;display:flex;flex-direction:column;gap:var(--space-6);align-items:center}
.footer-newsletter{display:flex;align-items:center;gap:var(--space-4);flex-wrap:wrap;justify-content:center}
.footer-newsletter span{color:var(--text-secondary);font-weight:500}
.newsletter-form{display:flex;gap:var(--space-2)}
.newsletter-form input{padding:12px 20px;border:2px solid var(--border-color);border-radius:var(--radius-lg);background:var(--input-bg);color:var(--text-primary);font-size:.95rem;min-width:250px;transition:all var(--transition-base) ease}
.newsletter-form input:focus{outline:none;border-color:var(--accent-primary);box-shadow:0 0 0 4px var(--accent-glow)}
.newsletter-form button{padding:12px 24px;background:linear-gradient(135deg,var(--accent-primary),var(--accent-secondary));color:#fff;border:none;border-radius:var(--radius-lg);font-weight:600;cursor:pointer;transition:all var(--transition-base) ease}
.newsletter-form button:hover{transform:translateY(-2px);box-shadow:0 4px 20px var(--accent-glow)}
.footer-copyright{text-align:center}
.footer-copyright p{color:var(--text-muted);font-size:.9rem;margin:0}
.footer-pets{margin-top:10px!important;font-size:1.5rem!important;letter-spacing:8px}
@media(max-width:1000px){.footer-main{grid-template-columns:1fr;gap:var(--space-8)}.footer-links{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.footer-links{grid-template-columns:1fr;text-align:center}.footer-column a:hover{transform:none}.social-links{justify-content:center}.footer-brand{align-items:center;text-align:center}.newsletter-form{flex-direction:column;width:100%}.newsletter-form input{min-width:auto;width:100%}.newsletter-form button{width:100%}}
```

- [ ] Add main landmark target in `MyPetVenues/Layout/MainLayout.razor` and spacing in `MyPetVenues/Layout/MainLayout.razor.css`:

```razor
@inherits LayoutComponentBase
@using MyPetVenues.Services
@inject IThemeService ThemeService
@implements IDisposable

<div class="app-container @(ThemeService.IsDarkMode ? "dark-mode" : "light-mode")">
    <Header />
    <main id="main-content" class="main-content" role="main" tabindex="-1">
        @Body
    </main>
    <Footer />
</div>

@code {
    protected override void OnInitialized() => ThemeService.OnThemeChanged += OnThemeChanged;
    private void OnThemeChanged() => StateHasChanged();
    public void Dispose() => ThemeService.OnThemeChanged -= OnThemeChanged;
}
```

```css
.app-container{min-height:100vh;display:flex;flex-direction:column}
.main-content{flex:1;max-width:var(--layout-max-width);margin:0 auto;padding:var(--space-6);width:100%;box-sizing:border-box}
@media(max-width:768px){.main-content{padding:var(--space-4)}}
```

##### Step 1 Verification Checklist
- [ ] dotnet build MyPetVenues/MyPetVenues.csproj
- [ ] Skip link focusable and jumps to main content
- [ ] Visible focus outlines on nav and theme toggle; Escape closes mobile menu
- [ ] Axe/Lighthouse a11y passes landmarks/focus tests

#### Step 1 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 2: Loading Service & Skeleton Screens
- [ ] Add loading state service in `MyPetVenues/Services/LoadingService.cs`:

```csharp
using System.Collections.Concurrent;

namespace MyPetVenues.Services;

public sealed class LoadingService
{
    private readonly ConcurrentDictionary<string, bool> _states = new();
    public event Action<string, bool>? OnLoadingChanged;

    public bool IsLoading(string key) => _states.TryGetValue(key, out var value) && value;

    public async Task SetLoadingAsync(string key, bool isLoading, int delayMs = 0)
    {
        if (delayMs > 0)
        {
            await Task.Delay(delayMs);
        }
        _states[key] = isLoading;
        OnLoadingChanged?.Invoke(key, isLoading);
    }
}
```

- [ ] Register service in `MyPetVenues/Program.cs`:

```csharp
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MyPetVenues;
using MyPetVenues.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

builder.Services.AddSingleton<IThemeService, ThemeService>();
builder.Services.AddSingleton<IVenueService, MockVenueService>();
builder.Services.AddSingleton<IBookingService, MockBookingService>();
builder.Services.AddScoped<IUserService, MockUserService>();
builder.Services.AddSingleton<LoadingService>();

await builder.Build().RunAsync();
```

- [ ] Add venue skeleton component in `MyPetVenues/Components/VenueCardSkeleton.razor` and styles `VenueCardSkeleton.razor.css`:

```razor
<div class="venue-card skeleton-card">
    <div class="skeleton featured-badge"></div>
    <div class="venue-image skeleton"></div>
    <div class="venue-content">
        <div class="skeleton skeleton-line lg"></div>
        <div class="skeleton skeleton-line sm"></div>
        <div class="skeleton skeleton-line md"></div>
        <div class="skeleton skeleton-badges">
            <span class="skeleton pill"></span>
            <span class="skeleton pill"></span>
            <span class="skeleton pill"></span>
        </div>
    </div>
</div>
```

```css
.skeleton-card{background:var(--card-bg);border-radius:20px;overflow:hidden;border:1px solid var(--border-color);box-shadow:0 4px 20px var(--shadow-color);position:relative}
.skeleton{background:linear-gradient(90deg,var(--tag-bg) 0%,var(--border-color) 50%,var(--tag-bg) 100%);background-size:200% 100%;animation:shimmer 1.5s ease-in-out infinite;border-radius:12px}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
.featured-badge{position:absolute;top:16px;left:16px;width:120px;height:24px;border-radius:999px}
.venue-image{height:200px}
.venue-content{padding:20px;display:flex;flex-direction:column;gap:12px}
.skeleton-line{height:14px}.skeleton-line.sm{width:40%}.skeleton-line.md{width:65%}.skeleton-line.lg{width:80%;height:18px}
.skeleton-badges{display:flex;gap:8px}.pill{width:60px;height:24px;border-radius:999px}
```

- [ ] Add review skeleton component in `MyPetVenues/Components/ReviewCardSkeleton.razor` and styles `ReviewCardSkeleton.razor.css`:

```razor
<div class="review-card skeleton-wrapper">
    <div class="review-header">
        <div class="reviewer-info">
            <div class="skeleton avatar"></div>
            <div class="reviewer-details">
                <div class="skeleton skeleton-line sm"></div>
                <div class="skeleton skeleton-line xs"></div>
            </div>
        </div>
        <div class="skeleton pill sm"></div>
    </div>
    <div class="review-rating skeleton-line md skeleton"></div>
    <div class="review-comment">
        <div class="skeleton skeleton-line lg"></div>
        <div class="skeleton skeleton-line md"></div>
        <div class="skeleton skeleton-line sm"></div>
    </div>
    <div class="review-photos">
        <div class="skeleton square"></div>
        <div class="skeleton square"></div>
        <div class="skeleton square"></div>
    </div>
    <div class="review-footer">
        <div class="skeleton pill"></div>
    </div>
</div>
```

```css
.skeleton-wrapper{background:var(--card-bg);border-radius:16px;padding:20px;border:1px solid var(--border-color)}
.skeleton{background:linear-gradient(90deg,var(--tag-bg) 0%,var(--border-color) 50%,var(--tag-bg) 100%);background-size:200% 100%;animation:shimmer 1.5s ease-in-out infinite;border-radius:10px}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
.avatar{width:48px;height:48px;border-radius:50%}
.skeleton-line{height:12px;width:70%}.skeleton-line.xs{width:40%;height:10px}.skeleton-line.sm{width:55%;height:12px}.skeleton-line.md{width:70%;height:14px}.skeleton-line.lg{width:90%;height:16px}
.pill{width:110px;height:28px;border-radius:999px}.pill.sm{width:80px}
.square{width:80px;height:80px;border-radius:12px}
.review-header,.review-footer{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:12px}
.reviewer-info{display:flex;align-items:center;gap:12px}.reviewer-details{display:flex;flex-direction:column;gap:6px}
.review-comment{display:flex;flex-direction:column;gap:8px;margin:12px 0}
.review-photos{display:flex;gap:8px;margin:12px 0}
```

- [ ] Home page: show skeletons during featured load in `MyPetVenues/Pages/Home.razor` and add spacing helper in `Home.razor.css`:

```razor
@page "/"
@using MyPetVenues.Models
@using MyPetVenues.Services
@using MyPetVenues.Components
@inject IVenueService VenueService
@inject NavigationManager Navigation
@inject LoadingService LoadingService
@implements IDisposable

<PageTitle>MyPetVenues - Find Pet-Friendly Places 🐾</PageTitle>

<!-- existing hero/sections unchanged until Featured section -->
<section class="featured-section">
    <div class="section-header">
        <h2>Featured Venues ⭐</h2>
        <p>Hand-picked favorites from our community</p>
    </div>
    @if (LoadingService.IsLoading("home-featured"))
    {
        <div class="venues-grid">
            @for (var i = 0; i < 6; i++)
            {
                <VenueCardSkeleton />
            }
        </div>
    }
    else
    {
        <div class="venues-grid">
            @foreach (var venue in _featuredVenues ?? Enumerable.Empty<Venue>())
            {
                <VenueCard Venue="@venue" IsFeatured="true" OnClick="() => NavigateToVenue(venue.Id)" />
            }
        </div>
        <div class="section-cta">
            <button class="btn btn-secondary" @onclick="NavigateToVenues">View All Venues →</button>
        </div>
    }
</section>

@code {
    private List<Venue>? _featuredVenues;
    private readonly List<VenueCategory> _venueCategories = new()
    {
        new("🌳","Parks","Off-leash areas & trails",VenueType.Park),
        new("☕","Cafés","Coffee with your pet",VenueType.Cafe),
        new("🍽️","Restaurants","Pet-friendly dining",VenueType.Restaurant),
        new("🏨","Hotels","Pet-friendly stays",VenueType.Hotel),
        new("🛍️","Stores","Shop with your pet",VenueType.Store),
        new("🏠","Day Care","Safe & fun pet care",VenueType.DayCare)
    };

    protected override async Task OnInitializedAsync()
    {
        LoadingService.OnLoadingChanged += OnLoadingChanged;
        await LoadingService.SetLoadingAsync("home-featured", true, delayMs: 200);
        _featuredVenues = await VenueService.GetFeaturedVenuesAsync();
        await LoadingService.SetLoadingAsync("home-featured", false);
    }

    private void OnLoadingChanged(string key, bool isLoading)
    {
        if (key == "home-featured")
        {
            InvokeAsync(StateHasChanged);
        }
    }

    private void NavigateToVenues() => Navigation.NavigateTo("/venues");
    private void NavigateToBooking() => Navigation.NavigateTo("/booking");
    private void NavigateToProfile() => Navigation.NavigateTo("/profile");
    private void NavigateToVenue(int venueId) => Navigation.NavigateTo($"/venues/{venueId}");
    private void NavigateToCategory(VenueType type) => Navigation.NavigateTo($"/venues?type={type}");

    private void HandleSearch((string? SearchTerm, VenueType? VenueType, PetType? PetType) filters)
    {
        var queryParams = new List<string>();
        if (!string.IsNullOrWhiteSpace(filters.SearchTerm)) queryParams.Add($"search={Uri.EscapeDataString(filters.SearchTerm)}");
        if (filters.VenueType.HasValue) queryParams.Add($"type={filters.VenueType}");
        if (filters.PetType.HasValue) queryParams.Add($"pet={filters.PetType}");
        var query = queryParams.Any() ? "?" + string.Join("&", queryParams) : "";
        Navigation.NavigateTo($"/venues{query}");
    }

    public void Dispose() => LoadingService.OnLoadingChanged -= OnLoadingChanged;
    private record VenueCategory(string Emoji, string Name, string Description, VenueType Type);
}
```

```css
.venues-grid .skeleton-card{min-height:320px}
```

- [ ] Venues page: replace emoji loader with skeletons in `MyPetVenues/Pages/Venues.razor` plus spacing in `Venues.razor.css`:

```razor
@page "/venues"
@using MyPetVenues.Models
@using MyPetVenues.Services
@using MyPetVenues.Components
@inject IVenueService VenueService
@inject NavigationManager Navigation
@inject LoadingService LoadingService
@implements IDisposable

<PageTitle>Explore Venues - MyPetVenues 🐾</PageTitle>

<div class="venues-page">
    <header class="page-header">
        <h1>Explore Pet-Friendly Venues 🔍</h1>
        <p>Discover amazing places to visit with your furry friends</p>
    </header>

    <SearchFilters SearchTerm="@_searchTerm" SelectedVenueType="@_selectedVenueType" SelectedPetType="@_selectedPetType" OnSearch="HandleSearch" />

    @if (LoadingService.IsLoading("venues-list"))
    {
        <div class="venues-grid">
            @for (var i = 0; i < 6; i++) { <VenueCardSkeleton /> }
        </div>
    }
    else if (_venues is null || !_venues.Any())
    {
        <div class="empty-state">
            <span class="empty-emoji">🔍</span>
            <h3>No venues found</h3>
            <p>Try adjusting your search filters or explore all venues</p>
            <button class="btn btn-primary" @onclick="ClearFilters">Clear Filters</button>
        </div>
    }
    else
    {
        <div class="results-info">
            <span>🎯 Found <strong>@_venues.Count</strong> pet-friendly venues</span>
            @if (_hasActiveFilters)
            {
                <button class="clear-filters-btn" @onclick="ClearFilters">✕ Clear filters</button>
            }
        </div>
        <div class="venues-grid">
            @foreach (var venue in _venues)
            {
                <VenueCard Venue="@venue" IsFeatured="@venue.IsFeatured" OnClick="() => NavigateToVenue(venue.Id)" />
            }
        </div>
    }
</div>

@code {
    [SupplyParameterFromQuery(Name = "search")] public string? SearchQuery { get; set; }
    [SupplyParameterFromQuery(Name = "type")] public string? TypeQuery { get; set; }
    [SupplyParameterFromQuery(Name = "pet")] public string? PetQuery { get; set; }

    private List<Venue>? _venues;
    private string? _searchTerm;
    private VenueType? _selectedVenueType;
    private PetType? _selectedPetType;
    private bool _hasActiveFilters => !string.IsNullOrWhiteSpace(_searchTerm) || _selectedVenueType.HasValue || _selectedPetType.HasValue;

    protected override async Task OnInitializedAsync()
    {
        LoadingService.OnLoadingChanged += OnLoadingChanged;
        ParseQueryParameters();
        await LoadVenues();
    }

    protected override async Task OnParametersSetAsync()
    {
        ParseQueryParameters();
        await LoadVenues();
    }

    private void ParseQueryParameters()
    {
        _searchTerm = SearchQuery;
        _selectedVenueType = Enum.TryParse<VenueType>(TypeQuery, true, out var vt) ? vt : null;
        _selectedPetType = Enum.TryParse<PetType>(PetQuery, true, out var pt) ? pt : null;
    }

    private async Task LoadVenues()
    {
        await LoadingService.SetLoadingAsync("venues-list", true, delayMs: 200);
        _venues = await VenueService.SearchVenuesAsync(_searchTerm, _selectedVenueType, _selectedPetType);
        await LoadingService.SetLoadingAsync("venues-list", false);
    }

    private async Task HandleSearch((string? SearchTerm, VenueType? VenueType, PetType? PetType) filters)
    {
        _searchTerm = filters.SearchTerm;
        _selectedVenueType = filters.VenueType;
        _selectedPetType = filters.PetType;
        UpdateUrl();
        await LoadVenues();
    }

    private void UpdateUrl()
    {
        var queryParams = new List<string>();
        if (!string.IsNullOrWhiteSpace(_searchTerm)) queryParams.Add($"search={Uri.EscapeDataString(_searchTerm)}");
        if (_selectedVenueType.HasValue) queryParams.Add($"type={_selectedVenueType}");
        if (_selectedPetType.HasValue) queryParams.Add($"pet={_selectedPetType}");
        var query = queryParams.Any() ? "?" + string.Join("&", queryParams) : "";
        Navigation.NavigateTo($"/venues{query}", replace: true);
    }

    private async Task ClearFilters()
    {
        _searchTerm = null; _selectedVenueType = null; _selectedPetType = null;
        Navigation.NavigateTo("/venues", replace: true);
        await LoadVenues();
    }

    private void NavigateToVenue(int venueId) => Navigation.NavigateTo($"/venues/{venueId}");

    private void OnLoadingChanged(string key, bool _) { if (key == "venues-list") InvokeAsync(StateHasChanged); }
    public void Dispose() => LoadingService.OnLoadingChanged -= OnLoadingChanged;
}
```

```css
.venues-grid .skeleton-card{min-height:320px}
```

- [ ] Venue detail: skeletons while loading in `MyPetVenues/Pages/VenueDetail.razor` and helper in `VenueDetail.razor.css`:

```razor
@page "/venues/{VenueId:int}"
@using MyPetVenues.Models
@using MyPetVenues.Services
@using MyPetVenues.Components
@inject IVenueService VenueService
@inject IUserService UserService
@inject NavigationManager Navigation
@inject LoadingService LoadingService
@implements IDisposable

<PageTitle>@(_venue?.Name ?? "Venue Details") - MyPetVenues 🐾</PageTitle>

@if (LoadingService.IsLoading("venue-detail"))
{
    <div class="venue-detail-page">
        <div class="venues-grid">
            @for (var i = 0; i < 2; i++) { <VenueCardSkeleton /> }
        </div>
        <div class="reviews-list" style="margin-top:24px;">
            @for (var i = 0; i < 3; i++) { <ReviewCardSkeleton /> }
        </div>
    </div>
}
else if (_venue is null)
{
    <div class="not-found-state">
        <span class="not-found-emoji">😿</span>
        <h2>Venue Not Found</h2>
        <p>Sorry, we couldn't find the venue you're looking for.</p>
        <button class="btn btn-primary" @onclick="NavigateToVenues">Browse All Venues</button>
    </div>
}
else
{
    <!-- existing content stays unchanged -->
}

@code {
    [Parameter] public int VenueId { get; set; }
    private Venue? _venue; private List<Review>? _reviews; private bool _isFavorite;

    private void NavigateToVenues() => Navigation.NavigateTo("/venues");

    protected override async Task OnInitializedAsync(){ LoadingService.OnLoadingChanged += OnLoadingChanged; await LoadVenueData(); }
    protected override async Task OnParametersSetAsync(){ await LoadVenueData(); }

    private async Task LoadVenueData()
    {
        await LoadingService.SetLoadingAsync("venue-detail", true, delayMs: 200);
        _venue = await VenueService.GetVenueByIdAsync(VenueId);
        if (_venue is not null)
        {
            _reviews = await VenueService.GetVenueReviewsAsync(VenueId);
            var user = await UserService.GetCurrentUserAsync();
            _isFavorite = user?.FavoriteVenueIds.Contains(VenueId) ?? false;
        }
        await LoadingService.SetLoadingAsync("venue-detail", false);
    }

    private async Task ToggleFavorite(){ await UserService.ToggleFavoriteAsync(VenueId); _isFavorite = !_isFavorite; }
    private void BookVenue() => Navigation.NavigateTo($"/booking?venue={VenueId}");
    private void OnLoadingChanged(string key, bool _) { if (key == "venue-detail") InvokeAsync(StateHasChanged); }
    public void Dispose() => LoadingService.OnLoadingChanged -= OnLoadingChanged;
}
```

```css
.reviews-list .skeleton-wrapper{width:100%}
```

##### Step 2 Verification Checklist
- [ ] dotnet build MyPetVenues/MyPetVenues.csproj
- [ ] Home shows skeletons for featured list (delay ~200ms) then renders data
- [ ] Venues page shows 6 skeleton cards during load; no emoji spinner remains
- [ ] Venue detail shows skeletons then renders details and reviews
- [ ] LoadingService events fire without errors and UI updates when loading flips

#### Step 2 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 3: Animations & Micro-interactions
- [ ] Add animation utilities in `MyPetVenues/wwwroot/css/app.css` (append near animations section):

```css
:root { --ease-spring: cubic-bezier(0.34,1.56,0.64,1); --ease-smooth: cubic-bezier(0.4,0,0.2,1); --stagger-step: 50ms; }

.lift-hover{transition:transform var(--transition-slow) var(--ease-spring),box-shadow var(--transition-slow) var(--ease-spring)}
.lift-hover:hover{transform:translateY(-6px) scale(1.01);box-shadow:0 16px 38px var(--shadow-hover)}
.pressable:active{transform:scale(.98)}
.stagger > *{animation:fadeIn .4s var(--ease-smooth) backwards}
.stagger > *:nth-child(1){animation-delay:calc(var(--stagger-step)*1)}
.stagger > *:nth-child(2){animation-delay:calc(var(--stagger-step)*2)}
.stagger > *:nth-child(3){animation-delay:calc(var(--stagger-step)*3)}
.stagger > *:nth-child(4){animation-delay:calc(var(--stagger-step)*4)}

@media (prefers-reduced-motion: reduce){.lift-hover,.pressable,.stagger > *{transition:none!important;animation:none!important;transform:none!important}}
```

- [ ] Apply hover/focus micro-interactions to cards in `MyPetVenues/Components/VenueCard.razor.css` and `ReviewCard.razor.css` by appending:

```css
.venue-card{transition:transform var(--transition-slow) var(--ease-spring),box-shadow var(--transition-slow) var(--ease-spring)}
.venue-card:focus-visible{outline:2px solid var(--accent-primary);outline-offset:2px}
.review-card{transition:transform var(--transition-slow) var(--ease-spring),box-shadow var(--transition-slow) var(--ease-spring)}
.review-card:hover{transform:translateY(-4px);box-shadow:0 10px 28px var(--shadow-hover)}
.helpful-btn{transition:transform var(--transition-fast) var(--ease-spring),background var(--transition-fast)}
.helpful-btn:active{transform:scale(.97)}
```

- [ ] Smooth expand/collapse for filters in `MyPetVenues/Components/SearchFilters.razor.css` (append):

```css
.filter-panel{transition:max-height var(--transition-slow) var(--ease-smooth),opacity var(--transition-base) var(--ease-smooth)}
.filter-panel.collapsing{overflow:hidden;max-height:0;opacity:0}
```

##### Step 3 Verification Checklist
- [ ] Hovering cards shows lift/soft shadow without jank (60fps in DevTools)
- [ ] Buttons show press feedback; reduced-motion disables extra motion
- [ ] Filters expand/collapse smoothly

#### Step 3 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 4: Modern CSS Features (Container Queries & View Transitions)
- [ ] Enable view transitions in `MyPetVenues/App.razor` (wrap Router):

```razor
<CascadingAuthenticationState>
    <Router AppAssembly="typeof(App).Assembly">
        <Found Context="routeData">
            <RouteView RouteData="routeData" DefaultLayout="typeof(Layout.MainLayout)" />
            <FocusOnNavigate RouteData="routeData" Selector="h1" />
        </Found>
        <NotFound>
            <LayoutView Layout="typeof(Layout.MainLayout)">
                <p class="text-center">Sorry, there's nothing here.</p>
            </LayoutView>
        </NotFound>
    </Router>
</CascadingAuthenticationState>
```

- [ ] Add view-transition styles in `MyPetVenues/wwwroot/css/app.css` (append near animations):

```css
@view-transition { navigation: auto; }
::view-transition-old(root),::view-transition-new(root){animation-duration:.35s;animation-timing-function:var(--ease-smooth)}
```

- [ ] Container queries for VenueCard in `MyPetVenues/Components/VenueCard.razor.css` (append):

```css
.venue-card{container-type:inline-size;}
@container (min-width:420px){
    .venue-card{display:grid;grid-template-columns:160px 1fr;gap:var(--space-4)}
    .venue-image{height:100%}
}
```

- [ ] Container queries for SearchFilters layout in `MyPetVenues/Components/SearchFilters.razor.css` (append):

```css
.search-filters{container-type:inline-size;}
@container (min-width:520px){.search-fields{grid-template-columns:1fr 1fr;}}
@container (min-width:760px){.search-fields{grid-template-columns:1fr 1fr 1fr;}}
```

- [ ] Progressive images on venue detail hero in `MyPetVenues/Pages/VenueDetail.razor` (swap hero img tag):

```razor
<img src="@_venue.ImageUrl" srcset="@_venue.ImageUrl 800w, @_venue.ImageUrl 1200w" sizes="(max-width:800px) 100vw, 50vw" alt="@_venue.Name" loading="lazy" />
```

##### Step 4 Verification Checklist
- [ ] Navigation animates with View Transitions in Chrome/Edge (fallback graceful elsewhere)
- [ ] VenueCard/SearchFilters respond to parent width via container queries
- [ ] Venue detail hero uses responsive images (check Network for correct size)

#### Step 4 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.
