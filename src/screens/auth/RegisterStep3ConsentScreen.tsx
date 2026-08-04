import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button, Card, FormScroll, Header, Screen } from '@/components/ui';
import { colors, radii, spacing, typography } from '@/theme';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterStep3Consent'>;

const SECTIONS = [
  {
    title: 'Finalidade do tratamento de dados',
    body: 'Usamos suas informações apenas para oferecer apoio, orientação e os recursos de segurança do aplicativo.',
  },
  {
    title: 'Segurança e confidencialidade',
    body: 'Seus dados ficam protegidos neste dispositivo, com PIN e biometria, e nunca são compartilhados sem sua autorização.',
  },
  {
    title: 'Seus direitos (Art. 18 da LGPD)',
    body: 'Você pode acessar, corrigir, exportar ou excluir seus dados a qualquer momento nas configurações de segurança.',
  },
  {
    title: 'Retenção e exclusão de dados',
    body: 'Você pode apagar todo o histórico do app quando quiser, de forma imediata e irreversível.',
  },
];

export function RegisterStep3ConsentScreen({ navigation }: Props) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedNotifications, setAcceptedNotifications] = useState(false);

  return (
    <Screen variant="plain">
      <Header title="Privacidade e Consentimento" onBack={navigation.goBack} />
      <FormScroll contentContainerStyle={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>LGPD — Lei 13.709/2018</Text>
        </View>
        <Text style={styles.intro}>
          Olá! Antes de criar sua conta, leia e aceite os termos abaixo. Seus dados nunca serão
          vendidos. O Safe Line foi criado para proteger você.
        </Text>

        {SECTIONS.map((section) => (
          <Card key={section.title} style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </Card>
        ))}

        <Pressable style={styles.checkboxRow} onPress={() => setAcceptedNotifications((v) => !v)}>
          <Ionicons
            name={acceptedNotifications ? 'checkbox' : 'square-outline'}
            size={22}
            color={colors.primary.default}
          />
          <Text style={styles.checkboxLabel}>
            Notificações e comunicações — aceitar notificações opcionais
          </Text>
        </Pressable>

        <Pressable style={styles.checkboxRow} onPress={() => setAcceptedTerms((v) => !v)}>
          <Ionicons
            name={acceptedTerms ? 'checkbox' : 'square-outline'}
            size={22}
            color={colors.primary.default}
          />
          <Text style={styles.checkboxLabel}>
            Li e compreendi todos os termos acima e concordo com eles{' '}
            <Text style={styles.required}>OBRIGATÓRIO</Text>
          </Text>
        </Pressable>

        <View style={styles.actions}>
          <Button variant="ghost" onPress={navigation.goBack} style={styles.refuseButton}>
            Recusar
          </Button>
          <Button
            variant="primary"
            disabled={!acceptedTerms}
            onPress={() => navigation.navigate('SupportIntro')}
            style={styles.acceptButton}
          >
            Aceitar e criar conta
          </Button>
        </View>
      </FormScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary.default,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginBottom: spacing.lg,
  },
  badgeText: {
    ...typography.caption,
    color: colors.text.onDark,
  },
  intro: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  sectionCard: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.heading3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  sectionBody: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  checkboxLabel: {
    ...typography.bodySmall,
    color: colors.text.primary,
    flex: 1,
  },
  required: {
    color: colors.danger.default,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
  refuseButton: { flex: 1 },
  acceptButton: { flex: 2 },
});
