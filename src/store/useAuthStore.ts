import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { authenticateWithBiometrics, isBiometricsAvailable } from '@/lib/auth/biometrics';
import { hashSecret, verifySecret } from '@/lib/auth/secret';
import { asyncStorageAdapter } from '@/lib/storage/asyncStorageAdapter';
import { credentialStore } from '@/lib/storage/secureStore';
import { nowIso } from '@/lib/utils/date';
import { generateId } from '@/lib/utils/id';
import type { UserProfile } from '@/models/User';

type AuthState = {
  profile: UserProfile | null;
  biometricsEnabled: boolean;
  lgpdConsentAcceptedAt: string | null;
  hasAccount: boolean;
  isUnlocked: boolean;
  failedPinAttempts: number;
  hasHydrated: boolean;

  registerProfile: (input: { name: string; email: string; phone: string }) => void;
  setPassword: (password: string) => Promise<void>;
  setPin: (pin: string) => Promise<void>;
  acceptLgpdConsent: () => void;
  setBiometricsEnabled: (enabled: boolean) => void;

  login: (email: string, password: string) => Promise<boolean>;
  unlockWithPin: (pin: string) => Promise<boolean>;
  unlockWithBiometrics: () => Promise<boolean>;
  lock: () => void;
  resetAccount: () => Promise<void>;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      profile: null,
      biometricsEnabled: false,
      lgpdConsentAcceptedAt: null,
      hasAccount: false,
      isUnlocked: false,
      failedPinAttempts: 0,
      hasHydrated: false,

      registerProfile: ({ name, email, phone }) => {
        set({ profile: { id: generateId(), name, email, phone } });
      },

      setPassword: async (password) => {
        const { hash, salt } = await hashSecret(password);
        await credentialStore.save('password', hash, salt);
      },

      setPin: async (pin) => {
        const { hash, salt } = await hashSecret(pin);
        await credentialStore.save('pin', hash, salt);
      },

      acceptLgpdConsent: () => {
        set({ lgpdConsentAcceptedAt: nowIso(), hasAccount: true, isUnlocked: true });
      },

      setBiometricsEnabled: (enabled) => set({ biometricsEnabled: enabled }),

      login: async (email, password) => {
        const { profile } = get();
        if (!profile || profile.email.toLowerCase() !== email.trim().toLowerCase()) return false;

        const stored = await credentialStore.read('password');
        if (!stored) return false;

        const valid = await verifySecret(password, stored.hash, stored.salt);
        if (valid) set({ isUnlocked: true, failedPinAttempts: 0 });
        return valid;
      },

      unlockWithPin: async (pin) => {
        const stored = await credentialStore.read('pin');
        if (!stored) return false;

        const valid = await verifySecret(pin, stored.hash, stored.salt);
        if (valid) {
          set({ isUnlocked: true, failedPinAttempts: 0 });
        } else {
          set((state) => ({ failedPinAttempts: state.failedPinAttempts + 1 }));
        }
        return valid;
      },

      unlockWithBiometrics: async () => {
        if (!get().biometricsEnabled) return false;
        const available = await isBiometricsAvailable();
        if (!available) return false;

        const success = await authenticateWithBiometrics('Desbloqueie o Safe Line');
        if (success) set({ isUnlocked: true, failedPinAttempts: 0 });
        return success;
      },

      lock: () => set({ isUnlocked: false }),

      resetAccount: async () => {
        await credentialStore.clearAll();
        set({
          profile: null,
          biometricsEnabled: false,
          lgpdConsentAcceptedAt: null,
          hasAccount: false,
          isUnlocked: false,
          failedPinAttempts: 0,
        });
      },

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'safeline.auth',
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        profile: state.profile,
        biometricsEnabled: state.biometricsEnabled,
        lgpdConsentAcceptedAt: state.lgpdConsentAcceptedAt,
        hasAccount: state.hasAccount,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
