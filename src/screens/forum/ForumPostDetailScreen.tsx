import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, FormScroll, Header, Screen, TextField } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import { relativeTime } from '@/lib/utils/date';
import { useForumStore } from '@/store/useForumStore';
import { colors, spacing, typography } from '@/theme';
import type { ForumStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ForumStackParamList, 'ForumPostDetail'>;

export function ForumPostDetailScreen({ navigation, route }: Props) {
  const { postId } = route.params;
  const post = useForumStore((state) => state.posts.find((item) => item.id === postId));
  const allComments = useForumStore((state) => state.comments);
  const comments = allComments.filter((comment) => comment.postId === postId);
  const addComment = useForumStore((state) => state.addComment);
  const toggleLike = useForumStore((state) => state.toggleLike);
  const [draft, setDraft] = useState('');

  if (!post) {
    navigation.goBack();
    return null;
  }

  const handleSend = () => {
    if (!draft.trim()) return;
    addComment(postId, draft.trim());
    setDraft('');
  };

  return (
    <Screen variant="plain">
      <Header title="Publicação" onBack={navigation.goBack} />
      <FormScroll contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.alias}>{post.authorAlias}</Text>
          <Text style={styles.time}>{relativeTime(post.createdAt)}</Text>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.content}</Text>

        <Pressable style={styles.likeRow} onPress={() => toggleLike(postId)}>
          <Ionicons
            name={post.likedByMe ? 'heart' : 'heart-outline'}
            size={18}
            color={post.likedByMe ? colors.danger.default : colors.text.secondary}
          />
          <Text style={styles.likeLabel}>{post.likesCount} apoios</Text>
        </Pressable>

        <Text style={styles.commentsTitle}>Comentários</Text>
        {comments.length === 0 ? (
          <Text style={styles.emptyComments}>Seja a primeira a comentar com apoio.</Text>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} style={styles.commentCard}>
              <Text style={styles.commentAlias}>{comment.authorAlias}</Text>
              <Text style={styles.commentBody}>{comment.content}</Text>
            </Card>
          ))
        )}

        <View style={styles.inputRow}>
          <View style={styles.inputWrapper}>
            <TextField
              placeholder="Escreva um comentário de apoio..."
              value={draft}
              onChangeText={setDraft}
            />
          </View>
          <Pressable testID="send-comment-button" style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={18} color={colors.text.onDark} />
          </Pressable>
        </View>
      </FormScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  alias: { ...typography.bodySmall, color: colors.primary.accent, fontWeight: '700' },
  time: { ...typography.caption, color: colors.text.secondary },
  title: { ...typography.heading2, color: colors.text.primary, marginBottom: spacing.sm },
  body: { ...typography.body, color: colors.text.secondary },
  likeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  likeLabel: { ...typography.bodySmall, color: colors.text.secondary },
  commentsTitle: {
    ...typography.heading3,
    color: colors.text.primary,
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  emptyComments: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  commentCard: { marginBottom: spacing.sm },
  commentAlias: {
    ...typography.caption,
    color: colors.primary.accent,
    fontWeight: '700',
    marginBottom: 2,
  },
  commentBody: { ...typography.bodySmall, color: colors.text.primary },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  inputWrapper: { flex: 1 },
  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
