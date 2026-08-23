import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BearState } from '../types';

export type ScreenState = 'welcome' | 'permission' | 'experience' | 'finale' | 'guide';

interface SecretsState {
  currentScreen: ScreenState;
  setScreen: (screen: ScreenState) => void;
  
  discoveredSecrets: string[];
  addDiscoveredSecret: (id: string) => void;
  
  currentBearState: BearState;
  setBearState: (state: BearState) => void;
  
  currentMessage: string | null;
  setCurrentMessage: (msg: string | null) => void;
  
  isFinaleTriggered: boolean;
  triggerFinale: () => void;
  
  hasSkippedCamera: boolean;
  setHasSkippedCamera: (skipped: boolean) => void;
  
  appMode: 'soul' | 'heart' | 'sparkle' | 'dream';
  setAppMode: (mode: 'soul' | 'heart' | 'sparkle' | 'dream') => void;
  
  reset: () => void;
}

export const useSecretsStore = create<SecretsState>()(
  persist(
    (set) => ({
      currentScreen: 'welcome',
      setScreen: (screen) => set({ currentScreen: screen }),
      
      discoveredSecrets: [],
      addDiscoveredSecret: (id) => set((state) => {
        if (!state.discoveredSecrets.includes(id)) {
          return { discoveredSecrets: [...state.discoveredSecrets, id] };
        }
        return state;
      }),
      
      currentBearState: 'idle',
      setBearState: (state) => set({ currentBearState: state }),
      
      currentMessage: null,
      setCurrentMessage: (msg) => set({ currentMessage: msg }),
      
      isFinaleTriggered: false,
      triggerFinale: () => set({ isFinaleTriggered: true }),

      hasSkippedCamera: false,
      setHasSkippedCamera: (skipped) => set({ hasSkippedCamera: skipped }),
      
      appMode: 'soul',
      setAppMode: (mode) => set({ appMode: mode }),
      
      reset: () => set((state) => ({ 
        currentScreen: 'welcome', 
        discoveredSecrets: [], 
        currentBearState: 'idle', 
        currentMessage: null, 
        isFinaleTriggered: false,
        hasSkippedCamera: false
        // we intentionally do not reset appMode here, so it persists across resets
      }))
    }),
    {
      name: 'aisha-teddy-storage',
      partialize: (state) => ({ 
        discoveredSecrets: state.discoveredSecrets,
        isFinaleTriggered: state.isFinaleTriggered,
        hasSkippedCamera: state.hasSkippedCamera,
        appMode: state.appMode
      }),
    }
  )
);
