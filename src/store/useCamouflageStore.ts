import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { asyncStorageAdapter } from '@/lib/storage/asyncStorageAdapter';
import type { FakeAppId } from '@/models/CamouflageSettings';

type CamouflageState = {
  enabled: boolean;
  selectedFakeAppId: FakeAppId;
  revealed: boolean;

  activate: (fakeAppId: FakeAppId) => void;
  deactivate: () => void;
  selectFakeApp: (fakeAppId: FakeAppId) => void;
  reveal: () => void;
  reengage: () => void;
};

export const useCamouflageStore = create<CamouflageState>()(
  persist(
    (set) => ({
      enabled: false,
      selectedFakeAppId: 'calculator',
      revealed: true,

      // Takes effect the next time the app backgrounds (see AppLockProvider.reengage) —
      // activating shouldn't instantly disguise the screen the user is already looking at.
      activate: (fakeAppId) => set({ enabled: true, selectedFakeAppId: fakeAppId }),
      deactivate: () => set({ enabled: false, revealed: true }),
      selectFakeApp: (fakeAppId) => set({ selectedFakeAppId: fakeAppId }),
      reveal: () => set({ revealed: true }),
      reengage: () => set((state) => (state.enabled ? { revealed: false } : state)),
    }),
    {
      name: 'safeline.camouflage',
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({ enabled: state.enabled, selectedFakeAppId: state.selectedFakeAppId }),
    }
  )
);
