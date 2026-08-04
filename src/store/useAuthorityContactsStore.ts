import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AUTHORITY_CONTACTS } from '@/constants/seedData';
import { asyncStorageAdapter } from '@/lib/storage/asyncStorageAdapter';
import { nowIso } from '@/lib/utils/date';
import { generateId } from '@/lib/utils/id';
import type { AuthorityContact, AuthorityMessageLog } from '@/models/AuthorityContact';

type AuthorityContactsState = {
  contacts: AuthorityContact[];
  messageLogs: AuthorityMessageLog[];

  sendMessage: (authorityContactId: string, message: string) => void;
};

export const useAuthorityContactsStore = create<AuthorityContactsState>()(
  persist(
    (set) => ({
      contacts: AUTHORITY_CONTACTS,
      messageLogs: [],

      sendMessage: (authorityContactId, message) => {
        const log: AuthorityMessageLog = {
          id: generateId(),
          authorityContactId,
          message,
          sentAt: nowIso(),
        };
        set((state) => ({ messageLogs: [log, ...state.messageLogs] }));
      },
    }),
    {
      name: 'safeline.authority-contacts',
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({ messageLogs: state.messageLogs }),
    }
  )
);
