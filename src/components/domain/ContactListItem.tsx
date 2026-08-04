import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui';
import type { TrustedContact } from '@/models/TrustedContact';
import { colors, radii, spacing, typography } from '@/theme';

export function ContactListItem({ contact, onPress }: { contact: TrustedContact; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color={colors.primary.default} />
        </View>
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{contact.name}</Text>
            {contact.isPrimary ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Principal</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.detail}>{contact.relationship}</Text>
          <Text style={styles.detail}>{contact.phone}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.text.secondary} />
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  name: { ...typography.heading3, color: colors.text.primary },
  detail: { ...typography.caption, color: colors.text.secondary },
  badge: {
    backgroundColor: colors.primary.default,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badgeText: { ...typography.caption, color: colors.text.onDark, fontWeight: '700' },
});
