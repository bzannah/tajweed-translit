import { cn } from '@/lib/cn';

/** Props for the Badge component. */
export interface BadgeProps {
  /** Number to display. Hidden when count is 0. */
  count: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A small rounded pill displaying a count number.
 * Commonly used on sidebar tabs to show bookmark count.
 */
export function Badge({ count, className }: BadgeProps) {
  if (count === 0) return null;

  return (
    <span
      className={cn(
        'ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-medium text-bg',
        className
      )}
    >
      {count}
    </span>
  );
}
