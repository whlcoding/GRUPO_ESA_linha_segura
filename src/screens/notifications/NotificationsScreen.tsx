import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card, EmptyState, Header, Screen } from '@/components/ui';
import { relativeTime } from '@/lib/utils/date';
import { useNotificationsStore } from '@/store/useNotificationsStore';
import { colors, spacing, typography } from '@/theme';
import type { HomeStackParamList } from '@/navigation/types';
import type { NotificationType } from '@/models/NotificationItem';

type Props = NativeStackScreenProps<HomeStackParamList, 'Notifications'>;

const ICONS: Record<NotificationType, keyof typeof Ionicons.glyphMap> = {
  forum: 'people-circle',
  chat: 'chatbubble-ellipses',
  security: 'shield-checkmark',
  system: 'information-circle',
};

export function NotificationsScreen({ navigation }: Props) {
  const notifications = useNotificationsStore((state) => state.notifications);
  const markAsRead = useNotificationsStore((state) => state.markAsRead);
  const markAllAsRead = useNotificationsStore((state) => state.markAllAsRead);

  return (
    <Screen variant="plain">
      <Header
        title="Notificações"
        onBack={navigation.goBack}
        right={
          notifications.some((item) => !item.read) ? (
            <Pressable onPress={markAllAsRead}>
              <Text style={styles.markAllLabel}>Marcar todas</Text>
            </Pressable>
          ) : null
        }
      />
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <EmptyState icon="🔔" title="Nenhuma notificação" description="Você está em dia." />
        ) : (
          notifications.map((item) => (
            <Pressable key={item.id} onPress={() => markAsRead(item.id)}>
              <Card style={[styles.card, !item.read && styles.cardUnread]}>
                <View style={styles.iconBadge}>
                  <Ionicons name={ICONS[item.type]} size={18} color={colors.primary.default} />
                </View>
                <View style={styles.info}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.body}>{item.body}</Text>
                  <Text style={styles.time}>{relativeTime(item.createdAt)}</Text>
                </View>
                {!item.read ? <View style={styles.dot} /> : null}
              </Card>
            </Pressable>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.xl, flexGrow: 1 },
  markAllLabel: { ...typography.caption, color: colors.primary.accent, fontWeight: '700' },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  cardUnread: {
    borderWidth: 1,
    borderColor: colors.primary.accent,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  title: { ...typography.heading3, color: colors.text.primary },
  body: { ...typography.bodySmall, color: colors.text.secondary, marginTop: 2 },
  time: { ...typography.caption, color: colors.text.secondary, marginTop: spacing.xs },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger.default,
    marginTop: 6,
  },
});
