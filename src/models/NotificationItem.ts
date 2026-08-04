export type NotificationType = 'forum' | 'chat' | 'security' | 'system';

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
};
