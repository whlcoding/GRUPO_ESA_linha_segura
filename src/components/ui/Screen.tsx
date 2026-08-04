import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import type { PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { colors, primaryGradient } from '@/theme';

type ScreenProps = PropsWithChildren<{
  variant?: 'gradient' | 'plain';
  edges?: Edge[];
  style?: ViewStyle;
}>;

export function Screen({ variant = 'plain', edges = ['top', 'bottom'], style, children }: ScreenProps) {
  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={primaryGradient.colors}
        start={primaryGradient.start}
        end={primaryGradient.end}
        style={styles.fill}
      >
        <StatusBar style="light" />
        <SafeAreaView edges={edges} style={[styles.fill, style]}>
          {children}
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.fill, { backgroundColor: colors.surface.muted }]}>
      <StatusBar style="dark" />
      <SafeAreaView edges={edges} style={[styles.fill, style]}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
