'use client';

import { cn } from '@/lib/cn';
import type { Juz } from '@/lib/types';

/** Props for the JuzItem component. */
export interface JuzItemProps {
  /** Juz data */
  juz: Juz;
  /** Whether this is the currently active juz */
  isActive: boolean;
  /** Click handler for navigation */
  onClick: () => void;
}

/**
 * A single juz row in the sidebar list.
 * Shows juz number, Arabic name, and starting page.
 */
export function JuzItem({ juz, isActive, onClick }: JuzItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Juz ${juz.number} - page ${juz.starting_page}`}
      className={cn(
        'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150',
        isActive
          ? 'bg-surface-active text-accent'
          : 'text-primary hover:bg-surface-hover'
      )}
    >
      <span className="w-8 text-right text-sm text-muted">{juz.number}</span>
      <span className="flex-1 text-sm font-medium" dir="rtl">{juz.name_arabic}</span>
      <span className="text-xs text-muted">{juz.starting_page}</span>
    </button>
  );
}
