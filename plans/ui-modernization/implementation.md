# UI Modernization - Clean and Modern Redesign

**Branch:** `feature/ui-modernization`

## Goal
Deliver a modernized, accessible MyPetVenues UI with design tokens, consistent breakpoints, robust loading skeletons, polished animations, and modern CSS features while preserving the existing pink-purple brand.

### Step-by-Step Instructions

#### Step 1: Establish Design Tokens & Accessibility
- [ ] Replace global stylesheet with tokenized, accessible base in `wwwroot/css/app.css`:

```css
/* ========================================
   MyPetVenues - Global Styles (Tokens + A11y)
   ======================================== */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

/* ========================================
   Design Tokens
   ======================================== */
:root,
.light-mode {
    /* Brand & Semantic */
    --accent-primary: #db2777;
    --accent-secondary: #9333ea;
    --accent-tertiary: #ec4899;
    --accent-glow: rgba(219, 39, 119, 0.28);
    --semantic-success: #22c55e;
    --semantic-warning: #f59e0b;
    --semantic-error: #ef4444;
    --semantic-info: #3b82f6;

    /* Surfaces */
    --bg-primary: #fdf2f8;
    --bg-secondary: #ffffff;
    --bg-gradient: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #f5d0fe 100%);
    --card-bg: #ffffff;
    --card-featured-bg: linear-gradient(135deg, rgba(219, 39, 119, 0.05), rgba(147, 51, 234, 0.05));
    --header-bg: rgba(255, 255, 255, 0.9);
    --footer-bg: #fdf2f8;

    /* Typography */
    --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --text-primary: #1f2937;
    --text-secondary: #4b5563;
    --text-muted: #9ca3af;
    --text-inverse: #f9fafb;
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;

    /* Spacing Scale */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;

    /* Radii */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.25rem;
    --radius-3xl: 1.5rem;
    --radius-full: 9999px;

    /* Shadows */
    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 6px 18px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.12);
    --shadow-xl: 0 20px 48px rgba(0, 0, 0, 0.18);

    /* Borders */
    --border-color: rgba(219, 39, 119, 0.18);

    /* Inputs & Buttons */
    --input-bg: #ffffff;
    --button-secondary-bg: #fdf2f8;
    --nav-hover-bg: rgba(219, 39, 119, 0.1);
    --tag-bg: #fdf2f8;
    --tag-hover-bg: #fce7f3;

    /* Transitions */
    --transition-fast: 120ms ease-out;
    --transition-base: 200ms ease;
    --transition-slow: 320ms ease;

    /* Breakpoints */
    --bp-sm: 640px;
    --bp-md: 768px;
    --bp-lg: 1024px;
    --bp-xl: 1280px;
    --bp-2xl: 1536px;
}

.dark-mode {
    --accent-primary: #ec4899;
    --accent-secondary: #a855f7;
    --accent-tertiary: #f472b6;
    --accent-glow: rgba(236, 72, 153, 0.32);
    --semantic-success: #22c55e;
    --semantic-warning: #fbbf24;
    --semantic-error: #f87171;
    --semantic-info: #60a5fa;

    --bg-primary: #0f0f1a;
    --bg-secondary: #1a1a2e;
    --bg-gradient: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
    --card-bg: #1a1a2e;
    --card-featured-bg: linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(168, 85, 247, 0.12));
    --header-bg: rgba(15, 15, 26, 0.92);
    --footer-bg: #0f0f1a;

    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --text-muted: #6b7280;
    --text-inverse: #0f0f1a;

    --border-color: rgba(236, 72, 153, 0.22);
    --shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.35);
    --shadow-md: 0 6px 22px rgba(0, 0, 0, 0.45);
    --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.5);
    --shadow-xl: 0 20px 48px rgba(0, 0, 0, 0.6);

    --input-bg: #16213e;
    --button-secondary-bg: #1a1a2e;
    --nav-hover-bg: rgba(236, 72, 153, 0.15);
    --tag-bg: rgba(236, 72, 153, 0.14);
    --tag-hover-bg: rgba(236, 72, 153, 0.22);
}

/* Optional nature-inspired theme */
.nature-mode {
    --accent-primary: #22c55e;
    --accent-secondary: #0ea5e9;
    --accent-tertiary: #10b981;
    --accent-glow: rgba(34, 197, 94, 0.25);
    --bg-gradient: linear-gradient(135deg, #ecfdf3 0%, #e0f2fe 50%, #f0fdf4 100%);
}

/* ========================================
   Base & Layout
   ======================================== */
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #app { height: 100%; }
html { scroll-behavior: smooth; }
body { font-family: var(--font-sans); line-height: 1.6; background: var(--bg-gradient); color: var(--text-primary); }
#app { min-height: 100%; }

.app-container { min-height: 100vh; background: var(--bg-gradient); color: var(--text-primary); transition: background var(--transition-base), color var(--transition-base); }

main { outline: none; }

/* Skip link */
.skip-link {
    position: absolute;
    left: -999px;
    top: -999px;
    padding: var(--space-2) var(--space-4);
    background: var(--accent-primary);
    color: #fff;
    z-index: 2000;
    border-radius: var(--radius-md);
    text-decoration: none;
}
.skip-link:focus-visible {
    left: var(--space-4);
    top: var(--space-4);
}

/* Focus styles */
*:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
    box-shadow: 0 0 0 4px var(--accent-glow);
}

/* Typography */
h1, h2, h3, h4, h5, h6 { font-weight: 700; line-height: 1.2; color: var(--text-primary); }
h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); }
h3 { font-size: clamp(1.5rem, 3vw, 2rem); }
h4 { font-size: 1.25rem; }
p { color: var(--text-secondary); }
a { color: var(--accent-primary); text-decoration: none; transition: color var(--transition-base); }
a:hover { color: var(--accent-secondary); }

/* Buttons */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 24px; font-size: var(--text-base); font-weight: 600; border-radius: 12px; border: none; cursor: pointer; transition: all var(--transition-base); text-decoration: none; }
.btn-primary { background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); color: #fff; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px var(--accent-glow); }
.btn-secondary { background: var(--button-secondary-bg); color: var(--text-primary); border: 2px solid var(--border-color); }
.btn-secondary:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
.btn-outline { background: transparent; color: var(--accent-primary); border: 2px solid var(--accent-primary); }
.btn-outline:hover { background: var(--accent-primary); color: #fff; }
.btn-large { padding: 16px 32px; font-size: 1.05rem; }

/* Forms */
input, select, textarea { font-family: inherit; }
.valid.modified:not([type=checkbox]) { outline: 2px solid var(--semantic-success); }
.invalid { outline: 2px solid var(--semantic-error); }
.validation-message { color: var(--semantic-error); font-size: 0.85rem; margin-top: 4px; }

/* Loading & Error UI */
#blazor-error-ui { color-scheme: light only; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); bottom: 0; box-shadow: 0 -4px 20px var(--shadow-sm); box-sizing: border-box; display: none; left: 0; padding: 1rem 1.5rem; position: fixed; width: 100%; z-index: 1200; color: #fff; }
#blazor-error-ui .dismiss { cursor: pointer; position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); font-size: 1.25rem; }
.blazor-error-boundary { background: linear-gradient(135deg, #ef4444, #dc2626); padding: 1.5rem; color: #fff; border-radius: 12px; margin: 20px; }
.blazor-error-boundary::after { content: "Oops! Something went wrong. 🐾"; }

.loading-progress { position: relative; display: block; width: 10rem; height: 10rem; margin: 25vh auto 1rem auto; }
.loading-progress circle { fill: none; stroke: var(--border-color); stroke-width: 0.5rem; transform-origin: 50% 50%; transform: rotate(-90deg); }
.loading-progress circle:last-child { stroke: var(--accent-primary); stroke-dasharray: calc(3.141 * var(--blazor-load-percentage, 0%) * 0.8), 500%; transition: stroke-dasharray 0.1s ease-in-out; }
.loading-progress-text { position: absolute; text-align: center; font-weight: 700; font-size: 1.25rem; color: var(--accent-primary); inset: calc(25vh + 4rem) 0 auto 0; }
.loading-progress-text:after { content: var(--blazor-load-percentage-text, "🐾 Loading..."); }

/* Utility classes */
.text-gradient { background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.text-center { text-align: center; }
.mt-1 { margin-top: var(--space-2); }
.mt-2 { margin-top: var(--space-4); }
.mt-3 { margin-top: var(--space-6); }
.mt-4 { margin-top: var(--space-8); }
.mb-1 { margin-bottom: var(--space-2); }
.mb-2 { margin-bottom: var(--space-4); }
.mb-3 { margin-bottom: var(--space-6); }
.mb-4 { margin-bottom: var(--space-8); }

/* Animations */
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
.animate-pulse { animation: pulse 2s ease-in-out infinite; }
.animate-float { animation: float 3s ease-in-out infinite; }

/* Scrollbars */
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb { background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent-primary); }

/* Selection */
::selection { background: var(--accent-primary); color: #fff; }

/* Code */
code { color: var(--accent-primary); background: var(--tag-bg); padding: 2px 6px; border-radius: 4px; font-family: 'Fira Code', monospace; }

/* Skip link target */
#main-content { scroll-margin-top: var(--space-12); }

/* Prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
```

- [ ] Update header markup for skip link, ARIA roles, keyboard shortcuts, and reduced-motion-friendly menu toggling in `Layout/Header.razor`:

```razor
@using MyPetVenues.Services
@inject NavigationManager Navigation
@inject IThemeService ThemeService
@implements IDisposable

<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header" role="banner" @onkeydown:document="HandleKeyDown">
    <div class="header-container">
        <a href="/" class="logo" @onclick:preventDefault @onclick="NavigateHome" aria-label="MyPetVenues home">
            <span class="logo-icon" aria-hidden="true">🐾</span>
            <span class="logo-text">MyPetVenues</span>
        </a>

        <button class="mobile-menu-btn" type="button" aria-label="Toggle navigation menu" aria-expanded="@_isMobileMenuOpen" @onclick="ToggleMobileMenu">
            <span aria-hidden="true">@(_isMobileMenuOpen ? "✕" : "☰")</span>
        </button>

        <nav class="main-nav @(_isMobileMenuOpen ? "open" : string.Empty)" role="navigation" aria-label="Primary navigation">
            <a href="/" class="nav-link @(IsActive("/") ? "active" : string.Empty)" @onclick:preventDefault @onclick="NavigateHome">🏠 Home</a>
            <a href="/venues" class="nav-link @(IsActive("/venues") ? "active" : string.Empty)" @onclick:preventDefault @onclick="NavigateVenues">📍 Venues</a>
            <a href="/booking" class="nav-link @(IsActive("/booking") ? "active" : string.Empty)" @onclick:preventDefault @onclick="NavigateBooking">📅 Book Now</a>
            <a href="/profile" class="nav-link @(IsActive("/profile") ? "active" : string.Empty)" @onclick:preventDefault @onclick="NavigateProfile">👤 Profile</a>
        </nav>

        <div class="header-actions">
            <button class="theme-toggle" type="button" aria-label="Toggle theme" @onclick="ToggleTheme">
                <span aria-hidden="true">@(ThemeService.IsDarkMode ? "☀️" : "🌙")</span>
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

    private void OnLocationChanged(object? sender, Microsoft.AspNetCore.Components.Routing.LocationChangedEventArgs e)
    {
        _isMobileMenuOpen = false;
        StateHasChanged();
    }

    private void ToggleMobileMenu() => _isMobileMenuOpen = !_isMobileMenuOpen;

    private void NavigateHome() => Navigate("/");
    private void NavigateVenues() => Navigate("/venues");
    private void NavigateBooking() => Navigate("/booking");
    private void NavigateProfile() => Navigate("/profile");

    private void Navigate(string path)
    {
        _isMobileMenuOpen = false;
        Navigation.NavigateTo(path);
    }

    private bool IsActive(string path)
    {
        var currentPath = new Uri(Navigation.Uri).AbsolutePath;
        return path == "/" ? currentPath == "/" || string.IsNullOrWhiteSpace(currentPath) : currentPath.StartsWith(path, StringComparison.OrdinalIgnoreCase);
    }

    private void ToggleTheme() => ThemeService.ToggleTheme();

    private void HandleKeyDown(KeyboardEventArgs e)
    {
        if (e.Key == "Escape" && _isMobileMenuOpen)
        {
            _isMobileMenuOpen = false;
            StateHasChanged();
            return;
        }

        if (e.CtrlKey && (e.Key?.Equals("k", StringComparison.OrdinalIgnoreCase) ?? false))
        {
            e.PreventDefault();
            Navigation.NavigateTo("/venues#search");
        }
    }

    public void Dispose()
    {
        ThemeService.OnThemeChanged -= StateHasChanged;
        Navigation.LocationChanged -= OnLocationChanged;
    }
}
```

- [ ] Refresh header styles with focus states, skip-link support, and consistent breakpoints in `Layout/Header.razor.css`:

```css
.site-header {
    background: var(--header-bg);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 1000;
    transition: background var(--transition-base), border-color var(--transition-base);
}

.header-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--space-3) var(--space-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
}

.logo { display: flex; align-items: center; gap: var(--space-2); text-decoration: none; transition: transform var(--transition-fast); }
.logo:hover { transform: scale(1.02); }
.logo-icon { font-size: 2rem; animation: bounce 2s infinite; }
.logo-text { font-size: 1.5rem; font-weight: 800; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

.main-nav { display: flex; align-items: center; gap: var(--space-2); }
.nav-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 18px;
    text-decoration: none;
    color: var(--text-secondary);
    font-weight: 500;
    border-radius: 12px;
    transition: all var(--transition-fast);
}
.nav-link:hover { color: var(--accent-primary); background: var(--nav-hover-bg); }
.nav-link.active { color: #fff; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); box-shadow: 0 4px 15px var(--accent-glow); }

.header-actions { display: flex; align-items: center; gap: 12px; }
.theme-toggle {
    background: var(--button-secondary-bg);
    border: 1px solid var(--border-color);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}
.theme-toggle:hover { transform: rotate(20deg) scale(1.05); background: var(--accent-primary); border-color: var(--accent-primary); color: #fff; }

.mobile-menu-btn {
    display: none;
    background: var(--button-secondary-bg);
    border: 1px solid var(--border-color);
    width: 44px;
    height: 44px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1.5rem;
    align-items: center;
    justify-content: center;
    color: var(--text-primary);
}

@media (max-width: 900px) {
    .mobile-menu-btn { display: flex; }
    .main-nav {
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background: var(--header-bg);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 20px;
        gap: 8px;
        border-bottom: 1px solid var(--border-color);
        transform: translateY(-120%);
        opacity: 0;
        transition: all var(--transition-base);
        z-index: 999;
    }
    .main-nav.open { transform: translateY(0); opacity: 1; }
    .nav-link { width: 100%; justify-content: center; padding: 14px; }
}
```

- [ ] Add landmark roles, ARIA labels, and accessible form text to `Layout/Footer.razor`:

```razor
<footer class="site-footer" role="contentinfo" aria-label="Site footer">
    <div class="footer-container">
        <div class="footer-main">
            <div class="footer-brand">
                <div class="footer-logo" aria-label="MyPetVenues logo">
                    <span class="logo-icon" aria-hidden="true">🐾</span>
                    <span class="logo-text">MyPetVenues</span>
                </div>
                <p class="footer-tagline">Discover pet-friendly places for you and your furry friends!</p>
                <div class="social-links" aria-label="Social links">
                    <a href="#" class="social-link" title="Facebook" aria-label="Facebook">📘</a>
                    <a href="#" class="social-link" title="Twitter" aria-label="Twitter">🐦</a>
                    <a href="#" class="social-link" title="Instagram" aria-label="Instagram">📸</a>
                    <a href="#" class="social-link" title="TikTok" aria-label="TikTok">🎵</a>
                </div>
            </div>

            <div class="footer-links" role="navigation" aria-label="Footer navigation">
                <div class="footer-column">
                    <h4>Explore</h4>
                    <a href="/venues">🌳 Parks</a>
                    <a href="/venues">☕ Cafés</a>
                    <a href="/venues">🍽️ Restaurants</a>
                    <a href="/venues">🏨 Hotels</a>
                </div>
                <div class="footer-column">
                    <h4>Resources</h4>
                    <a href="#">📖 Pet Care Tips</a>
                    <a href="#">📝 Blog</a>
                    <a href="#">❓ FAQ</a>
                    <a href="#">📞 Contact Us</a>
                </div>
                <div class="footer-column">
                    <h4>Company</h4>
                    <a href="#">👥 About Us</a>
                    <a href="#">💼 Careers</a>
                    <a href="#">🤝 Partners</a>
                    <a href="#">📰 Press</a>
                </div>
                <div class="footer-column">
                    <h4>Legal</h4>
                    <a href="#">📜 Terms of Service</a>
                    <a href="#">🔒 Privacy Policy</a>
                    <a href="#">🍪 Cookie Policy</a>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <form class="footer-newsletter" aria-label="Newsletter signup">
                <label for="newsletter-email">📬 Stay updated with pet-friendly spots!</label>
                <div class="newsletter-form">
                    <input id="newsletter-email" name="email" type="email" placeholder="Enter your email" required aria-required="true" />
                    <button type="submit">Subscribe</button>
                </div>
            </form>

            <div class="footer-copyright">
                <p>© @DateTime.Now.Year MyPetVenues. Made with ❤️ for pet lovers everywhere.</p>
                <p class="footer-pets" aria-hidden="true">🐕 🐱 🐰 🐦 🐹</p>
            </div>
        </div>
    </div>
</footer>
```

- [ ] Keep footer styles while enabling consistent spacing in `Layout/Footer.razor.css`:

```css
.site-footer { background: var(--footer-bg); border-top: 1px solid var(--border-color); padding: 60px 0 0 0; margin-top: 80px; }
.footer-container { max-width: 1400px; margin: 0 auto; padding: 0 var(--space-4); }
.footer-main { display: grid; grid-template-columns: 1.5fr 2fr; gap: 60px; padding-bottom: 40px; border-bottom: 1px solid var(--border-color); }
.footer-brand { display: flex; flex-direction: column; gap: 20px; }
.footer-logo { display: flex; align-items: center; gap: 10px; }
.footer-logo .logo-icon { font-size: 2rem; }
.footer-logo .logo-text { font-size: 1.5rem; font-weight: 800; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.footer-tagline { color: var(--text-secondary); font-size: 1rem; line-height: 1.6; margin: 0; }
.social-links { display: flex; gap: 12px; }
.social-link { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; font-size: 1.25rem; text-decoration: none; transition: all var(--transition-fast); }
.social-link:hover { transform: translateY(-3px); background: var(--accent-primary); border-color: var(--accent-primary); color: #fff; }
.footer-links { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
.footer-column h4 { color: var(--text-primary); font-size: 1rem; font-weight: 700; margin: 0 0 16px 0; }
.footer-column a { display: block; color: var(--text-secondary); text-decoration: none; padding: 6px 0; font-size: 0.9rem; transition: all var(--transition-fast); }
.footer-column a:hover { color: var(--accent-primary); transform: translateX(4px); }
.footer-bottom { padding: 30px 0; display: flex; flex-direction: column; gap: 30px; align-items: center; }
.footer-newsletter { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; justify-content: center; }
.footer-newsletter label { color: var(--text-secondary); font-weight: 500; }
.newsletter-form { display: flex; gap: 8px; }
.newsletter-form input { padding: 12px 20px; border: 2px solid var(--border-color); border-radius: 12px; background: var(--input-bg); color: var(--text-primary); font-size: 0.95rem; min-width: 250px; transition: all var(--transition-fast); }
.newsletter-form input:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 4px var(--accent-glow); }
.newsletter-form button { padding: 12px 24px; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); color: #fff; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all var(--transition-fast); }
.newsletter-form button:hover { transform: translateY(-2px); box-shadow: 0 4px 20px var(--accent-glow); }
.footer-pets { margin-top: 10px !important; font-size: 1.5rem !important; letter-spacing: 8px; }

@media (max-width: 1000px) {
    .footer-main { grid-template-columns: 1fr; gap: 40px; }
    .footer-links { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
    .footer-links { grid-template-columns: 1fr; text-align: center; }
    .footer-column a:hover { transform: none; }
    .social-links { justify-content: center; }
    .footer-brand { align-items: center; text-align: center; }
    .newsletter-form { flex-direction: column; width: 100%; }
    .newsletter-form input { min-width: auto; width: 100%; }
    .newsletter-form button { width: 100%; }
}
```

- [ ] Add main landmark id and spacing to `Layout/MainLayout.razor` and `Layout/MainLayout.razor.css`:

```razor
@inherits LayoutComponentBase
@using MyPetVenues.Services
@inject IThemeService ThemeService
@implements IDisposable

<div class="app-container @(ThemeService.IsDarkMode ? "dark-mode" : "light-mode")">
    <Header />
    <main id="main-content" class="main-content" role="main">
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
.app-container { min-height: 100vh; display: flex; flex-direction: column; }
.main-content { flex: 1; max-width: 1400px; margin: 0 auto; padding: var(--space-4); width: 100%; box-sizing: border-box; }
@media (max-width: 768px) { .main-content { padding: var(--space-3); } }
```

##### Step 1 Verification Checklist
- [ ] `dotnet build MyPetVenues/MyPetVenues.csproj` succeeds
- [ ] Skip link is keyboard-focusable and jumps to main content
- [ ] Header nav links, theme toggle, and mobile menu have visible focus states
- [ ] Focus outlines are 2px with offset across interactive elements
- [ ] Reduced-motion setting stops animations
- [ ] Lighthouse accessibility score ≥ 95

#### Step 1 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 2: Loading Service & Skeleton Screens
- [ ] Add centralized loading state management in `Services/LoadingService.cs`:

```csharp
using System.Collections.Concurrent;

namespace MyPetVenues.Services;

public interface ILoadingService
{
    void SetLoading(string key, bool isLoading);
    bool IsLoading(string key);
    IObservable<bool> Observe(string key);
}

public class LoadingService : ILoadingService
{
    private readonly ConcurrentDictionary<string, BehaviorSubject<bool>> _subjects = new();

    public void SetLoading(string key, bool isLoading)
    {
        var subject = _subjects.GetOrAdd(key, _ => new BehaviorSubject<bool>(false));
        subject.OnNext(isLoading);
    }

    public bool IsLoading(string key) => _subjects.TryGetValue(key, out var subject) && subject.Value;

    public IObservable<bool> Observe(string key) => _subjects.GetOrAdd(key, _ => new BehaviorSubject<bool>(false));
}

internal sealed class BehaviorSubject<T> : IObservable<T>
{
    private readonly List<IObserver<T>> _observers = new();
    private T _value;

    public BehaviorSubject(T initial) => _value = initial;
    public T Value => _value;

    public void OnNext(T value)
    {
        _value = value;
        foreach (var observer in _observers.ToArray())
        {
            observer.OnNext(value);
        }
    }

    public IDisposable Subscribe(IObserver<T> observer)
    {
        if (!_observers.Contains(observer))
            _observers.Add(observer);
        observer.OnNext(_value);
        return new Subscription(() => _observers.Remove(observer));
    }

    private sealed class Subscription : IDisposable
    {
        private readonly Action _onDispose;
        public Subscription(Action onDispose) => _onDispose = onDispose;
        public void Dispose() => _onDispose();
    }
}
```

- [ ] Register the loading service in `Program.cs`:

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
builder.Services.AddSingleton<ILoadingService, LoadingService>();

await builder.Build().RunAsync();
```

- [ ] Create venue skeleton component `Components/VenueCardSkeleton.razor`:

```razor
<div class="venue-card skeleton-card">
    <div class="skeleton media"></div>
    <div class="skeleton lines short"></div>
    <div class="skeleton lines"></div>
    <div class="skeleton chips"></div>
</div>
```

- [ ] Style venue skeleton in `Components/VenueCardSkeleton.razor.css`:

```css
.venue-card { background: var(--card-bg); border-radius: 20px; border: 1px solid var(--border-color); padding: var(--space-3); box-shadow: var(--shadow-sm); }
.skeleton { position: relative; overflow: hidden; background: var(--tag-bg); border-radius: var(--radius-md); }
.skeleton::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent); transform: translateX(-100%); animation: shimmer 1.4s infinite; }
.media { height: 180px; border-radius: var(--radius-lg); margin-bottom: var(--space-3); }
.lines { height: 16px; margin-bottom: var(--space-2); }
.lines.short { width: 60%; }
.chips { height: 32px; width: 80%; border-radius: var(--radius-full); }
@keyframes shimmer { 100% { transform: translateX(100%); } }
```

- [ ] Create review skeleton component `Components/ReviewCardSkeleton.razor`:

```razor
<div class="review-card skeleton-card">
    <div class="skeleton header"></div>
    <div class="skeleton line"></div>
    <div class="skeleton line short"></div>
    <div class="skeleton chips"></div>
</div>
```

- [ ] Style review skeleton in `Components/ReviewCardSkeleton.razor.css`:

```css
.review-card { background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-color); padding: var(--space-3); box-shadow: var(--shadow-sm); }
.skeleton { position: relative; overflow: hidden; background: var(--tag-bg); border-radius: var(--radius-md); }
.skeleton::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); transform: translateX(-100%); animation: shimmer 1.4s infinite; }
.header { height: 48px; margin-bottom: var(--space-3); border-radius: var(--radius-full); }
.line { height: 14px; margin-bottom: var(--space-2); }
.line.short { width: 70%; }
.chips { height: 32px; width: 50%; border-radius: var(--radius-full); }
@keyframes shimmer { 100% { transform: translateX(100%); } }
```

- [ ] Show skeletons on Home during venue load in `Pages/Home.razor`:

```razor
@page "/"
@using MyPetVenues.Models
@using MyPetVenues.Services
@using MyPetVenues.Components
@inject IVenueService VenueService
@inject NavigationManager Navigation
@inject ILoadingService LoadingService

<PageTitle>MyPetVenues - Find Pet-Friendly Places 🐾</PageTitle>

<section class="hero-section"> ... </section>
<section class="quick-search-section">
    <SearchFilters OnSearch="HandleSearch" />
</section>
<section class="featured-section">
    <div class="section-header">
        <h2>Featured Venues ⭐</h2>
        <p>Hand-picked favorites from our community</p>
    </div>
    @if (LoadingService.IsLoading("home:featured"))
    {
        <div class="venues-grid">
            @foreach (var _ in Enumerable.Range(0, 6))
            {
                <VenueCardSkeleton />
            }
        </div>
    }
    else if (_featuredVenues is null)
    {
        <div class="loading-state">
            <span class="loading-emoji">🐾</span>
            <p>Fetching amazing venues...</p>
        </div>
    }
    else
    {
        <div class="venues-grid">
            @foreach (var venue in _featuredVenues)
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

    protected override async Task OnInitializedAsync()
    {
        LoadingService.SetLoading("home:featured", true);
        _featuredVenues = await VenueService.GetFeaturedVenuesAsync();
        LoadingService.SetLoading("home:featured", false);
    }

    private void NavigateToVenues() => Navigation.NavigateTo("/venues");
    private void NavigateToBooking() => Navigation.NavigateTo("/booking");
    private void NavigateToProfile() => Navigation.NavigateTo("/profile");
    private void NavigateToVenue(int venueId) => Navigation.NavigateTo($"/venues/{venueId}");

    private void HandleSearch((string? SearchTerm, VenueType? VenueType, PetType? PetType) filters)
    {
        var query = new List<string>();
        if (!string.IsNullOrWhiteSpace(filters.SearchTerm)) query.Add($"search={Uri.EscapeDataString(filters.SearchTerm)}");
        if (filters.VenueType.HasValue) query.Add($"type={filters.VenueType}");
        if (filters.PetType.HasValue) query.Add($"pet={filters.PetType}");
        var suffix = query.Any() ? "?" + string.Join("&", query) : string.Empty;
        Navigation.NavigateTo($"/venues{suffix}");
    }
}
```

- [ ] Swap loading states to skeletons on Venues list in `Pages/Venues.razor`:

```razor
@page "/venues"
... // using statements remain
@inject ILoadingService LoadingService

<div class="venues-page">
    <header class="page-header">
        <h1>Explore Pet-Friendly Venues 🔍</h1>
        <p>Discover amazing places to visit with your furry friends</p>
    </header>

    <SearchFilters SearchTerm="@_searchTerm" SelectedVenueType="@_selectedVenueType" SelectedPetType="@_selectedPetType" OnSearch="HandleSearch" />

    @if (LoadingService.IsLoading("venues:list"))
    {
        <div class="venues-grid">
            @foreach (var _ in Enumerable.Range(0, 6)) { <VenueCardSkeleton /> }
        </div>
    }
    else if (_venues is null || !_venues.Any())
    {
        <div class="empty-state"> ... </div>
    }
    else
    {
        <div class="results-info"> ... </div>
        <div class="venues-grid">
            @foreach (var venue in _venues)
            {
                <VenueCard Venue="@venue" IsFeatured="@venue.IsFeatured" OnClick="() => NavigateToVenue(venue.Id)" />
            }
        </div>
    }
</div>

@code {
    ... // existing parameters
    protected override async Task OnInitializedAsync()
    {
        ParseQueryParameters();
        await LoadVenues();
    }

    private async Task LoadVenues()
    {
        LoadingService.SetLoading("venues:list", true);
        await Task.Delay(200);
        _venues = await VenueService.SearchVenuesAsync(_searchTerm, _selectedVenueType, _selectedPetType);
        LoadingService.SetLoading("venues:list", false);
    }

    private async Task HandleSearch((string? SearchTerm, VenueType? VenueType, PetType? PetType) filters)
    {
        _searchTerm = filters.SearchTerm;
        _selectedVenueType = filters.VenueType;
        _selectedPetType = filters.PetType;
        UpdateUrl();
        await LoadVenues();
    }
}
```

- [ ] Add detail skeletons for hero/reviews in `Pages/VenueDetail.razor`:

```razor
@page "/venues/{VenueId:int}"
... // inject services
@inject ILoadingService LoadingService

@if (LoadingService.IsLoading("venue:detail"))
{
    <div class="venue-detail-page">
        <div class="venue-hero">
            <div class="skeleton media"></div>
            <div class="skeleton info"></div>
        </div>
        <div class="venue-content-grid">
            <div class="venue-main-content">
                @foreach (var _ in Enumerable.Range(0, 2))
                {
                    <div class="skeleton block"></div>
                }
                <div class="reviews-list">
                    @foreach (var _ in Enumerable.Range(0, 3)) { <ReviewCardSkeleton /> }
                </div>
            </div>
            <aside class="venue-sidebar">
                @foreach (var _ in Enumerable.Range(0, 3)) { <div class="skeleton sidebar"></div> }
            </aside>
        </div>
    </div>
}
else if (_venue is null)
{
    ...
}
else
{
    ... // existing content
}

@code {
    protected override async Task OnInitializedAsync() => await LoadVenueData();
    private async Task LoadVenueData()
    {
        LoadingService.SetLoading("venue:detail", true);
        _venue = await VenueService.GetVenueByIdAsync(VenueId);
        if (_venue is not null)
        {
            _reviews = await VenueService.GetVenueReviewsAsync(VenueId);
            var user = await UserService.GetCurrentUserAsync();
            _isFavorite = user?.FavoriteVenueIds.Contains(VenueId) ?? false;
        }
        LoadingService.SetLoading("venue:detail", false);
    }
}
```

- [ ] Add skeleton helpers to `Pages/VenueDetail.razor.css`:

```css
.skeleton { position: relative; overflow: hidden; background: var(--tag-bg); border-radius: var(--radius-md); }
.skeleton::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); transform: translateX(-100%); animation: shimmer 1.4s infinite; }
.skeleton.media { height: 260px; border-radius: var(--radius-xl); }
.skeleton.info { height: 200px; }
.skeleton.block { height: 160px; margin-bottom: var(--space-3); }
.skeleton.sidebar { height: 140px; }
@keyframes shimmer { 100% { transform: translateX(100%); } }
```

- [ ] Show review skeletons while booking page loads in `Pages/BookVenue.razor` by reusing `LoadingService` (keep existing content, wrap initial load):

```razor
@inject ILoadingService LoadingService
...
@if (LoadingService.IsLoading("booking:page"))
{
    <div class="loading-state">
        <span class="loading-emoji">🐾</span>
        <p>Loading booking options...</p>
    </div>
}
else if (_bookingComplete)
{
    ...
}
else
{
    ...
}

@code {
    protected override async Task OnInitializedAsync()
    {
        LoadingService.SetLoading("booking:page", true);
        _venues = await VenueService.GetAllVenuesAsync();
        _user = await UserService.GetCurrentUserAsync();
        if (PreselectedVenueId.HasValue)
        {
            _selectedVenue = _venues.FirstOrDefault(v => v.Id == PreselectedVenueId.Value);
            if (_selectedVenue is not null) _currentStep = 2;
        }
        _bookingModel.BookingDate = DateTime.Now.AddDays(1).Date;
        _bookingModel.NumberOfPets = 1;
        LoadingService.SetLoading("booking:page", false);
        _isLoading = false;
    }
}
```

- [ ] Ensure base skeleton utility styles exist (add to end of `wwwroot/css/app.css` if desired) or rely on component CSS above.

##### Step 2 Verification Checklist
- [ ] Build succeeds with new service and components
- [ ] Home/Venues/VenueDetail show skeletons instead of emoji loaders when fetching data
- [ ] No emoji spinners remain for loading states
- [ ] Skeleton shimmer respects reduced-motion (animations stop when OS prefers reduction)

#### Step 2 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 3: Animations & Micro-interactions
- [ ] Add animation tokens and prefers-reduced-motion guards in `wwwroot/css/app.css` (extend existing file):

```css
:root { --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1); --stagger-step: 50ms; }

.prefers-reduce * { animation: none !important; transition: none !important; }

.hover-lift { transition: transform var(--transition-base), box-shadow var(--transition-base); }
.hover-lift:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.pressable:active { transform: scale(0.98); }

@media (prefers-reduced-motion: reduce) {
    .hover-lift, .pressable, .animate-fade-in, .animate-pulse, .animate-float { transition: none !important; animation: none !important; }
}
```

- [ ] Enhance card interactions in `Components/VenueCard.razor.css`:

```css
.venue-card { background: var(--card-bg); border-radius: 20px; overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.3s var(--ease-spring), box-shadow 0.3s var(--ease-spring); cursor: pointer; position: relative; border: 1px solid var(--border-color); }
.venue-card:hover { transform: translateY(-8px) scale(1.01); box-shadow: var(--shadow-lg); }
.venue-card.featured { border: 2px solid var(--accent-primary); background: var(--card-featured-bg); }
.featured-badge { position: absolute; top: 16px; left: 16px; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); color: #fff; padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; z-index: 10; box-shadow: 0 2px 10px var(--accent-glow); }
.venue-image { position: relative; height: 200px; overflow: hidden; }
.venue-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease-smooth); }
.venue-card:hover .venue-image img { transform: scale(1.06); }
.venue-type-overlay { position: absolute; bottom: 12px; right: 12px; }
.venue-content { padding: 20px; display: flex; flex-direction: column; gap: 10px; }
.venue-name { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0; line-height: 1.3; }
.venue-location { color: var(--text-secondary); font-size: 0.9rem; margin: 0; }
.venue-rating { display: flex; align-items: center; gap: 8px; }
.review-count { color: var(--text-muted); font-size: 0.85rem; }
.venue-pets, .venue-amenities { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
.more-amenities { color: var(--accent-primary); font-size: 0.75rem; font-weight: 500; }
```

- [ ] Add staggered entrance and hover micro-interactions to `Components/ReviewCard.razor.css`:

```css
.review-card { background: var(--card-bg); border-radius: 16px; padding: 20px; border: 1px solid var(--border-color); transition: transform 0.3s var(--ease-spring), box-shadow 0.3s var(--ease-spring); }
.review-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.review-photo:hover { transform: scale(1.08); box-shadow: var(--shadow-sm); }
.helpful-btn { transition: transform var(--transition-fast), box-shadow var(--transition-fast); }
.helpful-btn:active { transform: scale(0.97); }
```

- [ ] Make SearchFilters keyboard-friendly and add height transition in `Components/SearchFilters.razor`:

```razor
<div class="search-filters" @onkeydown="HandleKeys">
    <div class="search-box">
        <span class="search-icon" aria-hidden="true">🔍</span>
        <input id="global-search" type="text" placeholder="Search venues, cities..." @bind="SearchTerm" @bind:event="oninput" @onkeyup="OnSearchKeyUp" aria-label="Search venues" />
        @if (!string.IsNullOrEmpty(SearchTerm))
        {
            <button class="clear-btn" type="button" aria-label="Clear search" @onclick="ClearSearch">✕</button>
        }
    </div>
    <div class="filter-row" aria-label="Filters">
        <div class="filter-group">
            <label for="venue-type">Venue Type</label>
            <select id="venue-type" @bind="SelectedVenueType" aria-label="Venue type filter">
                <option value="">All Types</option>
                @foreach (var type in Enum.GetValues<VenueType>())
                {
                    <option value="@type">@GetVenueTypeDisplay(type)</option>
                }
            </select>
        </div>
        <div class="filter-group">
            <label for="pet-type">Pet Type</label>
            <select id="pet-type" @bind="SelectedPetType" aria-label="Pet type filter">
                <option value="">All Pets</option>
                @foreach (var type in Enum.GetValues<PetType>())
                {
                    <option value="@type">@GetPetTypeDisplay(type)</option>
                }
            </select>
        </div>
        <button class="search-btn pressable" type="button" @onclick="ApplyFilters">🔍 Search</button>
    </div>
</div>

@code {
    ...
    private Task HandleKeys(KeyboardEventArgs e)
    {
        if (e.Key == "Escape") { SearchTerm = string.Empty; return ApplyFilters(); }
        return Task.CompletedTask;
    }
}
```

- [ ] Animate filter interactions in `Components/SearchFilters.razor.css`:

```css
.search-filters { background: var(--card-bg); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); transition: box-shadow var(--transition-base); }
.search-filters:hover { box-shadow: var(--shadow-md); }
.search-box input { transition: border-color var(--transition-fast), box-shadow var(--transition-fast); }
.search-box input:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 4px var(--accent-glow); }
.search-btn { transition: transform var(--transition-fast), box-shadow var(--transition-fast); }
.search-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }
.filter-row { transition: height var(--transition-base) var(--ease-smooth); }
```

- [ ] Add form validation and focus animations to `Pages/BookVenue.razor.css` (append):

```css
.form-group input:invalid,
.form-group select:invalid,
.form-group textarea:invalid { border-color: var(--semantic-error); box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.18); }
.step-indicator .step-number { transition: transform var(--transition-base); }
.step.active .step-number { transform: scale(1.05); }
.booking-navigation .btn { transition: transform var(--transition-fast); }
.booking-navigation .btn:active { transform: scale(0.98); }
```

##### Step 3 Verification Checklist
- [ ] Hover states feel responsive with spring easing; no jank at 60fps
- [ ] Reduced-motion users see minimal animation
- [ ] Search filters respond to Escape to clear search
- [ ] Form validation visibly highlights errors

#### Step 3 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

#### Step 4: Container Queries & View Transitions
- [ ] Enable view transitions and container queries in `wwwroot/css/app.css` (append near bottom):

```css
@supports (view-transition-name: demo) {
    :root { view-transition-name: app-root; }
    ::view-transition-old(app-root), ::view-transition-new(app-root) {
        animation-duration: 0.35s;
        animation-timing-function: var(--ease-smooth);
    }
}

.container-card { container-type: inline-size; }
```

- [ ] Apply container queries to venue cards in `Components/VenueCard.razor.css`:

```css
.venue-card { container-type: inline-size; }
@container (min-width: 420px) {
    .venue-card { display: grid; grid-template-columns: 200px 1fr; }
    .venue-image { height: 100%; }
}
@container (max-width: 419px) {
    .venue-image { height: 180px; }
}
```

- [ ] Add container queries to search filters layout in `Components/SearchFilters.razor.css`:

```css
.search-filters { container-type: inline-size; }
@container (max-width: 520px) {
    .filter-row { flex-direction: column; }
    .search-btn { width: 100%; }
}
```

- [ ] Wire view transitions root in `App.razor`:

```razor
<Router AppAssembly="@typeof(App).Assembly">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" />
        <FocusOnNavigate RouteData="@routeData" Selector="h1" />
    </Found>
    <NotFound>
        <PageTitle>Not found</PageTitle>
        <LayoutView Layout="@typeof(MainLayout)">
            <p role="alert">Sorry, there's nothing at this address.</p>
        </LayoutView>
    </NotFound>
</Router>
```

- [ ] Add View Transitions polyfill hook and search-focus helper in `wwwroot/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MyPetVenues</title>
    <base href="/" />
    <link rel="stylesheet" href="css/app.css" />
    <link href="MyPetVenues.styles.css" rel="stylesheet" />
    <script>
        if ('startViewTransition' in document) {
            window.navigateWithTransition = (url) => document.startViewTransition(() => location.href = url);
        }
        window.focusSearch = () => {
            const el = document.getElementById('global-search');
            if (el) { el.focus(); el.select(); }
        };
    </script>
</head>
<body>
    <div id="app">
        <svg class="loading-progress">
            <circle r="40%" cx="50%" cy="50%" />
            <circle r="40%" cx="50%" cy="50%" />
        </svg>
        <div class="loading-progress-text"></div>
    </div>
    <div id="blazor-error-ui">
        An unhandled error has occurred.
        <a href="." class="reload">Reload</a>
        <span class="dismiss">🗙</span>
    </div>
    <script src="_framework/blazor.webassembly.js"></script>
</body>
</html>
```

- [ ] Call view transitions helper from header for navigation (optional) by replacing `Navigation.NavigateTo` calls with `window.navigateWithTransition` if available.

##### Step 4 Verification Checklist
- [ ] VenueCard and SearchFilters adapt based on container width, not viewport
- [ ] Page navigation animates when browser supports View Transitions (Chrome/Edge/Safari recent)
- [ ] Fallback navigation works on unsupported browsers
- [ ] Search shortcut (Ctrl+K) focuses search input via `focusSearch` helper

#### Step 4 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.
