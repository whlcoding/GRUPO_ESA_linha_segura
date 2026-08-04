import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppLockProvider } from '@/core/providers/AppLockProvider';
import { RootNavigator } from '@/navigation/RootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppLockProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AppLockProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
