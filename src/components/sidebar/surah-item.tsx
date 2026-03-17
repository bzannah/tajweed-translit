'use client';

import { cn } from '@/lib/cn';
import type { Surah } from '@/lib/types';

/** Props for the SurahItem component. */
export interface SurahItemProps {
  /** Surah data */
  surah: Surah;
  /** Whether this is the currently active surah */
  isActive: boolean;
  /** Click handler for navigation */
  onClick: () => void;
}

/**
 * A single surah row in the sidebar list.
 * Shows number, revelation icon, English name, and starting page.
 */
export function SurahItem({ surah, isActive, onClick }: SurahItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${surah.name_english} - page ${surah.starting_page}`}
      className={cn(
        'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150',
        isActive
          ? 'border-l-[3px] border-l-accent text-accent'
          : 'border-l-[3px] border-l-transparent text-primary sidebar-item-hover'
      )}
      style={isActive ? { backgroundColor: 'rgba(214,168,83,0.08)' } : undefined}
    >
      {/* Number */}
      <span className="w-8 text-right text-sm text-muted">{surah.number}</span>

      {/* Revelation icon */}
      <span
        className={cn(
          'text-sm',
          surah.revelation_type === 'meccan' ? 'text-accent-green' : 'text-accent-amber'
        )}
        aria-label={surah.revelation_type === 'meccan' ? 'Meccan' : 'Medinan'}
      >
        {surah.revelation_type === 'meccan' ? '\u25C6' : '\u25C7'}
      </span>

      {/* Name */}
      <span className="flex-1 text-sm font-medium truncate">{surah.name_english}</span>

      {/* Page */}
      <span className="text-xs text-muted">{surah.starting_page}</span>
    </button>
  );
}
