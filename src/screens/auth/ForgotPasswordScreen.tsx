import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text } from 'react-native';
import { z } from 'zod';

import { Button, EmptyState, FormScroll, Header, Screen, TextField } from '@/components/ui';
import { spacing, typography, colors } from '@/theme';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const schema = z.object({
  email: z.string().trim().min(1, 'E-mail obrigatório').email('E-mail inválido'),
});
type Values = z.infer<typeof schema>;

export function ForgotPasswordScreen({ navigation }: Props) {
  const [sent, setSent] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: '' } });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSent(true);
  };

  return (
    <Screen variant="plain">
      <Header title="Recuperar senha" onBack={navigation.goBack} />
      <FormScroll contentContainerStyle={styles.content}>
        {sent ? (
          <EmptyState
            icon="✉️"
            title="Instruções enviadas"
            description="Se o e-mail informado estiver cadastrado, você receberá um link para redefinir sua senha."
          />
        ) : (
          <>
            <Text style={styles.paragraph}>
              Informe o e-mail cadastrado. Enviaremos instruções para redefinir sua senha.
            </Text>
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
            <Button variant="primary" onPress={handleSubmit(onSubmit)} loading={isSubmitting}>
              Enviar instruções
            </Button>
          </>
        )}
      </FormScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl },
  paragraph: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
});
