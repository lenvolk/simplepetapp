---
name: frontend-design
description: 'Create distinctive, production-grade frontend interfaces. Build web pages, dashboards, HTML artifacts, React/Vue components, and styled UI layouts that avoid generic AI aesthetics. Triggers: frontend design, web UI, dashboard, landing page, HTML layout, React component, beautify UI, style page, web app, CSS design.'
argument-hint: 'Describe the interface to build: purpose, audience, and any technical constraints'
---

# Frontend Design

Create distinctive, production-grade frontend interfaces. Every interface must be functional, visually striking, and avoid generic "AI slop" aesthetics.

For detailed typography, color, motion, composition, scaffolds, and anti-pattern rules, read [references/aesthetics.md](references/aesthetics.md) before implementing.

## Workflow

### 1. Design Thinking

Before writing any code, commit to a clear aesthetic direction:

1. **Purpose** — What problem does this interface solve? Who uses it?
2. **Tone** — Pick a bold direction: brutally minimal, maximalist, retro-futuristic, organic/natural, luxury/refined, playful, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian. Commit fully.
3. **Constraints** — Framework requirements, browser targets, accessibility needs, performance budget.
4. **Differentiator** — What single element makes this interface unforgettable?

The key is **intentionality**, not intensity. Choose a direction and execute with precision.

### 2. Implement

Read [references/aesthetics.md](references/aesthetics.md), then produce working code (HTML/CSS/JS, React, Vue) that is:
- Production-grade and functional
- Visually striking with a clear aesthetic point-of-view
- Responsive, accessible (`prefers-reduced-motion`, WCAG AA contrast), semantic HTML
- Meticulously refined in every detail

### 3. Output

Save generated HTML/frontend artifacts to `.copilot/docs/` (see `shared-patterns.instructions.md` § Artifact Output Directory).

## Core Rules

- **NEVER** use generic AI fonts (Inter, Roboto, Arial, system defaults) — choose distinctive typefaces
- **NEVER** use clichéd color schemes (purple gradients on white, generic blue corporate)
- **NEVER** produce cookie-cutter card-grid layouts — every design must be unique to its context
- **ALWAYS** define colors as CSS custom properties
- **ALWAYS** vary aesthetics across projects — no two designs should look the same
