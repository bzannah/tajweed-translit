---
paths:
  - "scripts/**/*"
  - "next.config.*"
  - "public/**/*"
---
# Performance & Build Rules

- Page images must be WebP format, quality 85, ~1200px wide
- Use next/image with explicit width and height to prevent layout shift
- Set `priority={true}` ONLY for the currently visible page(s)
- Prefetch the next 2 pages with `loading="lazy"` (default in next/image)
- Keep the main JS bundle under 200KB gzipped
- Use dynamic imports (`next/dynamic`) for heavy components (AudioPlayer, SettingsPanel)
- Never import all 1275 page paths at once — use dynamic references
- PDF conversion output goes to `public/pages/` — these are gitignored and regenerated
- Build scripts must run without network access (no API calls during build)
