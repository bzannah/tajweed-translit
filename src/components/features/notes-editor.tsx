'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Modal } from '@/components/ui/modal';

/**
 * Modal dialog for editing notes on the current page.
 * Pre-fills with existing note content. Saving empty text removes the note.
 */
export function NotesEditor() {
  const activePanel = useAppStore((s) => s.activePanel);
  const setActivePanel = useAppStore((s) => s.setActivePanel);
  const currentPage = useAppStore((s) => s.currentPage);
  const getNoteForPage = useAppStore((s) => s.getNoteForPage);
  const addNote = useAppStore((s) => s.addNote);
  const removeNote = useAppStore((s) => s.removeNote);

  const existingNote = getNoteForPage(currentPage);
  const [content, setContent] = useState(existingNote?.content ?? '');

  // Sync content when page changes or panel opens
  useEffect(() => {
    if (activePanel === 'notes') {
      const note = getNoteForPage(currentPage);
      setContent(note?.content ?? '');
    }
  }, [activePanel, currentPage, getNoteForPage]);

  if (activePanel !== 'notes') return null;

  const handleSave = () => {
    const trimmed = content.trim();
    if (trimmed) {
      addNote(currentPage, trimmed);
    } else if (existingNote) {
      removeNote(existingNote.id);
    }
    setActivePanel(null);
  };

  const handleCancel = () => {
    setActivePanel(null);
  };

  return (
    <Modal
      isOpen
      onClose={handleCancel}
      title={`Notes — Page ${currentPage}`}
      maxWidth="max-w-lg"
    >
      <div data-testid="notes-editor">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add your notes for this page..."
          rows={4}
          className="w-full resize-none rounded-lg border border-border bg-bg p-3 text-sm text-primary placeholder-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
          aria-label="Page notes"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg px-4 py-2 text-sm text-muted hover:bg-surface-hover hover:text-primary transition-colors"
            aria-label="Cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity"
            aria-label="Save note"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
