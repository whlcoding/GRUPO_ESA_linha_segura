import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CamouflageSettingsScreen } from '@/screens/security/CamouflageSettingsScreen';
import { ChangePinScreen } from '@/screens/security/ChangePinScreen';
import { FakeAppActivatedScreen } from '@/screens/security/FakeAppActivatedScreen';
import { FakeAppSelectorScreen } from '@/screens/security/FakeAppSelectorScreen';
import { SecuritySettingsScreen } from '@/screens/security/SecuritySettingsScreen';
import type { SecurityStackParamList } from './types';

const Stack = createNativeStackNavigator<SecurityStackParamList>();

export function SecurityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SecuritySettings" component={SecuritySettingsScreen} />
      <Stack.Screen name="ChangePin" component={ChangePinScreen} />
      <Stack.Screen name="CamouflageSettings" component={CamouflageSettingsScreen} />
      <Stack.Screen name="FakeAppSelector" component={FakeAppSelectorScreen} />
      <Stack.Screen name="FakeAppActivated" component={FakeAppActivatedScreen} />
    </Stack.Navigator>
  );
}
