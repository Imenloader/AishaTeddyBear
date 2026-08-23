import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BearState } from '../types';

export type ScreenState = 'intro' | 'welcome' | 'permission' | 'experience' | 'finale' | 'guide';

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
  
  seenFinales: string[];
  addSeenFinale: (id: string) => void;
  
  completedModes: string[];
  addCompletedMode: (mode: string) => void;
  resetModeProgress: (mode: string) => void;
  
  hasSkippedCamera: boolean;
  setHasSkippedCamera: (skipped: boolean) => void;
  
  appMode: 'soul' | 'heart' | 'sparkle' | 'dream';
  setAppMode: (mode: 'soul' | 'heart' | 'sparkle' | 'dream') => void;
  
  reset: () => void;
  
  messageLikes: Record<string, number>;
  likeMessage: (msg: string) => void;
}

export const useSecretsStore = create<SecretsState>()(
  persist(
    (set) => ({
      currentScreen: 'intro',
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

      seenFinales: [],
      addSeenFinale: (id) => set((state) => {
        const currentSeen = state.seenFinales || [];
        return {
          seenFinales: currentSeen.includes(id) ? currentSeen : [...currentSeen, id]
        };
      }),

      completedModes: [],
      addCompletedMode: (mode) => set((state) => {
        const currentCompleted = state.completedModes || [];
        return {
          completedModes: currentCompleted.includes(mode) ? currentCompleted : [...currentCompleted, mode]
        };
      }),
      resetModeProgress: (mode) => set((state) => ({
        discoveredSecrets: (state.discoveredSecrets || []).filter(id => !id.startsWith(`${mode}_`)),
        seenFinales: (state.seenFinales || []).filter(id => !id.startsWith(`${mode}_`))
      })),

      hasSkippedCamera: false,
      setHasSkippedCamera: (skipped) => set({ hasSkippedCamera: skipped }),
      
      appMode: 'soul',
      setAppMode: (mode) => set({ appMode: mode }),
      
      reset: () => set((state) => ({ 
        currentScreen: 'welcome', 
        currentBearState: 'idle', 
        currentMessage: null, 
        isFinaleTriggered: false,
        hasSkippedCamera: false
        // we intentionally do not reset appMode or discoveredSecrets here, so they persist
      })),
      
      messageLikes: {},
      likeMessage: (msg) => set((state) => ({
        messageLikes: {
          ...state.messageLikes,
          [msg]: (state.messageLikes[msg] || 0) + 1
        }
      }))
    }),
    {
      name: 'aisha-teddy-storage',
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        isFinaleTriggered: false // Force false on load to escape legacy loops
      }),
      partialize: (state) => ({ 
        discoveredSecrets: state.discoveredSecrets || [],
        seenFinales: state.seenFinales || [],
        completedModes: state.completedModes || [],
        hasSkippedCamera: state.hasSkippedCamera,
        appMode: state.appMode,
        messageLikes: state.messageLikes || {}
      }),
    }
  )
);
