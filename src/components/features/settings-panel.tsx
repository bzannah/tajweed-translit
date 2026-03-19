'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Modal } from '@/components/ui/modal';
import { cn } from '@/lib/cn';
import type { DisplayMode, Theme } from '@/lib/types';

/**
 * Settings modal with theme toggle, display mode, and data management.
 * Opens when the Settings button in the bottom bar is pressed.
 */
export function SettingsPanel() {
  const activePanel = useAppStore((s) => s.activePanel);
  const setActivePanel = useAppStore((s) => s.setActivePanel);
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const displayMode = useAppStore((s) => s.displayMode);
  const setDisplayMode = useAppStore((s) => s.setDisplayMode);
  const clearBookmarks = useAppStore((s) => s.clearBookmarks);
  const clearNotes = useAppStore((s) => s.clearNotes);

  const [confirmAction, setConfirmAction] = useState<'bookmarks' | 'notes' | null>(null);

  if (activePanel !== 'settings') return null;

  const handleClose = () => {
    setConfirmAction(null);
    setActivePanel(null);
  };

  const handleClearConfirm = () => {
    if (confirmAction === 'bookmarks') clearBookmarks();
    if (confirmAction === 'notes') clearNotes();
    setConfirmAction(null);
  };

  const themeOptions: { value: Theme; label: string }[] = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
  ];

  const displayOptions: { value: DisplayMode; label: string }[] = [
    { value: 'single', label: 'Single' },
    { value: 'dual', label: 'Dual' },
    { value: 'auto', label: 'Auto' },
  ];

  return (
    <Modal isOpen onClose={handleClose} title="Settings" maxWidth="max-w-sm">
      <div className="space-y-6" data-testid="settings-panel">
        {/* Theme */}
        <div>
          <h3 className="mb-2 text-sm font-medium text-secondary">Theme</h3>
          <div className="flex gap-2">
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTheme(opt.value)}
                aria-label={`Set theme to ${opt.label}`}
                className={cn(
                  'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  theme === opt.value
                    ? 'bg-accent text-bg'
                    : 'bg-surface-hover text-primary hover:bg-surface-active'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Display Mode */}
        <div>
          <h3 className="mb-2 text-sm font-medium text-secondary">Page Display</h3>
          <div className="flex gap-2">
            {displayOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDisplayMode(opt.value)}
                aria-label={`Set display mode to ${opt.label}`}
                className={cn(
                  'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  displayMode === opt.value
                    ? 'bg-accent text-bg'
                    : 'bg-surface-hover text-primary hover:bg-surface-active'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div>
          <h3 className="mb-2 text-sm font-medium text-secondary">Data</h3>
          <div className="space-y-2">
            {confirmAction ? (
              <div className="rounded-lg border border-danger p-3">
                <p className="mb-2 text-sm text-primary">
                  Are you sure? This cannot be undone.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleClearConfirm}
                    className="rounded-lg bg-danger px-4 py-1.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                    aria-label="Confirm delete"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmAction(null)}
                    className="rounded-lg bg-surface-hover px-4 py-1.5 text-sm text-primary hover:bg-surface-active transition-colors"
                    aria-label="Cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setConfirmAction('bookmarks')}
                  className="w-full rounded-lg border border-danger px-4 py-2 text-sm text-danger hover:bg-danger hover:text-white transition-colors"
                  aria-label="Clear all bookmarks"
                >
                  Clear All Bookmarks
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmAction('notes')}
                  className="w-full rounded-lg border border-danger px-4 py-2 text-sm text-danger hover:bg-danger hover:text-white transition-colors"
                  aria-label="Clear all notes"
                >
                  Clear All Notes
                </button>
              </>
            )}
          </div>
        </div>

        {/* About */}
        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted">Quran Tajweed Transliteration v1.0</p>
          <p className="text-xs text-muted">Quran transliteration reader with Tajweed colour coding</p>
        </div>
      </div>
    </Modal>
  );
}
