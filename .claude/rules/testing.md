---
paths:
  - "**/*.test.*"
  - "tests/**/*"
---
# Testing Rules

- Use `describe`/`it` blocks with behaviour-focused names
- Test names: `it('should clamp page to 1 when given 0')`
- One behaviour per test
- No snapshot tests — they provide false confidence
- No network calls in unit tests — mock external dependencies
- Mock Zustand with `useAppStore.setState()` for predictable state
- For component tests, use React Testing Library: `render`, `screen`, `fireEvent`, `waitFor`
- Test user-visible behaviour, not implementation details
- Use `vi.fn()` for callback spies
- Use `beforeEach` to reset store state between tests

## Test File Pattern

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '@/store/useAppStore';

describe('bookmarkSlice', () => {
  beforeEach(() => {
    useAppStore.setState({ bookmarks: [] });
  });

  it('should add a bookmark for the given page', () => {
    const { addBookmark } = useAppStore.getState();
    addBookmark(42, 'Al-Baqara', 2);
    const { bookmarks } = useAppStore.getState();
    expect(bookmarks).toHaveLength(1);
    expect(bookmarks[0].page).toBe(42);
  });

  it('should not duplicate bookmarks for the same page', () => {
    const { addBookmark } = useAppStore.getState();
    addBookmark(42, 'Al-Baqara', 2);
    addBookmark(42, 'Al-Baqara', 2);
    expect(useAppStore.getState().bookmarks).toHaveLength(1);
  });
});
```
