---
paths:
  - "src/app/**/*.tsx"
---
# Next.js App Router Rules

- Page components must use `export default` (Next.js requirement)
- Layout components must use `export default`
- Use `generateStaticParams` for static generation of `/page/[number]` routes
- Use `generateMetadata` for dynamic page titles and descriptions
- Always validate dynamic route params — redirect invalid page numbers
- Use `notFound()` from `next/navigation` for truly invalid routes
- Import global CSS only in root `layout.tsx`
- Use `next/image` for all page images — set `priority={true}` for visible pages
- Use `next/link` for internal navigation where possible
- Use `useRouter` from `next/navigation` for programmatic navigation
- Do NOT use `useRouter` from `next/router` (that's Pages Router)
- Server Components by default — add `'use client'` only when using hooks, state, or event handlers
