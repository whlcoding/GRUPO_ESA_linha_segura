import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';

import { EmptyState, Fab, Header, Screen } from '@/components/ui';
import { ForumPostCard } from '@/components/domain/ForumPostCard';
import { useForumStore } from '@/store/useForumStore';
import { spacing } from '@/theme';
import type { ForumStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ForumStackParamList, 'ForumList'>;

export function ForumListScreen({ navigation }: Props) {
  const posts = useForumStore((state) => state.posts);
  const comments = useForumStore((state) => state.comments);
  const toggleLike = useForumStore((state) => state.toggleLike);

  return (
    <Screen variant="plain">
      <Header title="Fórum de Apoio" />
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {posts.length === 0 ? (
          <EmptyState
            icon="💬"
            title="Nenhuma publicação ainda"
            description="Seja a primeira a compartilhar algo com a comunidade."
          />
        ) : (
          posts.map((post) => (
            <ForumPostCard
              key={post.id}
              post={post}
              commentsCount={comments.filter((comment) => comment.postId === post.id).length}
              onPress={() => navigation.navigate('ForumPostDetail', { postId: post.id })}
              onToggleLike={() => toggleLike(post.id)}
            />
          ))
        )}
      </ScrollView>
      <Fab testID="forum-new-post-fab" onPress={() => navigation.navigate('ForumNewPost')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.xl,
    paddingBottom: 100,
    flexGrow: 1,
  },
});
