import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { asyncStorageAdapter } from '@/lib/storage/asyncStorageAdapter';
import { nowIso } from '@/lib/utils/date';
import { generateId } from '@/lib/utils/id';
import type { TrustedContact } from '@/models/TrustedContact';

type ContactInput = { name: string; phone: string; relationship: string; isPrimary: boolean };

type ContactsState = {
  contacts: TrustedContact[];

  addContact: (input: ContactInput) => void;
  updateContact: (id: string, input: ContactInput) => void;
  removeContact: (id: string) => void;
};

export const useContactsStore = create<ContactsState>()(
  persist(
    (set) => ({
      contacts: [],

      addContact: (input) => {
        const now = nowIso();
        const contact: TrustedContact = { id: generateId(), createdAt: now, updatedAt: now, ...input };
        set((state) => ({ contacts: [...state.contacts, contact] }));
      },

      updateContact: (id, input) => {
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            contact.id === id ? { ...contact, ...input, updatedAt: nowIso() } : contact
          ),
        }));
      },

      removeContact: (id) => {
        set((state) => ({ contacts: state.contacts.filter((contact) => contact.id !== id) }));
      },
    }),
    {
      name: 'safeline.contacts',
      storage: createJSONStorage(() => asyncStorageAdapter),
    }
  )
);
