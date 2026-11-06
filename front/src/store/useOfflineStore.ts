import { create } from 'zustand';

interface OfflineState {
  isOffline: boolean;
  queuedActionsCount: number;
  toggleOffline: () => void;
  incrementQueue: () => void;
  clearQueue: () => void;
}

export const useOfflineStore = create<OfflineState>((set) => ({
  isOffline: false,
  queuedActionsCount: 0,
  toggleOffline: () => set((state) => ({ isOffline: !state.isOffline })),
  incrementQueue: () => set((state) => ({ queuedActionsCount: state.queuedActionsCount + 1 })),
  clearQueue: () => set({ queuedActionsCount: 0 })
}));
