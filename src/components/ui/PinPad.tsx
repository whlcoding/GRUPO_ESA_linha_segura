import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type PinPadProps = {
  onDigit: (digit: string) => void;
  onBackspace: () => void;
  variant?: 'light' | 'dark';
  extraKey?: { icon: keyof typeof Ionicons.glyphMap; onPress: () => void };
};

const ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

export function PinPad({ onDigit, onBackspace, variant = 'dark', extraKey }: PinPadProps) {
  const color = variant === 'dark' ? colors.text.onDark : colors.text.primary;

  return (
    <View style={styles.container}>
      {ROWS.map((row) => (
        <View key={row.join('')} style={styles.row}>
          {row.map((digit) => (
            <Pressable
              key={digit}
              onPress={() => onDigit(digit)}
              style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
            >
              <Text style={[styles.keyLabel, { color }]}>{digit}</Text>
            </Pressable>
          ))}
        </View>
      ))}
      <View style={styles.row}>
        {extraKey ? (
          <Pressable onPress={extraKey.onPress} style={styles.key}>
            <Ionicons name={extraKey.icon} size={22} color={color} />
          </Pressable>
        ) : (
          <View style={styles.key} />
        )}
        <Pressable
          onPress={() => onDigit('0')}
          style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
        >
          <Text style={[styles.keyLabel, { color }]}>0</Text>
        </Pressable>
        <Pressable onPress={onBackspace} style={styles.key}>
          <Ionicons name="backspace-outline" size={22} color={color} />
        </Pressable>
      </View>
    </View>
  );
}

const KEY_SIZE = 72;

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  key: {
    width: KEY_SIZE,
    height: KEY_SIZE,
    borderRadius: KEY_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyPressed: {
    backgroundColor: colors.surface.overlay,
  },
  keyLabel: {
    ...typography.heading1,
    fontSize: 28,
  },
});
