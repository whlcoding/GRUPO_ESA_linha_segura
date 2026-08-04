import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';

import { ContactListItem } from '@/components/domain/ContactListItem';
import { EmptyState, Fab, Header, Screen } from '@/components/ui';
import { useContactsStore } from '@/store/useContactsStore';
import { spacing } from '@/theme';
import type { HomeStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'ContactsList'>;

export function ContactsListScreen({ navigation }: Props) {
  const contacts = useContactsStore((state) => state.contacts);

  return (
    <Screen variant="plain">
      <Header title="Contatos de Confiança" onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {contacts.length === 0 ? (
          <EmptyState
            icon="🤝"
            title="Nenhum contato ainda"
            description="Adicione pessoas de confiança para serem notificadas em caso de emergência."
          />
        ) : (
          contacts.map((contact) => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              onPress={() => navigation.navigate('EditContact', { contactId: contact.id })}
            />
          ))
        )}
      </ScrollView>
      <Fab testID="add-contact-fab" onPress={() => navigation.navigate('AddContact')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.xl, paddingBottom: 100, flexGrow: 1 },
});
