import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button, TextField } from '@/components/ui';
import type { TrustedContact } from '@/models/TrustedContact';
import { colors, spacing, typography } from '@/theme';

type ContactFormValues = { name: string; phone: string; relationship: string; isPrimary: boolean };

type ContactFormProps = {
  initialValues?: Partial<TrustedContact>;
  submitLabel: string;
  onSubmit: (values: ContactFormValues) => void;
};

export function ContactForm({ initialValues, submitLabel, onSubmit }: ContactFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [phone, setPhone] = useState(initialValues?.phone ?? '');
  const [relationship, setRelationship] = useState(initialValues?.relationship ?? '');
  const [isPrimary, setIsPrimary] = useState(initialValues?.isPrimary ?? false);

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0 && relationship.trim().length > 0;

  return (
    <View>
      <TextField label="Nome *" placeholder="Nome do contato" value={name} onChangeText={setName} />
      <TextField
        label="Telefone *"
        placeholder="(11) 99999-9999"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextField
        label="Relação *"
        placeholder="Ex: irmã, amiga, mãe"
        value={relationship}
        onChangeText={setRelationship}
      />

      <Pressable style={styles.checkboxRow} onPress={() => setIsPrimary((value) => !value)}>
        <Ionicons
          name={isPrimary ? 'checkbox' : 'square-outline'}
          size={22}
          color={colors.primary.default}
        />
        <Text style={styles.checkboxLabel}>Definir como contato principal</Text>
      </Pressable>

      <Button
        variant="primary"
        style={styles.submitButton}
        disabled={!canSubmit}
        onPress={() =>
          onSubmit({ name: name.trim(), phone: phone.trim(), relationship: relationship.trim(), isPrimary })
        }
      >
        {submitLabel}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  checkboxLabel: {
    ...typography.bodySmall,
    color: colors.text.primary,
  },
  submitButton: { marginTop: spacing.md },
});
