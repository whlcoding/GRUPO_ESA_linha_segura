import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';

import { Button, FormScroll, Header, Screen, TextField } from '@/components/ui';
import { formatDate, nowIso } from '@/lib/utils/date';
import { useDiaryStore } from '@/store/useDiaryStore';
import { colors, spacing, typography } from '@/theme';
import type { HomeStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'DiaryEntryForm'>;

export function DiaryEntryFormScreen({ navigation, route }: Props) {
  const { entryId } = route.params;
  const existingEntry = useDiaryStore((state) =>
    state.entries.find((entry) => entry.id === entryId)
  );
  const addEntry = useDiaryStore((state) => state.addEntry);
  const updateEntry = useDiaryStore((state) => state.updateEntry);
  const removeEntry = useDiaryStore((state) => state.removeEntry);

  const [title, setTitle] = useState(existingEntry?.title ?? '');
  const [content, setContent] = useState(existingEntry?.content ?? '');

  const canSubmit = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    if (existingEntry) {
      updateEntry(existingEntry.id, {
        title: title.trim(),
        content: content.trim(),
        occurredAt: existingEntry.occurredAt,
      });
    } else {
      addEntry({ title: title.trim(), content: content.trim(), occurredAt: nowIso() });
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    if (!existingEntry) return;
    Alert.alert('Excluir registro', 'Tem certeza que deseja excluir este registro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          removeEntry(existingEntry.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Screen variant="plain">
      <Header title={existingEntry ? 'Editar registro' : 'Novo registro'} onBack={navigation.goBack} />
      <FormScroll contentContainerStyle={styles.content}>
        {existingEntry ? (
          <Text style={styles.date}>{formatDate(existingEntry.occurredAt)}</Text>
        ) : null}
        <TextField label="Título" placeholder="O que aconteceu?" value={title} onChangeText={setTitle} />
        <TextField
          label="Detalhes"
          placeholder="Descreva com o máximo de detalhes que conseguir: data, local, o que foi dito ou feito..."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={8}
          style={styles.textArea}
        />
        <Button variant="primary" onPress={handleSubmit} disabled={!canSubmit}>
          Salvar registro
        </Button>
        {existingEntry ? (
          <Button variant="ghost" onPress={handleDelete} style={styles.deleteButton}>
            Excluir registro
          </Button>
        ) : null}
      </FormScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl },
  date: {
    ...typography.caption,
    color: colors.primary.accent,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  textArea: {
    height: 180,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
  deleteButton: { marginTop: spacing.md },
});
