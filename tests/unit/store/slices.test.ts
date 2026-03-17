import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '@/store/useAppStore';

// Reset store before each test
beforeEach(() => {
  useAppStore.setState({
    currentPage: 1,
    lastReadPage: 1,
    bookmarks: [],
    notes: [],
    theme: 'dark',
    displayMode: 'auto',
    zoomLevel: 100,
    audioReciter: 'ar.alafasy',
    sidebarOpen: false,
    activeTab: 'suras',
    activePanel: null,
  });
});

// ─── Navigation Slice ───────────────────────────────────────

describe('navigationSlice', () => {
  it('should set current page and update lastReadPage', () => {
    useAppStore.getState().setCurrentPage(42);
    const { currentPage, lastReadPage } = useAppStore.getState();
    expect(currentPage).toBe(42);
    expect(lastReadPage).toBe(42);
  });

  it('should clamp page to minimum 1', () => {
    useAppStore.getState().setCurrentPage(0);
    expect(useAppStore.getState().currentPage).toBe(1);

    useAppStore.getState().setCurrentPage(-5);
    expect(useAppStore.getState().currentPage).toBe(1);
  });

  it('should clamp page to maximum 1275', () => {
    useAppStore.getState().setCurrentPage(9999);
    expect(useAppStore.getState().currentPage).toBe(1275);
  });
});

// ─── Bookmark Slice ─────────────────────────────────────────

describe('bookmarkSlice', () => {
  it('should add a bookmark', () => {
    useAppStore.getState().addBookmark(42, 'Al-Baqara', 2);
    const { bookmarks } = useAppStore.getState();
    expect(bookmarks).toHaveLength(1);
    expect(bookmarks[0].page).toBe(42);
    expect(bookmarks[0].surah_name).toBe('Al-Baqara');
    expect(bookmarks[0].surah_number).toBe(2);
    expect(bookmarks[0].id).toBeDefined();
    expect(bookmarks[0].created_at).toBeDefined();
  });

  it('should not duplicate bookmarks for the same page', () => {
    useAppStore.getState().addBookmark(42, 'Al-Baqara', 2);
    useAppStore.getState().addBookmark(42, 'Al-Baqara', 2);
    expect(useAppStore.getState().bookmarks).toHaveLength(1);
  });

  it('should remove a bookmark by id', () => {
    useAppStore.getState().addBookmark(42, 'Al-Baqara', 2);
    const id = useAppStore.getState().bookmarks[0].id;
    useAppStore.getState().removeBookmark(id);
    expect(useAppStore.getState().bookmarks).toHaveLength(0);
  });

  it('should check if a page is bookmarked', () => {
    useAppStore.getState().addBookmark(42, 'Al-Baqara', 2);
    expect(useAppStore.getState().isBookmarked(42)).toBe(true);
    expect(useAppStore.getState().isBookmarked(43)).toBe(false);
  });

  it('should clear all bookmarks', () => {
    useAppStore.getState().addBookmark(1, 'Al-Fatiha', 1);
    useAppStore.getState().addBookmark(42, 'Al-Baqara', 2);
    useAppStore.getState().clearBookmarks();
    expect(useAppStore.getState().bookmarks).toHaveLength(0);
  });

  it('should add newest bookmark first', () => {
    useAppStore.getState().addBookmark(10, 'A', 1);
    useAppStore.getState().addBookmark(20, 'B', 2);
    const { bookmarks } = useAppStore.getState();
    expect(bookmarks[0].page).toBe(20);
    expect(bookmarks[1].page).toBe(10);
  });
});

// ─── Notes Slice ────────────────────────────────────────────

describe('notesSlice', () => {
  it('should add a note for a page', () => {
    useAppStore.getState().addNote(42, 'My note');
    const { notes } = useAppStore.getState();
    expect(notes).toHaveLength(1);
    expect(notes[0].page).toBe(42);
    expect(notes[0].content).toBe('My note');
  });

  it('should not add empty notes', () => {
    useAppStore.getState().addNote(42, '   ');
    expect(useAppStore.getState().notes).toHaveLength(0);
  });

  it('should replace existing note for the same page', () => {
    useAppStore.getState().addNote(42, 'First note');
    useAppStore.getState().addNote(42, 'Updated note');
    const { notes } = useAppStore.getState();
    expect(notes).toHaveLength(1);
    expect(notes[0].content).toBe('Updated note');
  });

  it('should get note for a specific page', () => {
    useAppStore.getState().addNote(42, 'Page 42 note');
    const note = useAppStore.getState().getNoteForPage(42);
    expect(note?.content).toBe('Page 42 note');
    expect(useAppStore.getState().getNoteForPage(43)).toBeUndefined();
  });

  it('should update a note by id', () => {
    useAppStore.getState().addNote(42, 'Original');
    const id = useAppStore.getState().notes[0].id;
    useAppStore.getState().updateNote(id, 'Updated');
    expect(useAppStore.getState().notes[0].content).toBe('Updated');
  });

  it('should remove a note when updated with empty content', () => {
    useAppStore.getState().addNote(42, 'Will be removed');
    const id = useAppStore.getState().notes[0].id;
    useAppStore.getState().updateNote(id, '');
    expect(useAppStore.getState().notes).toHaveLength(0);
  });

  it('should remove a note by id', () => {
    useAppStore.getState().addNote(42, 'To delete');
    const id = useAppStore.getState().notes[0].id;
    useAppStore.getState().removeNote(id);
    expect(useAppStore.getState().notes).toHaveLength(0);
  });

  it('should clear all notes', () => {
    useAppStore.getState().addNote(1, 'Note 1');
    useAppStore.getState().addNote(2, 'Note 2');
    useAppStore.getState().clearNotes();
    expect(useAppStore.getState().notes).toHaveLength(0);
  });
});

// ─── Settings Slice ─────────────────────────────────────────

describe('settingsSlice', () => {
  it('should set theme', () => {
    useAppStore.getState().setTheme('light');
    expect(useAppStore.getState().theme).toBe('light');
    useAppStore.getState().setTheme('dark');
    expect(useAppStore.getState().theme).toBe('dark');
  });

  it('should set display mode', () => {
    useAppStore.getState().setDisplayMode('dual');
    expect(useAppStore.getState().displayMode).toBe('dual');
    useAppStore.getState().setDisplayMode('single');
    expect(useAppStore.getState().displayMode).toBe('single');
  });

  it('should set zoom level and clamp to range', () => {
    useAppStore.getState().setZoomLevel(150);
    expect(useAppStore.getState().zoomLevel).toBe(150);

    useAppStore.getState().setZoomLevel(10);
    expect(useAppStore.getState().zoomLevel).toBe(50); // MIN_ZOOM

    useAppStore.getState().setZoomLevel(500);
    expect(useAppStore.getState().zoomLevel).toBe(200); // MAX_ZOOM
  });
});

// ─── UI Slice ───────────────────────────────────────────────

describe('uiSlice', () => {
  it('should toggle sidebar', () => {
    expect(useAppStore.getState().sidebarOpen).toBe(false);
    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(true);
    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(false);
  });

  it('should set active tab', () => {
    useAppStore.getState().setActiveTab('juz');
    expect(useAppStore.getState().activeTab).toBe('juz');
  });

  it('should set active panel', () => {
    useAppStore.getState().setActivePanel('explanation');
    expect(useAppStore.getState().activePanel).toBe('explanation');
    useAppStore.getState().setActivePanel(null);
    expect(useAppStore.getState().activePanel).toBeNull();
  });

  it('should toggle panel open and closed', () => {
    useAppStore.getState().togglePanel('settings');
    expect(useAppStore.getState().activePanel).toBe('settings');
    useAppStore.getState().togglePanel('settings');
    expect(useAppStore.getState().activePanel).toBeNull();
  });

  it('should switch panel when toggling a different one', () => {
    useAppStore.getState().togglePanel('settings');
    useAppStore.getState().togglePanel('explanation');
    expect(useAppStore.getState().activePanel).toBe('explanation');
  });
});
