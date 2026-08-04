export type ChatMessage = {
  id: string;
  conversationId: string;
  sender: 'me' | 'other';
  text: string;
  sentAt: string;
};

export type ChatConversation = {
  id: string;
  title: string;
  subtitle: string;
  lastMessagePreview: string;
  lastMessageAt: string;
  unreadCount: number;
};
