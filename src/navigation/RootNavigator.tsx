import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { CamouflageOverlay } from '@/screens/camouflage/CamouflageOverlay';
import { LockScreen } from '@/screens/lock/LockScreen';
import { useAuthStore } from '@/store/useAuthStore';
import { useCamouflageStore } from '@/store/useCamouflageStore';
import { colors } from '@/theme';
import { AuthStack } from './AuthStack';
import { MainTabNavigator } from './MainTabNavigator';

export function RootNavigator() {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const hasAccount = useAuthStore((state) => state.hasAccount);
  const isUnlocked = useAuthStore((state) => state.isUnlocked);
  const camouflageEnabled = useCamouflageStore((state) => state.enabled);
  const camouflageRevealed = useCamouflageStore((state) => state.revealed);

  if (!hasHydrated) {
    return (
      <View style={styles.loading}>
        <StatusBar style="dark" />
        <ActivityIndicator color={colors.primary.default} />
      </View>
    );
  }

  if (!hasAccount) return <AuthStack />;

  const showCamouflage = camouflageEnabled && !camouflageRevealed;

  return (
    <View style={styles.fill}>
      <MainTabNavigator />
      {!showCamouflage && !isUnlocked && (
        <View style={StyleSheet.absoluteFill}>
          <LockScreen />
        </View>
      )}
      {showCamouflage && <CamouflageOverlay />}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
