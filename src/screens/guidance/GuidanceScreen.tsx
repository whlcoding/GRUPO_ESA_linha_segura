import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { Card, Header, Screen } from '@/components/ui';
import { colors, spacing, typography } from '@/theme';
import type { GuidanceStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<GuidanceStackParamList, 'Guidance'>;

const SECTIONS = [
  {
    title: 'Medida protetiva de urgência',
    body: 'Você pode solicitar uma medida protetiva na delegacia ou no fórum, mesmo sem advogado. Ela pode obrigar o agressor a manter distância.',
  },
  {
    title: 'Lei Maria da Penha (Lei 11.340/2006)',
    body: 'Garante proteção em casos de violência doméstica e familiar, prevendo medidas de urgência e atendimento prioritário.',
  },
  {
    title: 'Boletim de ocorrência',
    body: 'Pode ser registrado em qualquer delegacia, inclusive na Delegacia da Mulher, e é a base para outras medidas legais.',
  },
];

export function GuidanceScreen({ navigation }: Props) {
  return (
    <Screen variant="plain">
      <Header title="Orientações" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>
          Informações gerais sobre seus direitos. Em caso de dúvida, procure um profissional ou
          uma das autoridades abaixo.
        </Text>
        {SECTIONS.map((section) => (
          <Card key={section.title} style={styles.card}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            <Text style={styles.cardBody}>{section.body}</Text>
          </Card>
        ))}

        <Pressable onPress={() => navigation.navigate('AuthorityContactsList')}>
          <Card style={styles.authoritiesCard}>
            <Text style={styles.cardTitle}>Contato com autoridades</Text>
            <Text style={styles.cardBody}>
              Veja telefones úteis e envie uma mensagem diretamente para autoridades e serviços
              de apoio.
            </Text>
          </Card>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  intro: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  card: { marginBottom: spacing.md },
  authoritiesCard: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary.accent,
  },
  cardTitle: {
    ...typography.heading3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  cardBody: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
});
