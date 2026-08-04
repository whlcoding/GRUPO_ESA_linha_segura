import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { asyncStorageAdapter } from '@/lib/storage/asyncStorageAdapter';
import { nowIso } from '@/lib/utils/date';
import { generateId } from '@/lib/utils/id';
import type { EmergencyAlert } from '@/models/EmergencyAlert';

type EmergencyState = {
  alerts: EmergencyAlert[];
  activeAlertId: string | null;

  triggerAlert: () => string;
  cancelAlert: (id: string) => void;
  confirmAlertSent: (id: string) => void;
};

export const useEmergencyStore = create<EmergencyState>()(
  persist(
    (set) => ({
      alerts: [],
      activeAlertId: null,

      triggerAlert: () => {
        const id = generateId();
        const alert: EmergencyAlert = {
          id,
          triggeredAt: nowIso(),
          cancelledAt: null,
          status: 'sent',
        };
        set((state) => ({ alerts: [alert, ...state.alerts], activeAlertId: id }));
        return id;
      },

      cancelAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, status: 'cancelled', cancelledAt: nowIso() } : alert
          ),
          activeAlertId: state.activeAlertId === id ? null : state.activeAlertId,
        }));
      },

      confirmAlertSent: (id) => {
        set((state) => ({
          activeAlertId: state.activeAlertId === id ? null : state.activeAlertId,
        }));
      },
    }),
    {
      name: 'safeline.emergency',
      storage: createJSONStorage(() => asyncStorageAdapter),
    }
  )
);
