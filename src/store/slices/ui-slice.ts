import type { StateCreator } from 'zustand';
import type { SidebarTab, FeaturePanel } from '@/lib/types';

export interface UiSlice {
  /** Whether the sidebar is open */
  sidebarOpen: boolean;
  /** Active sidebar tab */
  activeTab: SidebarTab;
  /** Currently open feature panel (or null) */
  activePanel: FeaturePanel;
  /** Toggle or set sidebar visibility */
  setSidebarOpen: (open: boolean) => void;
  /** Toggle sidebar open/closed */
  toggleSidebar: () => void;
  /** Set the active sidebar tab */
  setActiveTab: (tab: SidebarTab) => void;
  /** Set the active feature panel. Pass null to close all panels. */
  setActivePanel: (panel: FeaturePanel) => void;
  /** Toggle a feature panel — opens if closed, closes if already open. */
  togglePanel: (panel: FeaturePanel) => void;
}

export const createUiSlice: StateCreator<UiSlice, [], [], UiSlice> = (
  set,
  get
) => ({
  sidebarOpen: false,
  activeTab: 'suras',
  activePanel: null,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setActivePanel: (panel) => set({ activePanel: panel }),

  togglePanel: (panel) => {
    const current = get().activePanel;
    set({ activePanel: current === panel ? null : panel });
  },
});
