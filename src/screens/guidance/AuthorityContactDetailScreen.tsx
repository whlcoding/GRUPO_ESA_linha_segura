import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Linking, StyleSheet, Text } from 'react-native';

import { Button, FormScroll, Header, Screen, TextField } from '@/components/ui';
import { useAuthorityContactsStore } from '@/store/useAuthorityContactsStore';
import { colors, spacing, typography } from '@/theme';
import type { GuidanceStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<GuidanceStackParamList, 'AuthorityContactDetail'>;

export function AuthorityContactDetailScreen({ navigation, route }: Props) {
  const { authorityContactId } = route.params;
  const contact = useAuthorityContactsStore((state) =>
    state.contacts.find((item) => item.id === authorityContactId)
  );
  const sendMessage = useAuthorityContactsStore((state) => state.sendMessage);
  const [message, setMessage] = useState('');

  if (!contact) {
    navigation.goBack();
    return null;
  }

  const handleCall = () => {
    Linking.openURL(`tel:${contact.phone}`);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(contact.id, message.trim());
    navigation.navigate('AuthorityMessageSent', { authorityContactId: contact.id });
    setMessage('');
  };

  return (
    <Screen variant="plain">
      <Header title={contact.name} onBack={navigation.goBack} />
      <FormScroll contentContainerStyle={styles.content}>
        <Text style={styles.description}>{contact.description}</Text>

        <Button variant="primary" onPress={handleCall} style={styles.callButton}>
          <Ionicons name="call" size={16} color={colors.text.onDark} /> Ligar agora ({contact.phone})
        </Button>

        <Text style={styles.sectionTitle}>Enviar mensagem</Text>
        <TextField
          placeholder="Descreva sua situação..."
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={5}
          style={styles.textArea}
        />
        <Button variant="primary" onPress={handleSend} disabled={!message.trim()}>
          Enviar mensagem
        </Button>
      </FormScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl },
  description: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  callButton: { marginBottom: spacing.xxl, backgroundColor: colors.success.default },
  sectionTitle: {
    ...typography.heading3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
});
