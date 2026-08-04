import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui';
import { colors, radii, spacing, typography } from '@/theme';

export type QuickAccessItem = {
  key: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBackground: string;
  title: string;
  subtitle: string;
  onPress: () => void;
};

export function QuickAccessGrid({ items }: { items: QuickAccessItem[] }) {
  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <Pressable key={item.key} onPress={item.onPress} style={styles.itemWrapper}>
          <Card style={styles.card} padded={false}>
            <View style={styles.cardInner}>
              <View style={[styles.iconBadge, { backgroundColor: item.iconBackground }]}>
                <Ionicons name={item.icon} size={20} color={item.iconColor} />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                {item.subtitle}
              </Text>
            </View>
          </Card>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  itemWrapper: {
    width: '50%',
    padding: spacing.xs,
  },
  card: {
    borderRadius: radii.md,
  },
  cardInner: {
    padding: spacing.md,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
});
