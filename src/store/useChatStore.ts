import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { SEED_CHAT_CONVERSATIONS, SEED_CHAT_MESSAGES } from '@/constants/seedData';
import { asyncStorageAdapter } from '@/lib/storage/asyncStorageAdapter';
import { nowIso } from '@/lib/utils/date';
import { generateId } from '@/lib/utils/id';
import type { ChatConversation, ChatMessage } from '@/models/Chat';

const AUTO_REPLIES = [
  'Obrigada por compartilhar. Estou aqui com você.',
  'Você não está sozinha nisso. Pode me contar mais?',
  'Recebido. Se precisar de ajuda imediata, use o botão de emergência no início.',
  'Estou aqui para te ouvir sempre que precisar.',
];

type ChatState = {
  conversations: ChatConversation[];
  messages: ChatMessage[];

  sendMessage: (conversationId: string, text: string) => void;
  markAsRead: (conversationId: string) => void;
  clearHistory: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      conversations: SEED_CHAT_CONVERSATIONS,
      messages: SEED_CHAT_MESSAGES,

      sendMessage: (conversationId, text) => {
        const message: ChatMessage = {
          id: generateId(),
          conversationId,
          sender: 'me',
          text,
          sentAt: nowIso(),
        };

        set((state) => ({
          messages: [...state.messages, message],
          conversations: state.conversations.map((conversation) =>
            conversation.id === conversationId
              ? { ...conversation, lastMessagePreview: text, lastMessageAt: message.sentAt }
              : conversation
          ),
        }));

        setTimeout(() => {
          const reply: ChatMessage = {
            id: generateId(),
            conversationId,
            sender: 'other',
            text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
            sentAt: nowIso(),
          };
          set((state) => ({
            messages: [...state.messages, reply],
            conversations: state.conversations.map((conversation) =>
              conversation.id === conversationId
                ? {
                    ...conversation,
                    lastMessagePreview: reply.text,
                    lastMessageAt: reply.sentAt,
                    unreadCount: conversation.unreadCount + 1,
                  }
                : conversation
            ),
          }));
        }, 1200);
      },

      markAsRead: (conversationId) => {
        set((state) => ({
          conversations: state.conversations.map((conversation) =>
            conversation.id === conversationId ? { ...conversation, unreadCount: 0 } : conversation
          ),
        }));
      },

      clearHistory: () => set({ conversations: SEED_CHAT_CONVERSATIONS, messages: SEED_CHAT_MESSAGES }),
    }),
    {
      name: 'safeline.chat',
      storage: createJSONStorage(() => asyncStorageAdapter),
    }
  )
);
