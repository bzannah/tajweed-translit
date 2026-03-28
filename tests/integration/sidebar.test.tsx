import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAppStore } from '@/store/useAppStore';
import { TabSwitcher } from '@/components/sidebar/tab-switcher';
import { SurahItem } from '@/components/sidebar/surah-item';
import { SurahList } from '@/components/sidebar/surah-list';
import { JuzList } from '@/components/sidebar/juz-list';
import { BookmarkList } from '@/components/sidebar/bookmark-list';
import type { Surah } from '@/lib/types';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/page/1',
}));

// Mock scrollIntoView (not available in jsdom)
Element.prototype.scrollIntoView = vi.fn();

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
    sidebarOpen: true,
    activeTab: 'suras',
    activePanel: null,
  });
});

// --- TabSwitcher ---

describe('TabSwitcher', () => {
  it('should render all three tabs', () => {
    render(<TabSwitcher />);
    expect(screen.getByRole('tab', { name: /suras tab/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /juz tab/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /bookmarks tab/i })).toBeInTheDocument();
  });

  it('should mark the active tab as selected', () => {
    render(<TabSwitcher />);
    const surasTab = screen.getByRole('tab', { name: /suras tab/i });
    expect(surasTab).toHaveAttribute('aria-selected', 'true');
  });

  it('should switch active tab on click', () => {
    render(<TabSwitcher />);
    const juzTab = screen.getByRole('tab', { name: /juz tab/i });
    fireEvent.click(juzTab);
    expect(useAppStore.getState().activeTab).toBe('juz');
  });

  it('should show bookmark count badge when bookmarks exist', () => {
    useAppStore.getState().addBookmark(42, 'Al-Baqara', 2);
    useAppStore.getState().addBookmark(100, 'An-Nisa', 4);
    render(<TabSwitcher />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should not show badge when bookmark count is zero', () => {
    const { container } = render(<TabSwitcher />);
    const badge = container.querySelector('[data-testid="badge"]');
    expect(badge).toBeNull();
  });
});

// --- SurahItem ---

describe('SurahItem', () => {
  const mockSurah: Surah = {
    number: 1,
    name_english: 'Al-Fatiha',
    name_arabic: 'الفاتحة',
    name_meaning: 'The Opening',
    revelation_type: 'meccan',
    starting_page: 1,
    total_verses: 7,
  };

  it('should render surah number, name, and page', () => {
    render(<SurahItem surah={mockSurah} isActive={false} onClick={vi.fn()} />);
    expect(screen.getByText('Al-Fatiha')).toBeInTheDocument();
    expect(screen.getByLabelText('Al-Fatiha - page 1')).toBeInTheDocument();
  });

  it('should display green dot for Meccan surahs', () => {
    render(<SurahItem surah={mockSurah} isActive={false} onClick={vi.fn()} />);
    expect(screen.getByTitle('Meccan')).toBeInTheDocument();
  });

  it('should display amber dot for Medinan surahs', () => {
    const medinanSurah: Surah = { ...mockSurah, revelation_type: 'medinan' };
    render(<SurahItem surah={medinanSurah} isActive={false} onClick={vi.fn()} />);
    expect(screen.getByTitle('Medinan')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<SurahItem surah={mockSurah} isActive={false} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have accent text when active', () => {
    render(<SurahItem surah={mockSurah} isActive={true} onClick={vi.fn()} />);
    const nameEl = screen.getByText('Al-Fatiha');
    expect(nameEl.className).toContain('text-accent');
  });
});

// --- SurahList ---

describe('SurahList', () => {
  it('should render all 114 surahs', () => {
    render(<SurahList />);
    const list = screen.getByTestId('surah-list');
    const buttons = list.querySelectorAll('button');
    expect(buttons).toHaveLength(114);
  });

  it('should highlight the active surah for the current page', () => {
    useAppStore.setState({ currentPage: 50 });
    render(<SurahList />);
    const activeItem = document.querySelector('[data-active-surah="true"]');
    expect(activeItem).toBeTruthy();
  });

  it('should update current page when a surah is clicked', () => {
    render(<SurahList />);
    const buttons = screen.getByTestId('surah-list').querySelectorAll('button');
    fireEvent.click(buttons[1]);
    const { currentPage } = useAppStore.getState();
    expect(currentPage).toBeGreaterThanOrEqual(2);
  });
});

// --- JuzList ---

describe('JuzList', () => {
  it('should render all 30 juz items', () => {
    render(<JuzList />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(30);
  });

  it('should navigate to juz starting page on click', () => {
    render(<JuzList />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);
    const { currentPage } = useAppStore.getState();
    expect(currentPage).toBeGreaterThan(1);
  });
});

// --- BookmarkList ---

describe('BookmarkList', () => {
  it('should show empty state when no bookmarks exist', () => {
    render(<BookmarkList />);
    expect(screen.getByTestId('bookmark-list-empty')).toBeInTheDocument();
  });

  it('should render bookmarks when they exist', () => {
    useAppStore.getState().addBookmark(42, 'Al-Baqara', 2);
    useAppStore.getState().addBookmark(100, 'An-Nisa', 4);
    render(<BookmarkList />);
    expect(screen.getByText(/Page 42/)).toBeInTheDocument();
    expect(screen.getByText(/Page 100/)).toBeInTheDocument();
  });

  it('should navigate to bookmarked page on click', () => {
    useAppStore.getState().addBookmark(42, 'Al-Baqara', 2);
    render(<BookmarkList />);
    const bookmarkBtn = screen.getByLabelText(/Go to page 42/);
    fireEvent.click(bookmarkBtn);
    expect(useAppStore.getState().currentPage).toBe(42);
  });

  it('should remove bookmark when delete button is clicked', () => {
    useAppStore.getState().addBookmark(42, 'Al-Baqara', 2);
    render(<BookmarkList />);
    const deleteBtn = screen.getByLabelText(/delete bookmark/i);
    fireEvent.click(deleteBtn);
    expect(useAppStore.getState().bookmarks).toHaveLength(0);
  });
});
