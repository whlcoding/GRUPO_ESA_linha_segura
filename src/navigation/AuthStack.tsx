import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ForgotPasswordScreen } from '@/screens/auth/ForgotPasswordScreen';
import { LoginScreen } from '@/screens/auth/LoginScreen';
import { RegisterStep1Screen } from '@/screens/auth/RegisterStep1Screen';
import { RegisterStep2PinScreen } from '@/screens/auth/RegisterStep2PinScreen';
import { RegisterStep3ConsentScreen } from '@/screens/auth/RegisterStep3ConsentScreen';
import { SupportIntroScreen } from '@/screens/auth/SupportIntroScreen';
import { WelcomeScreen } from '@/screens/auth/WelcomeScreen';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="RegisterStep1" component={RegisterStep1Screen} />
      <Stack.Screen name="RegisterStep2Pin" component={RegisterStep2PinScreen} />
      <Stack.Screen name="RegisterStep3Consent" component={RegisterStep3ConsentScreen} />
      <Stack.Screen
        name="SupportIntro"
        component={SupportIntroScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
