import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAppStore } from '@/store/useAppStore';
import { PageImage } from '@/components/viewer/page-image';
import { DualPageSpread } from '@/components/viewer/dual-page-spread';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/page/1',
}));

// Reset store before each test
beforeEach(() => {
  useAppStore.setState({
    currentPage: 42,
    lastReadPage: 42,
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

// --- PageImage ---

describe('PageImage', () => {
  it('should render an image with the correct source path', () => {
    render(<PageImage page={42} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/pages-reinked/42.webp');
  });

  it('should include descriptive alt text with surah name', () => {
    render(<PageImage page={42} />);
    const img = screen.getByRole('img');
    const alt = img.getAttribute('alt') || '';
    expect(alt).toContain('transliteration');
    expect(alt).toContain('page 42');
  });

  it('should render with correct test id', () => {
    render(<PageImage page={42} />);
    expect(screen.getByTestId('page-image-42')).toBeInTheDocument();
  });

  it('should show loading skeleton before image loads', () => {
    const { container } = render(<PageImage page={42} />);
    const skeleton = container.querySelector('.page-skeleton');
    expect(skeleton).toBeTruthy();
  });

  it('should show error placeholder when image fails to load', () => {
    render(<PageImage page={42} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(screen.getByText('Page could not be loaded')).toBeInTheDocument();
    expect(screen.getByLabelText('Retry loading page')).toBeInTheDocument();
  });

  it('should retry loading when retry button is clicked', () => {
    render(<PageImage page={42} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(screen.getByText('Page could not be loaded')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Retry loading page'));
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.queryByText('Page could not be loaded')).toBeNull();
  });

  it('should hide skeleton after image loads', () => {
    const { container } = render(<PageImage page={42} />);
    const img = screen.getByRole('img');
    fireEvent.load(img);
    const skeleton = container.querySelector('.page-skeleton');
    expect(skeleton).toBeNull();
  });

  it('should have correct dimensions on the image element', () => {
    render(<PageImage page={42} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('width', '800');
    expect(img).toHaveAttribute('height', '1133');
  });
});

// --- DualPageSpread ---

describe('DualPageSpread', () => {
  it('should render two pages for an odd page number', () => {
    render(<DualPageSpread page={5} />);
    expect(screen.getByTestId('page-image-5')).toBeInTheDocument();
    expect(screen.getByTestId('page-image-6')).toBeInTheDocument();
  });

  it('should render two pages for an even page number', () => {
    render(<DualPageSpread page={6} />);
    expect(screen.getByTestId('page-image-5')).toBeInTheDocument();
    expect(screen.getByTestId('page-image-6')).toBeInTheDocument();
  });

  it('should render single page for last page (1275 is odd with no partner)', () => {
    render(<DualPageSpread page={1275} />);
    expect(screen.getByTestId('page-image-1275')).toBeInTheDocument();
    expect(screen.queryByTestId('page-image-1276')).toBeNull();
  });

  it('should render book gutter between pages', () => {
    const { container } = render(<DualPageSpread page={5} />);
    const gutter = container.querySelector('.book-gutter');
    expect(gutter).toBeTruthy();
  });
});
