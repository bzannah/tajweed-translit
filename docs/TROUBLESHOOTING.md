# Troubleshooting

Common issues and solutions when building with Claude Code.

## "Module not found" errors after scaffold

```bash
# Ensure all deps installed
pnpm install

# Verify path aliases work
# Check tsconfig.json has "@/*" mapped to "./src/*"
# Check vitest.config.ts has matching alias
```

## Tests fail with "Cannot find module '@/...'"

The vitest config needs matching path aliases:
```typescript
// vitest.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
},
```

## JSON imports fail in TypeScript

Ensure `"resolveJsonModule": true` is in `tsconfig.json`.

## next/image not working with static export

When using `output: 'export'` in next.config.ts, set `images.unoptimized: true`.
Page images are pre-optimised during PDF conversion so this is fine.

## localStorage errors in tests

Vitest uses jsdom which has a limited localStorage. The Zustand persist middleware
handles this gracefully, but if you see errors, ensure `tests/setup.ts` is loaded
via `setupFiles` in vitest.config.ts.

## Placeholder images vs real images

For development without the real PDFs:
```bash
tsx scripts/generate-placeholders.ts
```
This creates SVG files in `public/pages/`. They'll work with `<img>` tags but not `next/image`
in production. For production, convert real PDFs:
```bash
pnpm convert:pdfs
```

## Tailwind custom colours not working

Verify that `globals.css` is imported in `src/app/layout.tsx` and the CSS custom properties
(--color-bg, --color-surface, etc.) are defined there.

## Dark theme not applying

The app uses `class` strategy for dark mode. The ThemeProvider must add/remove `dark` or
`light` class on the `<html>` element. Dark is the default — the `:root` CSS variables
define the dark palette, and `.light` overrides them.

## Audio playback fails

The Al Quran Cloud API (api.alquran.cloud) may rate-limit or have downtime.
The AudioPlayer should show "Audio unavailable" with a retry button.
Verify the API is accessible: `curl https://api.alquran.cloud/v1/ayah/1:1/ar.alafasy`

## E2E tests timing out

Increase the timeout in `playwright.config.ts` or ensure the dev server starts:
```typescript
webServer: {
  command: 'pnpm dev',
  url: 'http://localhost:3000',
  timeout: 60_000,
},
```

## Build fails with "too many static pages"

The static export generates routes for all 1275 pages. This is expected to take
several minutes. Ensure your CI has enough memory (4GB+).
