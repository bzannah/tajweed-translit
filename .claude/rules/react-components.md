---
paths:
  - "src/components/**/*.tsx"
---
# React Component Rules

- One component per file, except small tightly-coupled sub-components
- Define `{ComponentName}Props` interface above the component
- Destructure props in function signature
- Use Tailwind utility classes only — no inline styles, no CSS modules
- Use semantic colour tokens: `bg-surface`, `text-primary`, `text-muted`, `text-accent`
- Dark mode is the default — use `dark:` prefix for light-mode overrides
- Wrap interactive elements with proper `aria-label` and `role` attributes
- Use `React.memo` only after profiling shows unnecessary re-renders
- Keep components under 100 lines — extract sub-components if exceeding
- Access Zustand store via hooks: `const currentPage = useAppStore(s => s.currentPage)`
- Never pass store state as props more than 1 level deep — consume from store directly

## Example Component Structure

```tsx
interface SurahItemProps {
  /** Surah data to display */
  surah: Surah;
  /** Whether currently being read */
  isActive: boolean;
  /** Navigation callback */
  onSelect: (page: number) => void;
}

/** Renders a single surah row in the sidebar navigation. */
export function SurahItem({ surah, isActive, onSelect }: SurahItemProps): React.ReactElement {
  return (
    <button
      className={cn(
        "flex items-center gap-3 px-4 py-3 w-full text-left transition-colors",
        isActive ? "bg-surface-active text-accent" : "hover:bg-surface-hover text-primary"
      )}
      onClick={() => onSelect(surah.starting_page)}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="w-8 text-sm text-muted text-right">{surah.number}</span>
      <span className="text-sm font-medium flex-1">{surah.name_english}</span>
      <span className="text-xs text-muted">{surah.starting_page}</span>
    </button>
  );
}
```
