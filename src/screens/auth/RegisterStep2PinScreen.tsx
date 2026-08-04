import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import { Header, PinDots, PinPad, Screen } from '@/components/ui';
import { PIN_LENGTH } from '@/lib/auth/secret';
import { haptics } from '@/lib/utils/haptics';
import { useAuthStore } from '@/store/useAuthStore';
import { colors, spacing, typography } from '@/theme';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterStep2Pin'>;

export function RegisterStep2PinScreen({ navigation, route }: Props) {
  const setPin = useAuthStore((state) => state.setPin);
  const [stage, setStage] = useState<'create' | 'confirm'>('create');
  const [firstPin, setFirstPin] = useState('');
  const [pin, setPinValue] = useState('');
  const [error, setError] = useState(false);
  const shakeX = useSharedValue(0);

  const shakeStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shakeX.value }] }));

  const triggerError = () => {
    haptics.error();
    setError(true);
    shakeX.value = withSequence(
      withTiming(-10, { duration: 40 }),
      withTiming(10, { duration: 40 }),
      withTiming(-10, { duration: 40 }),
      withTiming(0, { duration: 40 })
    );
    setTimeout(() => {
      setPinValue('');
      setError(false);
    }, 350);
  };

  const handleDigit = async (digit: string) => {
    if (pin.length >= PIN_LENGTH) return;
    const next = pin + digit;
    setPinValue(next);

    if (next.length === PIN_LENGTH) {
      if (stage === 'create') {
        setFirstPin(next);
        setTimeout(() => {
          setStage('confirm');
          setPinValue('');
        }, 200);
      } else {
        if (next === firstPin) {
          haptics.success();
          await setPin(next);
          navigation.navigate('RegisterStep3Consent', route.params);
        } else {
          triggerError();
        }
      }
    }
  };

  const handleBackspace = () => setPinValue((current) => current.slice(0, -1));

  return (
    <Screen variant="gradient">
      <Header title="Definir PIN" onBack={navigation.goBack} variant="dark" />
      <View style={styles.content}>
        <Text style={styles.heading}>
          {stage === 'create' ? 'Crie um PIN de 4 dígitos' : 'Confirme seu PIN'}
        </Text>
        <Text style={styles.subheading}>Usado para desbloquear o app rapidamente</Text>

        <Animated.View style={[styles.dotsWrapper, shakeStyle]}>
          <PinDots length={PIN_LENGTH} filled={pin.length} error={error} />
        </Animated.View>

        <View style={styles.pad}>
          <PinPad onDigit={handleDigit} onBackspace={handleBackspace} variant="dark" />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  heading: {
    ...typography.heading2,
    color: colors.text.onDark,
    textAlign: 'center',
  },
  subheading: {
    ...typography.bodySmall,
    color: colors.text.onDarkMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
  dotsWrapper: {
    marginBottom: spacing.xxl,
  },
  pad: {
    marginTop: 'auto',
    marginBottom: spacing.xl,
  },
});
