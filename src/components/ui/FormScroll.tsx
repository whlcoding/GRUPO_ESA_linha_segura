import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, type StyleProp, type ViewStyle } from 'react-native';

type FormScrollProps = PropsWithChildren<{
  contentContainerStyle?: StyleProp<ViewStyle>;
}>;

export function FormScroll({ contentContainerStyle, children }: FormScrollProps) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={contentContainerStyle}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
