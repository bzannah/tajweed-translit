import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAppStore } from '@/store/useAppStore';
import { useSwipeNav } from '@/hooks/use-swipe-nav';
import { createRef } from 'react';

// Reset store before each test
beforeEach(() => {
  useAppStore.setState({
    currentPage: 100,
    lastReadPage: 100,
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

/** Helper to simulate a swipe gesture on an element. */
function simulateSwipe(
  el: HTMLElement,
  startX: number,
  startY: number,
  endX: number,
  endY: number
) {
  const touchStartEvent = new TouchEvent('touchstart', {
    touches: [{ clientX: startX, clientY: startY } as Touch],
    bubbles: true,
  });
  const touchEndEvent = new TouchEvent('touchend', {
    changedTouches: [{ clientX: endX, clientY: endY } as Touch],
    bubbles: true,
  });

  el.dispatchEvent(touchStartEvent);
  el.dispatchEvent(touchEndEvent);
}

// --- Swipe navigation ---

describe('useSwipeNav — single mode', () => {
  it('should go to next page on swipe left', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const ref = createRef<HTMLElement>();
    (ref as { current: HTMLElement }).current = container;

    renderHook(() => useSwipeNav(false, ref));

    // Swipe left: start at x=200, end at x=100 (deltaX = -100)
    simulateSwipe(container, 200, 100, 100, 100);

    expect(useAppStore.getState().currentPage).toBe(101);
    document.body.removeChild(container);
  });

  it('should go to previous page on swipe right', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const ref = createRef<HTMLElement>();
    (ref as { current: HTMLElement }).current = container;

    renderHook(() => useSwipeNav(false, ref));

    // Swipe right: start at x=100, end at x=200 (deltaX = +100)
    simulateSwipe(container, 100, 100, 200, 100);

    expect(useAppStore.getState().currentPage).toBe(99);
    document.body.removeChild(container);
  });
});

describe('useSwipeNav — dual mode', () => {
  it('should advance two pages on swipe left in dual mode', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const ref = createRef<HTMLElement>();
    (ref as { current: HTMLElement }).current = container;

    renderHook(() => useSwipeNav(true, ref));

    simulateSwipe(container, 200, 100, 100, 100);

    expect(useAppStore.getState().currentPage).toBe(102);
    document.body.removeChild(container);
  });
});

// --- Threshold and guard conditions ---

describe('useSwipeNav — guards', () => {
  it('should ignore swipes shorter than the threshold (30px)', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const ref = createRef<HTMLElement>();
    (ref as { current: HTMLElement }).current = container;

    renderHook(() => useSwipeNav(false, ref));

    // Swipe only 20px — below threshold
    simulateSwipe(container, 200, 100, 180, 100);

    expect(useAppStore.getState().currentPage).toBe(100);
    document.body.removeChild(container);
  });

  it('should ignore swipes with large vertical deviation (>80px)', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const ref = createRef<HTMLElement>();
    (ref as { current: HTMLElement }).current = container;

    renderHook(() => useSwipeNav(false, ref));

    // Horizontal swipe is sufficient but vertical deviation is too large
    simulateSwipe(container, 200, 100, 100, 200);

    expect(useAppStore.getState().currentPage).toBe(100);
    document.body.removeChild(container);
  });

  it('should not navigate when a panel is open', () => {
    useAppStore.setState({ activePanel: 'explanation' });
    const container = document.createElement('div');
    document.body.appendChild(container);
    const ref = createRef<HTMLElement>();
    (ref as { current: HTMLElement }).current = container;

    renderHook(() => useSwipeNav(false, ref));

    simulateSwipe(container, 200, 100, 100, 100);

    expect(useAppStore.getState().currentPage).toBe(100);
    document.body.removeChild(container);
  });
});

// --- Boundary behaviour ---

describe('useSwipeNav — boundaries', () => {
  it('should not go below page 1', () => {
    useAppStore.setState({ currentPage: 1, lastReadPage: 1 });
    const container = document.createElement('div');
    document.body.appendChild(container);
    const ref = createRef<HTMLElement>();
    (ref as { current: HTMLElement }).current = container;

    renderHook(() => useSwipeNav(false, ref));

    // Swipe right (previous page)
    simulateSwipe(container, 100, 100, 200, 100);

    expect(useAppStore.getState().currentPage).toBe(1);
    document.body.removeChild(container);
  });

  it('should not go above page 1275', () => {
    useAppStore.setState({ currentPage: 1275, lastReadPage: 1275 });
    const container = document.createElement('div');
    document.body.appendChild(container);
    const ref = createRef<HTMLElement>();
    (ref as { current: HTMLElement }).current = container;

    renderHook(() => useSwipeNav(false, ref));

    // Swipe left (next page)
    simulateSwipe(container, 200, 100, 100, 100);

    expect(useAppStore.getState().currentPage).toBe(1275);
    document.body.removeChild(container);
  });
});

// --- Cleanup ---

describe('useSwipeNav — cleanup', () => {
  it('should remove event listeners on unmount', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const removeSpy = vi.spyOn(container, 'removeEventListener');
    const ref = createRef<HTMLElement>();
    (ref as { current: HTMLElement }).current = container;

    const { unmount } = renderHook(() => useSwipeNav(false, ref));
    unmount();

    expect(removeSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('touchend', expect.any(Function));
    removeSpy.mockRestore();
    document.body.removeChild(container);
  });
});
