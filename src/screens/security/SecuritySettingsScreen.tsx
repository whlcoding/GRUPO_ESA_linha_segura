import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { Card, Header, Screen } from '@/components/ui';
import { isBiometricsAvailable } from '@/lib/auth/biometrics';
import { FAKE_APPS } from '@/constants/fakeApps';
import { useAuthStore } from '@/store/useAuthStore';
import { useCamouflageStore } from '@/store/useCamouflageStore';
import { useChatStore } from '@/store/useChatStore';
import { useForumStore } from '@/store/useForumStore';
import { colors, spacing, typography } from '@/theme';
import type { SecurityStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<SecurityStackParamList, 'SecuritySettings'>;

export function SecuritySettingsScreen({ navigation }: Props) {
  const biometricsEnabled = useAuthStore((state) => state.biometricsEnabled);
  const setBiometricsEnabled = useAuthStore((state) => state.setBiometricsEnabled);
  const resetAccount = useAuthStore((state) => state.resetAccount);

  const camouflageEnabled = useCamouflageStore((state) => state.enabled);
  const selectedFakeAppId = useCamouflageStore((state) => state.selectedFakeAppId);
  const selectedApp = FAKE_APPS.find((app) => app.id === selectedFakeAppId);

  const clearForumHistory = useForumStore((state) => state.clearHistory);
  const clearChatHistory = useChatStore((state) => state.clearHistory);

  const handleToggleBiometrics = async (value: boolean) => {
    if (value) {
      const available = await isBiometricsAvailable();
      if (!available) {
        Alert.alert(
          'Biometria indisponível',
          'Não encontramos biometria configurada neste dispositivo.'
        );
        return;
      }
    }
    setBiometricsEnabled(value);
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Apagar histórico do app',
      'Isso remove suas conversas do chat seguro e suas publicações no fórum. Seu diário e contatos não serão afetados.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar agora',
          style: 'destructive',
          onPress: () => {
            clearForumHistory();
            clearChatHistory();
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir conta',
      'Isso apaga sua conta e todos os dados salvos neste dispositivo. Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir tudo', style: 'destructive', onPress: () => resetAccount() },
      ]
    );
  };

  return (
    <Screen variant="plain">
      <Header title="Segurança" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>PROTEÇÃO DE ACESSO</Text>
        <Pressable onPress={() => navigation.navigate('ChangePin')}>
          <Card style={styles.card}>
            <View style={styles.row}>
              <Ionicons name="keypad" size={20} color={colors.primary.default} />
              <View style={styles.rowInfo}>
                <Text style={styles.rowTitle}>PIN de segurança</Text>
                <Text style={styles.rowSubtitle}>PIN ativo — toque para alterar</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.text.secondary} />
            </View>
          </Card>
        </Pressable>

        <Pressable onPress={() => handleToggleBiometrics(!biometricsEnabled)}>
          <Card style={styles.card}>
            <View style={styles.row}>
              <Ionicons name="finger-print" size={20} color={colors.primary.default} />
              <View style={styles.rowInfo}>
                <Text style={styles.rowTitle}>Proteção por biometria</Text>
                <Text style={styles.rowSubtitle}>
                  {biometricsEnabled ? 'Biometria ativa' : 'Desativada'}
                </Text>
              </View>
              <Switch
                value={biometricsEnabled}
                onValueChange={handleToggleBiometrics}
                trackColor={{ true: colors.primary.default, false: colors.border.light }}
              />
            </View>
          </Card>
        </Pressable>

        <Text style={styles.sectionLabel}>CAMUFLAGEM DO APLICATIVO</Text>
        <Pressable onPress={() => navigation.navigate('CamouflageSettings')}>
          <Card style={styles.card}>
            <View style={styles.row}>
              <Ionicons name="eye-off" size={20} color={colors.primary.default} />
              <View style={styles.rowInfo}>
                <Text style={styles.rowTitle}>Modo discreto / camuflado</Text>
                <Text style={styles.rowSubtitle}>
                  {camouflageEnabled && selectedApp
                    ? `Ativado — disfarçado como ${selectedApp.name}`
                    : 'Ativar para disfarçar o aplicativo ao sair'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.text.secondary} />
            </View>
          </Card>
        </Pressable>

        <Text style={styles.sectionLabel}>PRIVACIDADE E LGPD</Text>
        <Card style={styles.card}>
          <Text style={styles.rowTitle}>LGPD · Lei 13.709/2018</Text>
          <Text style={[styles.rowSubtitle, styles.privacyBody]}>
            Seus dados ficam apenas neste dispositivo. Você pode apagar seu histórico ou excluir
            sua conta a qualquer momento.
          </Text>
        </Card>

        <Pressable onPress={handleClearHistory}>
          <Card style={styles.card}>
            <View style={styles.row}>
              <Ionicons name="trash-outline" size={20} color={colors.warning.default} />
              <View style={styles.rowInfo}>
                <Text style={styles.rowTitle}>Apagar histórico do app</Text>
                <Text style={styles.rowSubtitle}>
                  Remove conversas, publicações e histórico de navegação
                </Text>
              </View>
            </View>
          </Card>
        </Pressable>

        <Pressable onPress={handleDeleteAccount}>
          <Card style={styles.card}>
            <View style={styles.row}>
              <Ionicons name="warning-outline" size={20} color={colors.danger.default} />
              <View style={styles.rowInfo}>
                <Text style={[styles.rowTitle, { color: colors.danger.default }]}>
                  Excluir conta
                </Text>
                <Text style={styles.rowSubtitle}>Apaga conta e todos os dados do dispositivo</Text>
              </View>
            </View>
          </Card>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  sectionLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    fontWeight: '700',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  card: { marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  rowInfo: { flex: 1 },
  rowTitle: { ...typography.heading3, color: colors.text.primary },
  rowSubtitle: { ...typography.caption, color: colors.text.secondary, marginTop: 2 },
  privacyBody: { marginTop: spacing.xs },
});
