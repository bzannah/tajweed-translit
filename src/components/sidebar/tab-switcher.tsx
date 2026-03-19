'use client';

import { useAppStore } from '@/store/useAppStore';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/cn';
import type { SidebarTab } from '@/lib/types';

const TABS: { id: SidebarTab; label: string }[] = [
  { id: 'suras', label: 'Suras' },
  { id: 'juz', label: 'Juz' },
  { id: 'bookmarks', label: 'Bookmarks' },
];

/**
 * Tab switcher for the sidebar with Suras, Juz, and Bookmarks tabs.
 * Active tab has gold text and a sliding underline indicator.
 */
export function TabSwitcher() {
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const bookmarkCount = useAppStore((s) => s.bookmarks.length);

  const activeIndex = TABS.findIndex((t) => t.id === activeTab);

  return (
    <div
      className="relative flex"
      style={{ background: 'rgba(0,0,0,0.08)' }}
      data-testid="tab-switcher"
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          aria-label={`${tab.label} tab`}
          aria-selected={activeTab === tab.id}
          role="tab"
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            'flex-1 py-2.5 text-center transition-colors duration-150',
            activeTab === tab.id
              ? 'text-accent'
              : 'text-muted hover:text-primary'
          )}
          style={{ fontSize: '13px', fontWeight: 500 }}
        >
          {tab.label}
          {tab.id === 'bookmarks' && <Badge count={bookmarkCount} />}
        </button>
      ))}

      {/* Sliding underline */}
      <span
        className="absolute bottom-0 h-[2px] bg-accent"
        style={{
          left: `${(activeIndex / TABS.length) * 100}%`,
          width: `${100 / TABS.length}%`,
          transition: 'left 250ms ease-out, width 250ms ease-out',
        }}
      />
    </div>
  );
}
