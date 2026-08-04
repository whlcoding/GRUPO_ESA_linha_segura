import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text } from 'react-native';

import { Button, FormScroll, Header, Screen, TextField } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';
import { registerStep1Schema, type RegisterStep1Values } from '@/lib/utils/validators';
import { colors, spacing, typography } from '@/theme';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterStep1'>;

export function RegisterStep1Screen({ navigation }: Props) {
  const registerProfile = useAuthStore((state) => state.registerProfile);
  const setPassword = useAuthStore((state) => state.setPassword);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterStep1Values>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: { name: '', email: '', phone: '', password: '' },
  });

  const onSubmit = async (values: RegisterStep1Values) => {
    registerProfile(values);
    await setPassword(values.password);
    navigation.navigate('RegisterStep2Pin', {
      name: values.name,
      email: values.email,
      phone: values.phone,
    });
  };

  return (
    <Screen variant="plain">
      <Header title="Criar conta" onBack={navigation.goBack} />
      <FormScroll contentContainerStyle={styles.content}>
        <Text style={styles.paragraph}>Um espaço só seu, seguro e sigiloso</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              label="Nome ou apelido *"
              placeholder="Como posso te chamar?"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              label="E-mail *"
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
          name="phone"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              label="Telefone *"
              placeholder="(11) 99999-9999"
              keyboardType="phone-pad"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.phone?.message}
            />
          )}
        />
        <Text style={styles.hint}>Também pode ser usado para fazer login</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              label="Senha *"
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
            />
          )}
        />

        <Button variant="primary" onPress={handleSubmit(onSubmit)} loading={isSubmitting}>
          Continuar
        </Button>
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
  hint: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: -spacing.md,
    marginBottom: spacing.lg,
  },
});
