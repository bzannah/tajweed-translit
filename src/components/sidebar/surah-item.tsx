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
 * Shows number, revelation dot, English name, and starting page.
 */
export function SurahItem({ surah, isActive, onClick }: SurahItemProps) {
  const isMeccan = surah.revelation_type === 'meccan';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${surah.name_english} - page ${surah.starting_page}`}
      title={isMeccan ? 'Meccan Surah' : 'Medinan Surah'}
      className={cn(
        'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150',
        isActive
          ? 'border-l-[3px] border-l-accent'
          : 'border-l-[3px] border-l-transparent sidebar-item-hover'
      )}
      style={isActive ? { backgroundColor: 'rgba(212,168,83,0.1)' } : undefined}
    >
      {/* Number */}
      <span className="w-8 text-right text-sm text-muted">{surah.number}</span>

      {/* Revelation dot */}
      <span
        className="flex-shrink-0 rounded-full"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: isMeccan ? '#4caf50' : '#c0862b',
        }}
        title={isMeccan ? 'Meccan' : 'Medinan'}
        aria-label={isMeccan ? 'Meccan' : 'Medinan'}
      />

      {/* Name */}
      <span className={cn('flex-1 text-sm font-medium truncate', isActive ? 'text-accent' : 'text-primary')}>
        {surah.name_english}
      </span>

      {/* Page */}
      <span className="text-muted" style={{ fontSize: '11px', opacity: 0.4 }}>{surah.starting_page}</span>
    </button>
  );
}
