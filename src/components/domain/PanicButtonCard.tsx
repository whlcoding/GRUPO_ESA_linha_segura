import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui';
import { colors, spacing, typography } from '@/theme';

type PanicButtonCardProps = {
  onTrigger: () => void;
};

export function PanicButtonCard({ onTrigger }: PanicButtonCardProps) {
  return (
    <Pressable onLongPress={onTrigger} delayLongPress={1200}>
      <Card style={styles.card}>
        <View style={styles.sosCircle}>
          <Text style={styles.sosLabel}>SOS</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>Botão de Pânico</Text>
          <Text style={styles.description}>
            Segure 3 segundos para enviar alerta e sua localização
          </Text>
          <View style={styles.badge}>
            <Ionicons name="location" size={12} color={colors.success.default} />
            <Text style={styles.badgeText}>GPS ativo</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  sosCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.danger.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosLabel: {
    ...typography.caption,
    color: colors.text.onDark,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  title: {
    ...typography.heading3,
    color: colors.text.primary,
  },
  description: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
    marginBottom: spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    ...typography.caption,
    color: colors.success.default,
    fontWeight: '600',
  },
});
