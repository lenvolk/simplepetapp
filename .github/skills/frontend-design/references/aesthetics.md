# Aesthetics & Implementation Reference

Detailed guidelines for typography, color, motion, composition, implementation scaffolds, and anti-patterns. Load this when building a frontend interface.

## Typography

Choose fonts that are beautiful, unique, and characterful. Pair a distinctive display font with a refined body font.

**Anti-patterns to avoid:**
- Generic fonts: Arial, Inter, Roboto, system-ui defaults
- Overused "trendy" fonts: Space Grotesk across every generation
- Same font choices across different projects

**Good practices:**
- Use Google Fonts or CDN-hosted distinctive typefaces
- Define a clear type scale with `rem` units
- Establish hierarchy: display → heading → subheading → body → caption
- Use `font-feature-settings` for OpenType features when available

## Color & Theme

Commit to a cohesive palette. Define all colors as CSS custom properties for consistency.

```css
:root {
  --color-primary: #1a1a2e;
  --color-accent: #e94560;
  --color-surface: #16213e;
  --color-text: #eaeaea;
  --color-muted: #8a8a9a;
}
```

**Rules:**
- Dominant colors with sharp accents outperform timid, evenly-distributed palettes
- Vary between light and dark themes across projects — never default to the same one
- Avoid clichéd schemes: purple gradients on white, blue-to-teal enterprise palettes
- Test contrast ratios for accessibility (WCAG AA minimum: 4.5:1 for body text)

## Motion & Interaction

Prioritize CSS-only solutions for HTML projects. Use libraries (Framer Motion, GSAP) for React/Vue when appropriate.

**High-impact patterns:**
- Orchestrated page load with staggered reveals (`animation-delay`)
- Scroll-triggered animations for content sections
- Hover states that surprise (scale, color shift, shadow elevation)
- Smooth page transitions when routing

**Anti-patterns:**
- Scattered micro-interactions that feel random
- Animations that delay content access
- Excessive parallax or scroll-jacking

## Spatial Composition

Go beyond conventional layouts:
- Asymmetric grids, overlapping elements, diagonal flow
- Grid-breaking hero sections
- Generous negative space OR controlled density (pick one per project)
- CSS Grid and `subgrid` for sophisticated layouts

## Backgrounds & Visual Details

Create atmosphere and depth — never default to solid white/gray:
- Gradient meshes, noise textures, geometric patterns
- Layered transparencies and dramatic shadows
- Decorative borders, custom cursors, grain overlays
- Contextual effects that reinforce the aesthetic direction

## HTML Scaffold

Deliver a single self-contained `.html` file unless the task requires multi-file structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><!-- Descriptive title --></title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <!-- Google Fonts link -->
  <style>
    /* CSS custom properties, reset, layout, components */
  </style>
</head>
<body>
  <!-- Semantic HTML structure -->
  <script>
    /* Interaction logic, animations */
  </script>
</body>
</html>
```

**Required:**
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Mobile-responsive via CSS Grid/Flexbox and media queries
- System color-scheme awareness (`prefers-color-scheme`) when appropriate
- `prefers-reduced-motion` media query for animation-sensitive users

## React / Vue Projects

- Use functional components with hooks (React) or Composition API (Vue)
- Co-locate styles with components (CSS Modules, styled-components, Tailwind)
- Implement loading states and error boundaries
- Use CSS custom properties for theming

## Absolute Anti-Patterns

NEVER produce interfaces with these generic AI signatures:
- Overused font families (Inter, Roboto, Arial, system fonts as primary)
- Clichéd color schemes (purple gradients on white, generic blue corporate)
- Predictable card-grid layouts with rounded corners and drop shadows
- Cookie-cutter hero sections with stock gradient backgrounds
- Identical styling across different projects
- Placeholder content (`Lorem ipsum`) without noting it as placeholder

Every interface must feel **genuinely designed for its specific context**. No two designs should look the same.

## Complexity Matching

Match implementation depth to the aesthetic vision:

| Vision | Implementation |
|---|---|
| Maximalist / immersive | Elaborate animations, layered effects, custom interactions, rich textures |
| Minimalist / refined | Precise spacing, perfect typography, subtle micro-interactions, restraint |
| Editorial / magazine | Strong grid, typographic hierarchy, image-text interplay, whitespace |
| Brutalist / raw | Monospace fonts, stark contrast, unconventional navigation, raw HTML feel |

Elegance comes from executing the vision well, not from adding more effects.
