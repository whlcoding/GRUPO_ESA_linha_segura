import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui';
import { relativeTime } from '@/lib/utils/date';
import type { ForumPost } from '@/models/Forum';
import { colors, spacing, typography } from '@/theme';

type ForumPostCardProps = {
  post: ForumPost;
  commentsCount: number;
  onPress: () => void;
  onToggleLike: () => void;
};

export function ForumPostCard({ post, commentsCount, onPress, onToggleLike }: ForumPostCardProps) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.alias}>{post.authorAlias}</Text>
          <Text style={styles.time}>{relativeTime(post.createdAt)}</Text>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.content} numberOfLines={3}>
          {post.content}
        </Text>
        <View style={styles.footer}>
          <Pressable style={styles.footerItem} onPress={onToggleLike} hitSlop={8}>
            <Ionicons
              name={post.likedByMe ? 'heart' : 'heart-outline'}
              size={16}
              color={post.likedByMe ? colors.danger.default : colors.text.secondary}
            />
            <Text style={styles.footerText}>{post.likesCount}</Text>
          </Pressable>
          <View style={styles.footerItem}>
            <Ionicons name="chatbubble-outline" size={15} color={colors.text.secondary} />
            <Text style={styles.footerText}>{commentsCount}</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  alias: {
    ...typography.caption,
    color: colors.primary.accent,
    fontWeight: '700',
  },
  time: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  title: {
    ...typography.heading3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  content: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.md,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});
