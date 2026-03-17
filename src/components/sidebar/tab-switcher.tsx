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
 * Active tab has gold text and bottom border.
 */
export function TabSwitcher() {
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const bookmarkCount = useAppStore((s) => s.bookmarks.length);

  return (
    <div className="flex border-b border-border" data-testid="tab-switcher">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          aria-label={`${tab.label} tab`}
          aria-selected={activeTab === tab.id}
          role="tab"
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            'flex-1 py-2.5 text-center text-sm font-medium transition-colors duration-150',
            activeTab === tab.id
              ? 'border-b-2 border-accent text-accent'
              : 'text-muted hover:text-primary'
          )}
        >
          {tab.label}
          {tab.id === 'bookmarks' && <Badge count={bookmarkCount} />}
        </button>
      ))}
    </div>
  );
}
