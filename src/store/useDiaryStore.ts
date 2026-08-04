import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { asyncStorageAdapter } from '@/lib/storage/asyncStorageAdapter';
import { nowIso } from '@/lib/utils/date';
import { generateId } from '@/lib/utils/id';
import type { DiaryEntry } from '@/models/DiaryEntry';

type DiaryState = {
  entries: DiaryEntry[];

  addEntry: (input: { title: string; content: string; occurredAt: string }) => void;
  updateEntry: (id: string, input: { title: string; content: string; occurredAt: string }) => void;
  removeEntry: (id: string) => void;
};

export const useDiaryStore = create<DiaryState>()(
  persist(
    (set) => ({
      entries: [],

      addEntry: ({ title, content, occurredAt }) => {
        const now = nowIso();
        const entry: DiaryEntry = {
          id: generateId(),
          title,
          content,
          occurredAt,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ entries: [entry, ...state.entries] }));
      },

      updateEntry: (id, { title, content, occurredAt }) => {
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === id ? { ...entry, title, content, occurredAt, updatedAt: nowIso() } : entry
          ),
        }));
      },

      removeEntry: (id) => {
        set((state) => ({ entries: state.entries.filter((entry) => entry.id !== id) }));
      },
    }),
    {
      name: 'safeline.diary',
      storage: createJSONStorage(() => asyncStorageAdapter),
    }
  )
);
