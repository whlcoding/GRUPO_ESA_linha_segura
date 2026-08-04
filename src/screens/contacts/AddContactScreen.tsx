import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import { ContactForm } from '@/components/domain/ContactForm';
import { FormScroll, Header, Screen } from '@/components/ui';
import { useContactsStore } from '@/store/useContactsStore';
import { spacing } from '@/theme';
import type { HomeStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'AddContact'>;

export function AddContactScreen({ navigation }: Props) {
  const addContact = useContactsStore((state) => state.addContact);

  return (
    <Screen variant="plain">
      <Header title="Adicionar contato" onBack={navigation.goBack} />
      <FormScroll contentContainerStyle={styles.content}>
        <ContactForm
          submitLabel="Salvar contato"
          onSubmit={(values) => {
            addContact(values);
            navigation.goBack();
          }}
        />
      </FormScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl },
});
