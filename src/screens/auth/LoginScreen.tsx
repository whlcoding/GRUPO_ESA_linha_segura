import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button, FormScroll, Header, Screen, TextField } from '@/components/ui';
import { colors, spacing, typography } from '@/theme';
import { useAuthStore } from '@/store/useAuthStore';
import { loginSchema, type LoginValues } from '@/lib/utils/validators';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const login = useAuthStore((state) => state.login);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginValues) => {
    setLoginError(null);
    const success = await login(values.email, values.password);
    if (!success) setLoginError('E-mail ou senha incorretos.');
  };

  return (
    <Screen variant="plain">
      <Header title="Entrar" onBack={navigation.goBack} />
      <FormScroll contentContainerStyle={styles.content}>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              label="E-mail"
              placeholder="seu@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              label="Senha"
              placeholder="Sua senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
            />
          )}
        />
        {loginError ? <Text style={styles.loginError}>{loginError}</Text> : null}

        <Button variant="primary" onPress={handleSubmit(onSubmit)} loading={isSubmitting}>
          Entrar
        </Button>

        <Pressable onPress={() => navigation.navigate('ForgotPassword')} style={styles.link}>
          <Text style={styles.linkText}>Esqueci minha senha</Text>
        </Pressable>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Ainda não tem conta?</Text>
          <Pressable onPress={() => navigation.navigate('RegisterStep1')}>
            <Text style={styles.linkText}> Criar conta</Text>
          </Pressable>
        </View>
      </FormScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
  },
  loginError: {
    ...typography.bodySmall,
    color: colors.danger.default,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  link: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  linkText: {
    ...typography.bodySmall,
    color: colors.primary.accent,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xxl,
  },
  footerText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
});
