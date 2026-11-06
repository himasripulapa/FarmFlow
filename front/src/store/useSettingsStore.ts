import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontSize = 'normal' | 'large' | 'huge';

interface SettingsState {
  theme: 'light' | 'dark';
  fontSize: FontSize;
  lowLiteracyMode: boolean;
  soundEnabled: boolean;
  hasPickedInitialLanguage: boolean;
  toggleTheme: () => void;
  setFontSize: (size: FontSize) => void;
  toggleLowLiteracyMode: () => void;
  toggleSound: () => void;
  setHasPickedInitialLanguage: (val: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      fontSize: 'normal',
      lowLiteracyMode: false,
      soundEnabled: true,
      hasPickedInitialLanguage: false,

      toggleTheme: () => set((state) => {
        const next = state.theme === 'light' ? 'dark' : 'light';
        if (next === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { theme: next };
      }),

      setFontSize: (fontSize) => set(() => {
        document.documentElement.dataset.fontSize = fontSize;
        return { fontSize };
      }),

      toggleLowLiteracyMode: () => set((state) => ({ lowLiteracyMode: !state.lowLiteracyMode })),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      setHasPickedInitialLanguage: (hasPickedInitialLanguage) => set({ hasPickedInitialLanguage })
    }),
    {
      name: 'farmflow_settings_store',
    }
  )
);
