import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Screen } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';
import { colors, spacing, typography } from '@/theme';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'SupportIntro'>;

export function SupportIntroScreen(_props: Props) {
  const acceptLgpdConsent = useAuthStore((state) => state.acceptLgpdConsent);
  const profile = useAuthStore((state) => state.profile);

  return (
    <Screen variant="gradient">
      <View style={styles.content}>
        <View style={styles.iconBadge}>
          <Ionicons name="heart" size={40} color={colors.text.onDark} />
        </View>
        <Text style={styles.title}>
          {profile?.name ? `Bem-vinda, ${profile.name}!` : 'Bem-vinda!'}
        </Text>
        <Text style={styles.paragraph}>
          Este é um espaço só seu — seguro, sigiloso e sempre disponível. Aqui você encontra apoio,
          orientação e recursos de segurança sempre que precisar.
        </Text>
        <Text style={styles.paragraph}>
          Lembre-se: você pode ativar o modo camuflagem e o botão de emergência a qualquer momento
          nas configurações de segurança.
        </Text>
      </View>
      <View style={styles.actions}>
        <Button variant="primary" onPress={acceptLgpdConsent}>
          Continuar
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  iconBadge: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: colors.surface.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.heading1,
    color: colors.text.onDark,
    textAlign: 'center',
  },
  paragraph: {
    ...typography.body,
    color: colors.text.onDarkMuted,
    textAlign: 'center',
  },
  actions: {
    padding: spacing.xl,
  },
});
