import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { Card, Header, Screen } from '@/components/ui';
import { FAKE_APPS } from '@/constants/fakeApps';
import { useCamouflageStore } from '@/store/useCamouflageStore';
import { colors, spacing, typography } from '@/theme';
import type { SecurityStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<SecurityStackParamList, 'CamouflageSettings'>;

export function CamouflageSettingsScreen({ navigation }: Props) {
  const enabled = useCamouflageStore((state) => state.enabled);
  const selectedFakeAppId = useCamouflageStore((state) => state.selectedFakeAppId);
  const deactivate = useCamouflageStore((state) => state.deactivate);

  const selectedApp = FAKE_APPS.find((app) => app.id === selectedFakeAppId);

  const handleToggle = (value: boolean) => {
    if (value) {
      navigation.navigate('FakeAppSelector');
    } else {
      deactivate();
    }
  };

  return (
    <Screen variant="plain">
      <Header title="Modo Camuflagem" onBack={navigation.goBack} />
      <View style={styles.content}>
        <Text style={styles.paragraph}>
          Quando ativado, o Safe Line se disfarça como outro aplicativo sempre que você fechar e
          reabrir o app. Para voltar, mantenha pressionado o botão indicado no app falso por 3
          segundos e digite seu PIN.
        </Text>

        <Pressable onPress={() => handleToggle(!enabled)}>
          <Card style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowInfo}>
                <Text style={styles.rowTitle}>Ativar camuflagem</Text>
                <Text style={styles.rowSubtitle}>
                  {enabled && selectedApp ? `Disfarçado como ${selectedApp.name}` : 'Desativado'}
                </Text>
              </View>
              <Switch
                value={enabled}
                onValueChange={handleToggle}
                trackColor={{ true: colors.primary.default, false: colors.border.light }}
              />
            </View>
          </Card>
        </Pressable>

        {enabled && selectedApp ? (
          <Pressable onPress={() => navigation.navigate('FakeAppSelector')}>
            <Card style={styles.card}>
              <View style={styles.row}>
                <View style={[styles.appIcon, { backgroundColor: selectedApp.color }]}>
                  <Ionicons name={selectedApp.icon} size={20} color="#FFFFFF" />
                </View>
                <View style={styles.rowInfo}>
                  <Text style={styles.rowTitle}>{selectedApp.name}</Text>
                  <Text style={styles.rowSubtitle}>Toque para trocar o disfarce</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.text.secondary} />
              </View>
            </Card>
          </Pressable>
        ) : null}
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
  card: { marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  rowInfo: { flex: 1 },
  rowTitle: { ...typography.heading3, color: colors.text.primary },
  rowSubtitle: { ...typography.caption, color: colors.text.secondary, marginTop: 2 },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
