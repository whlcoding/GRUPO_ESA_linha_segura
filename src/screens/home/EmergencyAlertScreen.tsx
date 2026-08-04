import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Screen } from '@/components/ui';
import { haptics } from '@/lib/utils/haptics';
import { useEmergencyStore } from '@/store/useEmergencyStore';
import { colors, spacing, typography } from '@/theme';
import type { HomeStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'EmergencyAlert'>;

const COUNTDOWN_SECONDS = 5;

export function EmergencyAlertScreen({ navigation }: Props) {
  const triggerAlert = useEmergencyStore((state) => state.triggerAlert);
  const cancelAlert = useEmergencyStore((state) => state.cancelAlert);

  const [phase, setPhase] = useState<'countdown' | 'sent' | 'cancelled'>('countdown');
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const alertIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (phase !== 'countdown') return;

    if (secondsLeft === 0) {
      const id = triggerAlert();
      alertIdRef.current = id;
      haptics.heavy();
      setPhase('sent');
      return;
    }

    const timeout = setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearTimeout(timeout);
  }, [phase, secondsLeft, triggerAlert]);

  const handleCancel = () => {
    if (alertIdRef.current) cancelAlert(alertIdRef.current);
    setPhase('cancelled');
  };

  return (
    <Screen variant="gradient">
      <View style={styles.content}>
        {phase === 'countdown' && (
          <>
            <View style={styles.pulseCircle}>
              <Text style={styles.countdownNumber}>{secondsLeft}</Text>
            </View>
            <Text style={styles.title}>Enviando alerta de emergência</Text>
            <Text style={styles.paragraph}>
              Seus contatos de confiança e sua localização serão compartilhados em instantes.
            </Text>
            <Button variant="secondary" onPress={handleCancel}>
              Cancelar
            </Button>
          </>
        )}

        {phase === 'sent' && (
          <>
            <View style={[styles.pulseCircle, styles.sentCircle]}>
              <Ionicons name="checkmark" size={40} color={colors.text.onDark} />
            </View>
            <Text style={styles.title}>Alerta enviado</Text>
            <Text style={styles.paragraph}>
              Seus contatos de confiança foram notificados com sua localização atual.
            </Text>
            <Button variant="primary" onPress={() => navigation.goBack()}>
              Voltar ao início
            </Button>
          </>
        )}

        {phase === 'cancelled' && (
          <>
            <View style={styles.pulseCircle}>
              <Ionicons name="close" size={40} color={colors.text.onDark} />
            </View>
            <Text style={styles.title}>Alerta cancelado</Text>
            <Text style={styles.paragraph}>Nenhuma notificação foi enviada.</Text>
            <Button variant="primary" onPress={() => navigation.goBack()}>
              Voltar ao início
            </Button>
          </>
        )}
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
  pulseCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.danger.default,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  sentCircle: {
    backgroundColor: colors.success.default,
  },
  countdownNumber: {
    ...typography.heading1,
    fontSize: 48,
    color: colors.text.onDark,
  },
  title: {
    ...typography.heading2,
    color: colors.text.onDark,
    textAlign: 'center',
  },
  paragraph: {
    ...typography.body,
    color: colors.text.onDarkMuted,
    textAlign: 'center',
  },
});
