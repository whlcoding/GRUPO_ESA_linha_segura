import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card, EmptyState, Header, Screen } from '@/components/ui';
import { relativeTime } from '@/lib/utils/date';
import { useChatStore } from '@/store/useChatStore';
import { colors, radii, spacing, typography } from '@/theme';
import type { ChatStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ChatStackParamList, 'ChatConversationsList'>;

export function ChatConversationsListScreen({ navigation }: Props) {
  const conversations = useChatStore((state) => state.conversations);

  return (
    <Screen variant="plain">
      <Header title="Chat Seguro" />
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {conversations.length === 0 ? (
          <EmptyState icon="🔐" title="Nenhuma conversa ainda" description="Suas conversas seguras aparecerão aqui." />
        ) : (
          conversations.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => navigation.navigate('ChatConversation', { conversationId: item.id })}
            >
              <Card style={styles.card}>
                <View style={styles.rowBetween}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.time}>{relativeTime(item.lastMessageAt)}</Text>
                </View>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <View style={styles.rowBetween}>
                  <Text style={styles.preview} numberOfLines={1}>
                    {item.lastMessagePreview}
                  </Text>
                  {item.unreadCount > 0 ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.unreadCount}</Text>
                    </View>
                  ) : null}
                </View>
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
  card: { marginBottom: spacing.md },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { ...typography.heading3, color: colors.text.primary },
  time: { ...typography.caption, color: colors.text.secondary },
  subtitle: { ...typography.caption, color: colors.primary.accent, marginTop: 2, marginBottom: spacing.xs },
  preview: { ...typography.bodySmall, color: colors.text.secondary, flex: 1 },
  badge: {
    backgroundColor: colors.danger.default,
    borderRadius: radii.pill,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: { ...typography.caption, color: colors.text.onDark, fontWeight: '700' },
});
