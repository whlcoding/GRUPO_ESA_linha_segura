import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { PinDots, PinPad, Screen } from '@/components/ui';
import { PIN_LENGTH } from '@/lib/auth/secret';
import { haptics } from '@/lib/utils/haptics';
import { useAuthStore } from '@/store/useAuthStore';
import { useCamouflageStore } from '@/store/useCamouflageStore';
import { colors, spacing, typography } from '@/theme';
import { FakeCalculatorScreen } from './FakeCalculatorScreen';

export function CamouflageOverlay() {
  const reveal = useCamouflageStore((state) => state.reveal);
  const unlockWithPin = useAuthStore((state) => state.unlockWithPin);

  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const openModal = () => {
    setPin('');
    setError(false);
    setModalVisible(true);
  };

  const handleDigit = async (digit: string) => {
    if (pin.length >= PIN_LENGTH) return;
    const next = pin + digit;
    setPin(next);

    if (next.length === PIN_LENGTH) {
      const success = await unlockWithPin(next);
      if (success) {
        haptics.success();
        reveal();
        setModalVisible(false);
      } else {
        haptics.error();
        setError(true);
        setTimeout(() => {
          setPin('');
          setError(false);
        }, 350);
      }
    }
  };

  const handleBackspace = () => setPin((current) => current.slice(0, -1));

  return (
    <View style={StyleSheet.absoluteFill}>
      <FakeCalculatorScreen onRevealAttempt={openModal} />

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <Screen variant="gradient">
          <View style={styles.content}>
            <Text style={styles.title}>Digite seu PIN para voltar ao Safe Line</Text>
            <PinDots length={PIN_LENGTH} filled={pin.length} error={error} />
            <View style={styles.pad}>
              <PinPad onDigit={handleDigit} onBackspace={handleBackspace} variant="dark" />
            </View>
          </View>
        </Screen>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
  },
  title: {
    ...typography.heading3,
    color: colors.text.onDark,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  pad: {
    marginTop: 'auto',
    marginBottom: spacing.xl,
  },
});
