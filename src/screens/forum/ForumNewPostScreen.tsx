import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { Button, FormScroll, Header, Screen, TextField } from '@/components/ui';
import { useForumStore } from '@/store/useForumStore';
import { colors, spacing, typography } from '@/theme';
import type { ForumStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ForumStackParamList, 'ForumNewPost'>;

export function ForumNewPostScreen({ navigation }: Props) {
  const addPost = useForumStore((state) => state.addPost);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const canSubmit = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    addPost(title.trim(), content.trim());
    navigation.goBack();
  };

  return (
    <Screen variant="plain">
      <Header title="Nova publicação" onBack={navigation.goBack} />
      <FormScroll contentContainerStyle={styles.content}>
        <Text style={styles.hint}>
          No fórum, você é sempre Anônima. Seu nome real, e-mail e outros dados não são
          compartilhados.
        </Text>
        <TextField label="Título" placeholder="Do que você quer falar?" value={title} onChangeText={setTitle} />
        <TextField
          label="Sua mensagem"
          placeholder="Compartilhe o que quiser, com calma..."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={6}
          style={styles.textArea}
        />
        <Button variant="primary" onPress={handleSubmit} disabled={!canSubmit}>
          Publicar anonimamente
        </Button>
      </FormScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl },
  hint: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  textArea: {
    height: 140,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
});
