import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { SEED_NOTIFICATIONS } from '@/constants/seedData';
import { asyncStorageAdapter } from '@/lib/storage/asyncStorageAdapter';
import type { NotificationItem } from '@/models/NotificationItem';

type NotificationsState = {
  notifications: NotificationItem[];

  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
};

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set) => ({
      notifications: SEED_NOTIFICATIONS,

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((item) =>
            item.id === id ? { ...item, read: true } : item
          ),
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((item) => ({ ...item, read: true })),
        }));
      },
    }),
    {
      name: 'safeline.notifications',
      storage: createJSONStorage(() => asyncStorageAdapter),
    }
  )
);
