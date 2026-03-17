'use client';

import { useAppStore } from '@/store/useAppStore';
import { usePageContext } from '@/hooks/use-page-context';

/**
 * Slide-up panel for translation content.
 * For v1, shows a placeholder message directing users to the page content.
 */
export function TranslationPanel() {
  const activePanel = useAppStore((s) => s.activePanel);
  const setActivePanel = useAppStore((s) => s.setActivePanel);
  const currentPage = useAppStore((s) => s.currentPage);
  const { primarySurah } = usePageContext(currentPage);

  if (activePanel !== 'translation') return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-panel bg-black/50 animate-fade-in"
        onClick={() => setActivePanel(null)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed right-0 bottom-0 left-0 z-panel max-h-[60vh] overflow-y-auto rounded-t-2xl bg-surface animate-slide-up"
        role="dialog"
        aria-label="Translation"
        data-testid="translation-panel"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-surface p-4">
          <h2 className="text-lg font-semibold text-primary">
            Translation — {primarySurah.surah_name}
          </h2>
          <button
            type="button"
            onClick={() => setActivePanel(null)}
            aria-label="Close translation panel"
            className="rounded-lg p-1 text-muted hover:bg-surface-hover hover:text-primary transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <p className="text-sm text-secondary">
            Translation is displayed alongside the Arabic text on each page.
            A dedicated text-only translation view is coming in a future update.
          </p>
        </div>
      </div>
    </>
  );
}
