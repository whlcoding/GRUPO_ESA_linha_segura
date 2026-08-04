import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Screen } from '@/components/ui';
import { colors, spacing, typography } from '@/theme';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const FEATURES = [
  { emoji: '🤝', label: 'Apoio' },
  { emoji: '🔒', label: 'Sigilo' },
  { emoji: '❤️', label: 'Acolhimento' },
];

export function WelcomeScreen({ navigation }: Props) {
  return (
    <Screen variant="gradient">
      <View style={styles.content}>
        <View style={styles.hero}>
          <View style={styles.iconBadge}>
            <Ionicons name="shield-checkmark" size={46} color={colors.text.onDark} />
          </View>
          <Text style={styles.title}>Safe Line</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>Você não está sozinha.</Text>
          <Text style={styles.paragraph}>
            Um espaço seguro e sigiloso para apoio, acolhimento e proteção.
          </Text>
        </View>

        <View style={styles.featuresCard}>
          <View style={styles.featuresRow}>
            {FEATURES.map((feature) => (
              <View key={feature.label} style={styles.featureItem}>
                <Text style={styles.featureEmoji}>{feature.emoji}</Text>
                <Text style={styles.featureLabel}>{feature.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <Button variant="primary" onPress={() => navigation.navigate('Login')}>
            Entrar
          </Button>
          <View style={{ height: spacing.md }} />
          <Button variant="secondary" onPress={() => navigation.navigate('RegisterStep1')}>
            Criar conta
          </Button>
          <Text style={styles.footer}>Seus dados são protegidos e confidenciais</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  hero: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  iconBadge: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: colors.surface.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.heading1,
    color: colors.text.onDark,
    fontSize: 32,
  },
  divider: {
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.text.onDarkMuted,
    marginVertical: spacing.lg,
  },
  subtitle: {
    ...typography.heading3,
    color: colors.text.onDark,
    marginBottom: spacing.sm,
  },
  paragraph: {
    ...typography.body,
    color: colors.text.onDarkMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  featuresCard: {
    backgroundColor: colors.surface.overlay,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    padding: spacing.xl,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  featureItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureLabel: {
    ...typography.caption,
    color: colors.text.onDark,
  },
  actions: {
    marginTop: spacing.xxl,
  },
  footer: {
    ...typography.caption,
    color: colors.text.onDarkMuted,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
