'use client';

import { useAppStore } from '@/store/useAppStore';
import { tajweedRules } from '@/data/tajweed-rules';

/**
 * Slide-up panel displaying all Tajweed colour-coding rules.
 * Each rule shows a colour swatch, name, duration, and description.
 */
export function ExplanationPanel() {
  const activePanel = useAppStore((s) => s.activePanel);
  const setActivePanel = useAppStore((s) => s.setActivePanel);

  if (activePanel !== 'explanation') return null;

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
        aria-label="Tajweed Rules"
        data-testid="explanation-panel"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-surface p-4">
          <h2 className="text-lg font-semibold text-primary">Tajweed Rules</h2>
          <button
            type="button"
            onClick={() => setActivePanel(null)}
            aria-label="Close explanation panel"
            className="rounded-lg p-1 text-muted hover:bg-surface-hover hover:text-primary transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Rules list */}
        <div className="p-4 space-y-3">
          {tajweedRules.map((rule) => (
            <div key={rule.id} className="flex items-start gap-3">
              {/* Colour swatch */}
              <span
                className="mt-0.5 h-8 w-8 shrink-0 rounded-full border border-border"
                style={{ backgroundColor: rule.colour }}
                aria-hidden="true"
              />

              {/* Text */}
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-primary">{rule.name}</span>
                  {rule.duration && (
                    <span className="text-xs text-accent">{rule.duration}</span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-secondary">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
