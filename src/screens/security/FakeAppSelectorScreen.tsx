import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, Header, Screen } from '@/components/ui';
import { FAKE_APPS } from '@/constants/fakeApps';
import { useCamouflageStore } from '@/store/useCamouflageStore';
import { colors, spacing, typography } from '@/theme';
import type { SecurityStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<SecurityStackParamList, 'FakeAppSelector'>;

export function FakeAppSelectorScreen({ navigation }: Props) {
  const activate = useCamouflageStore((state) => state.activate);

  const handleSelect = (id: (typeof FAKE_APPS)[number]['id']) => {
    activate(id);
    navigation.replace('FakeAppActivated');
  };

  return (
    <Screen variant="plain">
      <Header title="Escolha o disfarce" onBack={navigation.goBack} />
      <View style={styles.content}>
        <Text style={styles.paragraph}>
          Escolha como o Safe Line vai aparecer quando estiver camuflado.
        </Text>
        {FAKE_APPS.map((app) => (
          <Pressable key={app.id} onPress={() => handleSelect(app.id)}>
            <Card style={styles.card}>
              <View style={[styles.icon, { backgroundColor: app.color }]}>
                <Ionicons name={app.icon} size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.name}>{app.name}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.text.secondary} />
            </Card>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl },
  paragraph: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { ...typography.heading3, color: colors.text.primary, flex: 1 },
});
