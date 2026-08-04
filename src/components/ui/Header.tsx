import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type HeaderProps = {
  title: string;
  onBack?: () => void;
  variant?: 'light' | 'dark';
  right?: React.ReactNode;
};

export function Header({ title, onBack, variant = 'light', right }: HeaderProps) {
  const textColor = variant === 'dark' ? colors.text.onDark : colors.text.primary;

  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color={textColor} />
            <Text style={[styles.backLabel, { color: textColor }]}>Voltar</Text>
          </Pressable>
        ) : null}
      </View>
      <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.side, styles.rightSide]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  side: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
    justifyContent: 'flex-end',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backLabel: {
    ...typography.body,
    marginLeft: 2,
  },
  title: {
    ...typography.heading3,
    textAlign: 'center',
    flex: 2,
  },
});
