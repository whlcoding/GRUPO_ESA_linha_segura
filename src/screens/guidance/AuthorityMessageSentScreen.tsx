import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Screen } from '@/components/ui';
import { useAuthorityContactsStore } from '@/store/useAuthorityContactsStore';
import { colors, spacing, typography } from '@/theme';
import type { GuidanceStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<GuidanceStackParamList, 'AuthorityMessageSent'>;

export function AuthorityMessageSentScreen({ navigation, route }: Props) {
  const contact = useAuthorityContactsStore((state) =>
    state.contacts.find((item) => item.id === route.params.authorityContactId)
  );

  return (
    <Screen variant="gradient">
      <View style={styles.content}>
        <View style={styles.iconBadge}>
          <Ionicons name="checkmark-circle" size={44} color={colors.text.onDark} />
        </View>
        <Text style={styles.title}>Mensagem enviada</Text>
        <Text style={styles.paragraph}>
          {contact
            ? `Sua mensagem foi enviada para ${contact.name}. Em caso de emergência, ligue diretamente para ${contact.phone}.`
            : 'Sua mensagem foi enviada com sucesso.'}
        </Text>
        <Button
          variant="primary"
          onPress={() => navigation.navigate('AuthorityContactsList')}
          style={styles.button}
        >
          Voltar
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
    gap: spacing.lg,
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
