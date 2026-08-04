import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet } from 'react-native';

import { ContactForm } from '@/components/domain/ContactForm';
import { Button, FormScroll, Header, Screen } from '@/components/ui';
import { useContactsStore } from '@/store/useContactsStore';
import { spacing } from '@/theme';
import type { HomeStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'EditContact'>;

export function EditContactScreen({ navigation, route }: Props) {
  const { contactId } = route.params;
  const contact = useContactsStore((state) => state.contacts.find((item) => item.id === contactId));
  const updateContact = useContactsStore((state) => state.updateContact);
  const removeContact = useContactsStore((state) => state.removeContact);

  if (!contact) {
    navigation.goBack();
    return null;
  }

  const handleDelete = () => {
    Alert.alert('Remover contato', `Tem certeza que deseja remover ${contact.name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          removeContact(contact.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Screen variant="plain">
      <Header title="Editar contato" onBack={navigation.goBack} />
      <FormScroll contentContainerStyle={styles.content}>
        <ContactForm
          initialValues={contact}
          submitLabel="Salvar alterações"
          onSubmit={(values) => {
            updateContact(contact.id, values);
            navigation.goBack();
          }}
        />
        <Button variant="ghost" onPress={handleDelete} style={styles.deleteButton}>
          Remover contato
        </Button>
      </FormScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl },
  deleteButton: { marginTop: spacing.md },
});
