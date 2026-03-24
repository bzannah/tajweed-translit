'use client';

import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/cn';
import type { FeaturePanel } from '@/lib/types';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  panel: FeaturePanel;
}

/** A single action button in the bottom bar. */
function ActionButton({ icon, label, panel }: ActionButtonProps) {
  const activePanel = useAppStore((s) => s.activePanel);
  const togglePanel = useAppStore((s) => s.togglePanel);
  const isActive = activePanel === panel;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => togglePanel(panel)}
      className={cn(
        'flex flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 transition-all duration-150',
        'min-w-[48px] min-h-[48px]',
        isActive ? 'text-accent' : 'text-muted hover:text-primary'
      )}
      style={isActive ? { boxShadow: '0 0 10px rgba(214,168,83,0.25)' } : undefined}
    >
      {icon}
      <span
        className={cn('action-btn-label uppercase', isActive ? 'text-accent' : 'text-muted')}
        style={{ fontSize: '11px', letterSpacing: '0.04em' }}
      >
        {label}
      </span>
    </button>
  );
}

/**
 * Fixed bottom action bar with feature buttons.
 * Height: 64px. Contains 4 evenly-spaced action buttons.
 * Glass effect with frosted background and gold accent border.
 */
export function BottomBar() {
  return (
    <nav
      className="grid h-bottombar flex-shrink-0 bottom-bar-glass z-sidebar mx-auto w-full"
      style={{ gridTemplateColumns: 'repeat(4, 1fr)', placeItems: 'center', maxWidth: '500px' }}
      data-testid="bottom-bar"
    >
      <ActionButton
        panel="explanation"
        label="Explanation"
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
          </svg>
        }
      />
      <ActionButton
        panel="translation"
        label="Translation"
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
        }
      />
      <ActionButton
        panel="audio"
        label="Listen"
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        }
      />
      <ActionButton
        panel="settings"
        label="Settings"
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        }
      />
    </nav>
  );
}
