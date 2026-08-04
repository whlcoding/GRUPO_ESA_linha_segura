import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

type TextFieldProps = TextInputProps & {
  label?: string;
  error?: string;
};

export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { label, error, style, ...inputProps },
  ref
) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        ref={ref}
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={colors.text.secondary}
        {...inputProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    height: 52,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    backgroundColor: colors.surface.default,
    paddingHorizontal: spacing.lg,
    ...typography.body,
    color: colors.text.primary,
  },
  inputError: {
    borderColor: colors.danger.default,
  },
  error: {
    ...typography.caption,
    color: colors.danger.default,
    marginTop: spacing.xs,
  },
});
