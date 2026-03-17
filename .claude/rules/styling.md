---
paths:
  - "**/*.css"
  - "tailwind.config.*"
---
# Styling Rules

- Dark theme is the DEFAULT. Light theme is the override
- Use semantic CSS custom properties defined in globals.css
- Tailwind class order: layout → sizing → spacing → typography → colours → effects
- Never use arbitrary values (`w-[347px]`) — use design tokens or closest utility
- Use `cn()` utility (clsx + twMerge) for conditional class composition
- No CSS modules, no styled-components, no inline styles

## Colour System

```css
/* Dark theme (default) */
:root {
  --color-bg: #121212;
  --color-surface: #1e1e1e;
  --color-surface-hover: #2a2a2a;
  --color-surface-active: #333333;
  --color-sidebar: #1a1a1a;
  --color-primary: #f0f0f0;
  --color-secondary: #c0c0c0;
  --color-muted: #808080;
  --color-accent: #d4a853;        /* Gold — from reference UI */
  --color-accent-green: #4caf50;  /* Meccan surah indicator */
  --color-accent-red: #c0392b;    /* Medinan surah indicator */
  --color-border: #333333;
}

/* Light theme */
.light {
  --color-bg: #f5f5f5;
  --color-surface: #ffffff;
  --color-surface-hover: #f0f0f0;
  --color-surface-active: #e5e5e5;
  --color-sidebar: #fafafa;
  --color-primary: #1a1a1a;
  --color-secondary: #4a4a4a;
  --color-muted: #8a8a8a;
  --color-accent: #b8860b;
  --color-border: #e0e0e0;
}
```
