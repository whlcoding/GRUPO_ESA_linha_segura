import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Screen } from '@/components/ui';
import { colors, spacing, typography } from '@/theme';
import type { SecurityStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<SecurityStackParamList, 'FakeAppActivated'>;

export function FakeAppActivatedScreen({ navigation }: Props) {
  return (
    <Screen variant="gradient">
      <View style={styles.content}>
        <View style={styles.iconBadge}>
          <Ionicons name="checkmark-circle" size={44} color={colors.text.onDark} />
        </View>
        <Text style={styles.title}>Camuflagem ativada</Text>
        <Text style={styles.paragraph}>
          Da próxima vez que você abrir o app, ele vai parecer outro aplicativo.
        </Text>
        <Text style={styles.paragraph}>
          Para voltar ao Safe Line: mantenha pressionado o botão "C" por 3 segundos e digite seu
          PIN.
        </Text>
        <Button
          variant="primary"
          onPress={() => navigation.popToTop()}
          style={styles.button}
        >
          Concluir
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  iconBadge: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: colors.surface.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: { ...typography.heading1, color: colors.text.onDark, textAlign: 'center' },
  paragraph: { ...typography.body, color: colors.text.onDarkMuted, textAlign: 'center' },
  button: { marginTop: spacing.lg, alignSelf: 'stretch' },
});
