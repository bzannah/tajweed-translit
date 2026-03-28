import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAppStore } from '@/store/useAppStore';
import { useKeyboardNav } from '@/hooks/use-keyboard-nav';

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

/** Helper to simulate a keydown event on window. */
function pressKey(key: string) {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
  window.dispatchEvent(event);
}

// --- Single mode navigation ---

describe('useKeyboardNav — single mode', () => {
  it('should advance one page on ArrowRight', () => {
    renderHook(() => useKeyboardNav(false));
    pressKey('ArrowRight');
    expect(useAppStore.getState().currentPage).toBe(101);
  });

  it('should advance one page on PageDown', () => {
    renderHook(() => useKeyboardNav(false));
    pressKey('PageDown');
    expect(useAppStore.getState().currentPage).toBe(101);
  });

  it('should go back one page on ArrowLeft', () => {
    renderHook(() => useKeyboardNav(false));
    pressKey('ArrowLeft');
    expect(useAppStore.getState().currentPage).toBe(99);
  });

  it('should go back one page on PageUp', () => {
    renderHook(() => useKeyboardNav(false));
    pressKey('PageUp');
    expect(useAppStore.getState().currentPage).toBe(99);
  });

  it('should navigate to page 1 on Home', () => {
    renderHook(() => useKeyboardNav(false));
    pressKey('Home');
    expect(useAppStore.getState().currentPage).toBe(1);
  });

  it('should navigate to page 1275 on End', () => {
    renderHook(() => useKeyboardNav(false));
    pressKey('End');
    expect(useAppStore.getState().currentPage).toBe(1275);
  });
});

// --- Dual mode navigation ---

describe('useKeyboardNav — dual mode', () => {
  it('should advance two pages on ArrowRight in dual mode', () => {
    renderHook(() => useKeyboardNav(true));
    pressKey('ArrowRight');
    expect(useAppStore.getState().currentPage).toBe(102);
  });

  it('should go back two pages on ArrowLeft in dual mode', () => {
    renderHook(() => useKeyboardNav(true));
    pressKey('ArrowLeft');
    expect(useAppStore.getState().currentPage).toBe(98);
  });
});

// --- Boundary behaviour ---

describe('useKeyboardNav — boundaries', () => {
  it('should not go below page 1', () => {
    useAppStore.setState({ currentPage: 1, lastReadPage: 1 });
    renderHook(() => useKeyboardNav(false));
    pressKey('ArrowLeft');
    expect(useAppStore.getState().currentPage).toBe(1);
  });

  it('should not go above page 1275', () => {
    useAppStore.setState({ currentPage: 1275, lastReadPage: 1275 });
    renderHook(() => useKeyboardNav(false));
    pressKey('ArrowRight');
    expect(useAppStore.getState().currentPage).toBe(1275);
  });
});

// --- Guard conditions ---

describe('useKeyboardNav — guards', () => {
  it('should not navigate when a panel is open', () => {
    useAppStore.setState({ activePanel: 'settings' });
    renderHook(() => useKeyboardNav(false));
    pressKey('ArrowRight');
    expect(useAppStore.getState().currentPage).toBe(100);
  });

  it('should not navigate when focus is on an input element', () => {
    renderHook(() => useKeyboardNav(false));
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);
    expect(useAppStore.getState().currentPage).toBe(100);
    document.body.removeChild(input);
  });

  it('should not navigate when focus is on a textarea element', () => {
    renderHook(() => useKeyboardNav(false));
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.focus();
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      bubbles: true,
      cancelable: true,
    });
    textarea.dispatchEvent(event);
    expect(useAppStore.getState().currentPage).toBe(100);
    document.body.removeChild(textarea);
  });

  it('should ignore unrecognized keys', () => {
    renderHook(() => useKeyboardNav(false));
    pressKey('a');
    pressKey('Enter');
    pressKey('Escape');
    expect(useAppStore.getState().currentPage).toBe(100);
  });
});

// --- Cleanup ---

describe('useKeyboardNav — cleanup', () => {
  it('should remove event listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useKeyboardNav(false));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    removeSpy.mockRestore();
  });
});
