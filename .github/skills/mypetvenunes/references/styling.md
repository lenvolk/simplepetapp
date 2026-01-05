# MyPetVenues Styling Reference

## CSS Architecture

- **Global styles:** `wwwroot/css/app.css`
- **Scoped styles:** `*.razor.css` next to each component
- **Theme system:** CSS custom properties (variables)
- **Font:** Plus Jakarta Sans

## CSS Variable System

All colors and values use CSS variables for theme support.

### Light Mode (Default)

```css
:root, .light-mode {
    /* Accent Colors - Pink/Purple */
    --accent-primary: #db2777;
    --accent-secondary: #9333ea;
    --accent-tertiary: #ec4899;
    --accent-glow: rgba(219, 39, 119, 0.3);
    
    /* Backgrounds */
    --bg-primary: #fdf2f8;
    --bg-secondary: #ffffff;
    --bg-gradient: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #f5d0fe 100%);
    
    /* Cards */
    --card-bg: #ffffff;
    --card-featured-bg: linear-gradient(135deg, rgba(219,39,119,0.05), rgba(147,51,234,0.05));
    --header-bg: rgba(255, 255, 255, 0.85);
    --footer-bg: #fdf2f8;
    
    /* Text */
    --text-primary: #1f2937;
    --text-secondary: #4b5563;
    --text-muted: #9ca3af;
    
    /* Borders/Shadows */
    --border-color: rgba(219, 39, 119, 0.15);
    --shadow-color: rgba(219, 39, 119, 0.1);
    --shadow-hover: rgba(219, 39, 119, 0.2);
    
    /* Interactive */
    --input-bg: #ffffff;
    --button-secondary-bg: #fdf2f8;
    --nav-hover-bg: rgba(219, 39, 119, 0.1);
    --tag-bg: #fdf2f8;
    --tag-hover-bg: #fce7f3;
}
```

### Dark Mode

```css
.dark-mode {
    --accent-primary: #ec4899;
    --accent-secondary: #a855f7;
    --accent-tertiary: #f472b6;
    --accent-glow: rgba(236, 72, 153, 0.4);
    
    --bg-primary: #0f0f1a;
    --bg-secondary: #1a1a2e;
    --bg-gradient: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
    
    --card-bg: #1a1a2e;
    --card-featured-bg: linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1));
    --header-bg: rgba(15, 15, 26, 0.9);
    --footer-bg: #0f0f1a;
    
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --text-muted: #6b7280;
    
    --border-color: rgba(236, 72, 153, 0.2);
    --shadow-color: rgba(0, 0, 0, 0.3);
    --shadow-hover: rgba(236, 72, 153, 0.3);
    
    --input-bg: #16213e;
    --button-secondary-bg: #1a1a2e;
    --nav-hover-bg: rgba(236, 72, 153, 0.15);
    --tag-bg: rgba(236, 72, 153, 0.1);
    --tag-hover-bg: rgba(236, 72, 153, 0.2);
}
```

## Button Classes

```css
.btn                /* Base: flex, padding, border-radius: 12px */
.btn-primary        /* Gradient accent background, white text */
.btn-secondary      /* Light bg, border, text color */
.btn-outline        /* Transparent, accent border */
.btn-large          /* Larger padding: 16px 32px */
```

**Example:**
```razor
<button class="btn btn-primary btn-large">Click Me</button>
```

## Card Styling Pattern

```css
.card {
    background: var(--card-bg);
    border-radius: 20px;
    border: 1px solid var(--border-color);
    box-shadow: 0 4px 20px var(--shadow-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px var(--shadow-hover);
}

.card.featured {
    border: 2px solid var(--accent-primary);
    background: var(--card-featured-bg);
}
```

## Typography

```css
h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); }
h3 { font-size: clamp(1.5rem, 3vw, 2rem); }
h4 { font-size: 1.25rem; }
```

## Gradient Text

```css
.text-gradient {
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

## Animations

Available animation classes:
- `.animate-fade-in` - Fade in + slide up
- `.animate-pulse` - Gentle pulse scale
- `.animate-float` - Float up and down

```css
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
```

## Spacing Utilities

```css
.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }

.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }

.text-center { text-align: center; }
```

## Responsive Patterns

Use `clamp()` for responsive typography:
```css
font-size: clamp(min, preferred, max);
```

Image grid example:
```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
}
```

## Theme Toggle Implementation

Theme is applied via class on `.app-container`:

```razor
<div class="app-container @(ThemeService.IsDarkMode ? "dark-mode" : "light-mode")">
```

Toggle button pattern:
```razor
<button @onclick="ThemeService.ToggleTheme">
    @(ThemeService.IsDarkMode ? "☀️" : "🌙")
</button>
```

## Common Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Border radius | 20px | Cards |
| Border radius | 12px | Buttons, inputs |
| Border radius | 8px | Tags, badges |
| Transition | 0.3s cubic-bezier(0.4, 0, 0.2, 1) | Hover effects |
| Hover lift | translateY(-8px) | Cards |
| Shadow base | 0 4px 20px | Cards |
| Shadow hover | 0 12px 40px | Card hover |
