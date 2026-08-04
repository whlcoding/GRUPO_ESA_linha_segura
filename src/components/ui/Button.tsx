import type { PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

type ButtonProps = PropsWithChildren<{
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}>;

export function Button({
  onPress,
  variant = 'primary',
  disabled,
  loading,
  style,
  children,
  testID,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColorFor(variant)} />
      ) : (
        <Text style={[styles.label, { color: textColorFor(variant) }]}>{children}</Text>
      )}
    </Pressable>
  );
}

function textColorFor(variant: ButtonVariant) {
  switch (variant) {
    case 'primary':
      return colors.primary.default;
    case 'secondary':
      return colors.text.onDark;
    case 'danger':
      return colors.text.onDark;
    case 'ghost':
      return colors.primary.default;
  }
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  label: {
    ...typography.heading3,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.surface.default,
  },
  secondary: {
    backgroundColor: colors.surface.overlay,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  danger: {
    backgroundColor: colors.danger.default,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
});
