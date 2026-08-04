import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import { Header, PinDots, PinPad, Screen } from '@/components/ui';
import { PIN_LENGTH } from '@/lib/auth/secret';
import { haptics } from '@/lib/utils/haptics';
import { useAuthStore } from '@/store/useAuthStore';
import { colors, spacing, typography } from '@/theme';
import type { SecurityStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<SecurityStackParamList, 'ChangePin'>;

type Stage = 'verify' | 'create' | 'confirm';

const STAGE_TITLES: Record<Stage, string> = {
  verify: 'Digite seu PIN atual',
  create: 'Crie o novo PIN',
  confirm: 'Confirme o novo PIN',
};

export function ChangePinScreen({ navigation }: Props) {
  const unlockWithPin = useAuthStore((state) => state.unlockWithPin);
  const setPin = useAuthStore((state) => state.setPin);

  const [stage, setStage] = useState<Stage>('verify');
  const [firstNewPin, setFirstNewPin] = useState('');
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
    if (next.length !== PIN_LENGTH) return;

    if (stage === 'verify') {
      const valid = await unlockWithPin(next);
      if (valid) {
        setStage('create');
        setPinValue('');
      } else {
        triggerError();
      }
      return;
    }

    if (stage === 'create') {
      setFirstNewPin(next);
      setStage('confirm');
      setPinValue('');
      return;
    }

    if (next === firstNewPin) {
      haptics.success();
      await setPin(next);
      navigation.goBack();
    } else {
      triggerError();
    }
  };

  const handleBackspace = () => setPinValue((current) => current.slice(0, -1));

  return (
    <Screen variant="gradient">
      <Header title="Alterar PIN" onBack={navigation.goBack} variant="dark" />
      <View style={styles.content}>
        <Text style={styles.heading}>{STAGE_TITLES[stage]}</Text>
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
    paddingTop: spacing.xxxl,
  },
  heading: {
    ...typography.heading2,
    color: colors.text.onDark,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  dotsWrapper: { marginBottom: spacing.xxl },
  pad: { marginTop: 'auto', marginBottom: spacing.xl },
});
