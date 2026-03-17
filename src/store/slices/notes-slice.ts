import type { StateCreator } from 'zustand';
import type { Note } from '@/lib/types';

export interface NotesSlice {
  /** All user notes */
  notes: Note[];
  /** Add a new note for a page. Replaces existing note for that page. */
  addNote: (page: number, content: string) => void;
  /** Update an existing note's content by ID. */
  updateNote: (id: string, content: string) => void;
  /** Remove a note by its ID. */
  removeNote: (id: string) => void;
  /** Get the note for a specific page, if one exists. */
  getNoteForPage: (page: number) => Note | undefined;
  /** Remove all notes. */
  clearNotes: () => void;
}

export const createNotesSlice: StateCreator<
  NotesSlice,
  [],
  [],
  NotesSlice
> = (set, get) => ({
  notes: [],

  addNote: (page, content) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const existing = get().notes.find((n) => n.page === page);
    if (existing) {
      // Update existing note
      set((state) => ({
        notes: state.notes.map((n) =>
          n.id === existing.id
            ? { ...n, content: trimmed, updated_at: new Date().toISOString() }
            : n
        ),
      }));
      return;
    }

    const now = new Date().toISOString();
    const note: Note = {
      id: crypto.randomUUID(),
      page,
      content: trimmed,
      created_at: now,
      updated_at: now,
    };

    set((state) => ({
      notes: [...state.notes, note],
    }));
  },

  updateNote: (id, content) => {
    const trimmed = content.trim();
    if (!trimmed) {
      // Empty content removes the note
      get().removeNote(id);
      return;
    }
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id
          ? { ...n, content: trimmed, updated_at: new Date().toISOString() }
          : n
      ),
    }));
  },

  removeNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    }));
  },

  getNoteForPage: (page) => {
    return get().notes.find((n) => n.page === page);
  },

  clearNotes: () => {
    set({ notes: [] });
  },
});
