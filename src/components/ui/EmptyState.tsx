import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type EmptyStateProps = {
  icon?: string;
  title: string;
  description?: string;
};

export function EmptyState({ icon = '🗒️', title, description }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  icon: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.heading3,
    color: colors.text.primary,
    textAlign: 'center',
  },
  description: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
