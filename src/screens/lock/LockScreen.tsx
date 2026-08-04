import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import { PinDots, PinPad, Screen } from '@/components/ui';
import { PIN_LENGTH } from '@/lib/auth/secret';
import { haptics } from '@/lib/utils/haptics';
import { useAuthStore } from '@/store/useAuthStore';
import { colors, spacing, typography } from '@/theme';

export function LockScreen() {
  const profile = useAuthStore((state) => state.profile);
  const biometricsEnabled = useAuthStore((state) => state.biometricsEnabled);
  const unlockWithPin = useAuthStore((state) => state.unlockWithPin);
  const unlockWithBiometrics = useAuthStore((state) => state.unlockWithBiometrics);
  const failedPinAttempts = useAuthStore((state) => state.failedPinAttempts);

  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const shakeX = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shakeX.value }] }));

  useEffect(() => {
    if (biometricsEnabled) {
      unlockWithBiometrics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDigit = async (digit: string) => {
    if (pin.length >= PIN_LENGTH) return;
    const next = pin + digit;
    setPin(next);

    if (next.length === PIN_LENGTH) {
      const success = await unlockWithPin(next);
      if (!success) {
        haptics.error();
        setError(true);
        shakeX.value = withSequence(
          withTiming(-10, { duration: 40 }),
          withTiming(10, { duration: 40 }),
          withTiming(-10, { duration: 40 }),
          withTiming(0, { duration: 40 })
        );
        setTimeout(() => {
          setPin('');
          setError(false);
        }, 350);
      } else {
        haptics.success();
      }
    }
  };

  const handleBackspace = () => setPin((current) => current.slice(0, -1));

  return (
    <Screen variant="gradient">
      <View style={styles.content}>
        <View style={styles.iconBadge}>
          <Ionicons name="shield-checkmark" size={36} color={colors.text.onDark} />
        </View>
        <Text style={styles.title}>
          {profile?.name ? `Olá, ${profile.name}` : 'Bem-vinda de volta'}
        </Text>
        <Text style={styles.subtitle}>Digite seu PIN para continuar</Text>

        <Animated.View style={[styles.dotsWrapper, shakeStyle]}>
          <PinDots length={PIN_LENGTH} filled={pin.length} error={error} />
        </Animated.View>

        {failedPinAttempts > 0 ? (
          <Text style={styles.attempts}>PIN incorreto. Tente novamente.</Text>
        ) : null}

        <View style={styles.pad}>
          <PinPad
            onDigit={handleDigit}
            onBackspace={handleBackspace}
            variant="dark"
            extraKey={
              biometricsEnabled
                ? { icon: 'finger-print', onPress: () => unlockWithBiometrics() }
                : undefined
            }
          />
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
  iconBadge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.surface.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.heading2,
    color: colors.text.onDark,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.text.onDarkMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.xxl,
  },
  dotsWrapper: {
    marginBottom: spacing.lg,
  },
  attempts: {
    ...typography.caption,
    color: colors.danger.default,
    marginBottom: spacing.lg,
  },
  pad: {
    marginTop: 'auto',
    marginBottom: spacing.xl,
  },
});
