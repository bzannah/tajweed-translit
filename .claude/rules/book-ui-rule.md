---
paths:
  - "src/components/viewer/**/*"
  - "src/components/layout/**/*"
  - "src/app/globals.css"
---
# Book UI Rules

This project simulates a physical Tajweed Mushaf. Every visual choice must reinforce the feeling of holding a real book.

## Aesthetic Direction: "Warm Study"
- A scholar's reading desk at night. Warm light. Leather-bound book. Cream pages.
- Background: warm charcoal with subtle texture and lamp-like radial glow. Never flat. Never cold.
- Book container: visible shadow stack, page thickness edges, binding gutter. It must look like a 3D object.
- Pages: inner shadows at edges, subtle paper texture, faint page curl. Not raw flat images.

## Animation Principles
- Page turns use CSS 3D transforms with perspective. 550ms, fast-lift slow-settle easing.
- Never use animation libraries — CSS only.
- Respect prefers-reduced-motion: instant swap when enabled.
- Add `will-change: transform` only during active animations, remove on completion.
- Prevent double-trigger: add `is-turning` class to book container during page turn, ignore clicks while active.

## Colour Palette (book-specific custom properties)
- `--color-warm-glow`: rgba(214,168,83,0.03) — desk lamp effect
- `--color-page-cream`: #e8dcc8 — page edge tint
- `--color-book-shadow`: rgba(0,0,0,0.4) — primary book shadow
- `--color-binding`: rgba(0,0,0,0.15) — gutter crease gradient
- `--color-page-stack`: #d8ccb4 — stacked page edges

## Responsive Book Treatment
- Desktop (≥1024px): full treatment — 3D flip, page stack, gutter, all shadows
- Tablet (768-1023px): full treatment, single page, 3D flip
- Mobile (<768px): simplified — slide animation, no page stack/curl, smaller shadows
