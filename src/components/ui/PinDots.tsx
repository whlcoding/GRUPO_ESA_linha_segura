import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

type PinDotsProps = {
  length: number;
  filled: number;
  error?: boolean;
};

export function PinDots({ length, filled, error }: PinDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index < filled && styles.dotFilled,
            error && styles.dotError,
          ]}
        />
      ))}
    </View>
  );
}

const DOT_SIZE = 16;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.lg,
    justifyContent: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 1.5,
    borderColor: colors.text.onDarkMuted,
  },
  dotFilled: {
    backgroundColor: colors.text.onDark,
    borderColor: colors.text.onDark,
  },
  dotError: {
    borderColor: colors.danger.default,
    backgroundColor: colors.danger.default,
  },
});
