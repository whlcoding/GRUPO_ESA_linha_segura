import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthorityContactDetailScreen } from '@/screens/guidance/AuthorityContactDetailScreen';
import { AuthorityContactsListScreen } from '@/screens/guidance/AuthorityContactsListScreen';
import { AuthorityMessageSentScreen } from '@/screens/guidance/AuthorityMessageSentScreen';
import { GuidanceScreen } from '@/screens/guidance/GuidanceScreen';
import type { GuidanceStackParamList } from './types';

const Stack = createNativeStackNavigator<GuidanceStackParamList>();

export function GuidanceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Guidance" component={GuidanceScreen} />
      <Stack.Screen name="AuthorityContactsList" component={AuthorityContactsListScreen} />
      <Stack.Screen name="AuthorityContactDetail" component={AuthorityContactDetailScreen} />
      <Stack.Screen name="AuthorityMessageSent" component={AuthorityMessageSentScreen} />
    </Stack.Navigator>
  );
}
