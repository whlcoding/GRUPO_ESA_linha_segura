import { Pressable, StyleSheet, Text } from 'react-native';

import { Card } from '@/components/ui';
import { formatDate } from '@/lib/utils/date';
import type { DiaryEntry } from '@/models/DiaryEntry';
import { colors, spacing, typography } from '@/theme';

export function DiaryEntryCard({ entry, onPress }: { entry: DiaryEntry; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card}>
        <Text style={styles.date}>{formatDate(entry.occurredAt)}</Text>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.content} numberOfLines={2}>
          {entry.content}
        </Text>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  date: {
    ...typography.caption,
    color: colors.primary.accent,
    fontWeight: '700',
    marginBottom: spacing.xs,
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
});
