---
paths:
  - "src/hooks/**/*.ts"
---
# Custom Hook Rules

- One hook per file
- Always provide explicit return type annotation
- JSDoc with `@param` and `@returns` descriptions
- Memoize expensive computations with `useMemo`
- Use `useCallback` for handlers passed to child components
- Never call hooks conditionally — follow Rules of Hooks
- Clean up side effects in `useEffect` return function

## Hook Pattern

```typescript
/**
 * Returns the surah and juz context for a given page number.
 * @param page - Current page number (1-1275)
 * @returns PageContext with surah info, juz number, and verse range
 */
export function usePageContext(page: number): PageContext {
  return useMemo(() => {
    const mapping = pageMap.find(p => p.page === page);
    if (!mapping) return DEFAULT_CONTEXT;
    return {
      primarySurah: mapping.content[0],
      juz: mapping.juz,
      page: mapping.page,
    };
  }, [page]);
}
```
