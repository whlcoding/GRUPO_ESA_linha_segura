import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card, Header, Screen } from '@/components/ui';
import { useAuthorityContactsStore } from '@/store/useAuthorityContactsStore';
import { colors, spacing, typography } from '@/theme';
import type { GuidanceStackParamList } from '@/navigation/types';
import type { AuthorityContactType } from '@/models/AuthorityContact';

type Props = NativeStackScreenProps<GuidanceStackParamList, 'AuthorityContactsList'>;

const ICONS: Record<AuthorityContactType, keyof typeof Ionicons.glyphMap> = {
  police: 'shield',
  hotline: 'call',
  legal: 'briefcase',
  health: 'medkit',
};

export function AuthorityContactsListScreen({ navigation }: Props) {
  const contacts = useAuthorityContactsStore((state) => state.contacts);

  return (
    <Screen variant="plain">
      <Header title="Contato com Autoridades" onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {contacts.map((contact) => (
          <Pressable
            key={contact.id}
            onPress={() =>
              navigation.navigate('AuthorityContactDetail', { authorityContactId: contact.id })
            }
          >
            <Card style={styles.card}>
              <View style={styles.iconBadge}>
                <Ionicons name={ICONS[contact.type]} size={20} color={colors.primary.default} />
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{contact.name}</Text>
                <Text style={styles.phone}>{contact.phone}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.text.secondary} />
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.xl, flexGrow: 1 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  name: { ...typography.heading3, color: colors.text.primary },
  phone: { ...typography.caption, color: colors.text.secondary },
});
