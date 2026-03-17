# Style Guide — Tajweed Translit

Visual design specifications extracted from the reference Tajweed Mushaf app screenshots.

## Overall Aesthetic
- Dark, immersive reading experience — minimise distraction from the content
- Clean, uncluttered interface — content is the hero
- Gold accent colour for interactive elements and highlights
- Subtle borders and dividers — never heavy
- Rounded corners on interactive elements (8px default)

## Colour Palette

### Dark Theme (Default)
| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#121212` | Main background behind page viewer |
| `--color-surface` | `#1e1e1e` | Cards, panels, bottom bar |
| `--color-surface-hover` | `#2a2a2a` | Hover state on interactive surfaces |
| `--color-surface-active` | `#333333` | Active/selected items |
| `--color-sidebar` | `#1a1a1a` | Sidebar background |
| `--color-primary` | `#f0f0f0` | Primary text |
| `--color-secondary` | `#c0c0c0` | Secondary text |
| `--color-muted` | `#808080` | Muted text, hints, page numbers |
| `--color-accent` | `#d4a853` | Gold — active tabs, highlights, buttons |
| `--color-accent-green` | `#4caf50` | Meccan surah indicator |
| `--color-accent-amber` | `#c0862b` | Medinan surah indicator |
| `--color-border` | `#333333` | Subtle borders and dividers |
| `--color-danger` | `#e74c3c` | Destructive actions |

### Light Theme
| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#f5f5f5` | Main background |
| `--color-surface` | `#ffffff` | Cards, panels |
| `--color-surface-hover` | `#f0f0f0` | Hover |
| `--color-surface-active` | `#e5e5e5` | Active |
| `--color-sidebar` | `#fafafa` | Sidebar |
| `--color-primary` | `#1a1a1a` | Primary text |
| `--color-secondary` | `#4a4a4a` | Secondary text |
| `--color-muted` | `#8a8a8a` | Muted text |
| `--color-accent` | `#b8860b` | Gold (darker for contrast) |
| `--color-border` | `#e0e0e0` | Borders |

## Typography
- Font family: system font stack — `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- No custom web fonts in v1 (reduces load time)
- Sizes (use Tailwind classes):
  - App title: `text-lg font-semibold` (18px)
  - Sidebar surah names: `text-sm font-medium` (14px)
  - Sidebar page numbers: `text-xs text-muted` (12px)
  - Bottom bar labels: `text-xs` (12px)
  - Page indicator badge: `text-xs font-medium` (12px)
  - Modal titles: `text-lg font-semibold` (18px)
  - Body text in panels: `text-sm` (14px)

## Layout Dimensions
- TopBar height: 48px
- BottomBar height: 56px
- Sidebar width: 280px (desktop), full overlay (mobile)
- Page viewer padding: 16px on all sides
- Maximum page image width: 600px (single), 1200px combined (dual)

## Spacing Scale (Tailwind defaults)
- Tight: `gap-1` (4px) — between page number and icon in sidebar
- Normal: `gap-3` (12px) — between items in a row
- Comfortable: `p-4` (16px) — panel padding
- Generous: `gap-6` (24px) — between major sections

## Interactive States
- Buttons: `transition-colors duration-150`
- Hover: lighten surface by one step (surface → surface-hover)
- Active/pressed: lighten by two steps (surface → surface-active)
- Focus: `ring-2 ring-accent ring-offset-2 ring-offset-bg`
- Disabled: `opacity-50 cursor-not-allowed`

## Sidebar Item States (from reference screenshots)
- Default: `text-primary bg-transparent`
- Hover: `bg-surface-hover`
- Active (current surah): `text-accent bg-surface-active`
- Surah number: `text-muted` on the left
- Page number: `text-muted text-xs` on the right

## Slide-Up Panel Animation
- Panels slide up from bottom: `transform translateY(100%) → translateY(0)`
- Duration: 300ms
- Easing: `ease-out`
- Background overlay: `bg-black/50` with fade-in
- Max height: 60vh
- Rounded top corners: `rounded-t-2xl`

## Tailwind Config Mapping

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          hover: 'var(--color-surface-hover)',
          active: 'var(--color-surface-active)',
        },
        sidebar: 'var(--color-sidebar)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        muted: 'var(--color-muted)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          green: 'var(--color-accent-green)',
          amber: 'var(--color-accent-amber)',
        },
        border: 'var(--color-border)',
        danger: 'var(--color-danger)',
      },
    },
  },
  plugins: [],
} satisfies Config;
```
