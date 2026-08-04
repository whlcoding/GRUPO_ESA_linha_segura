import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AddContactScreen } from '@/screens/contacts/AddContactScreen';
import { ContactsListScreen } from '@/screens/contacts/ContactsListScreen';
import { EditContactScreen } from '@/screens/contacts/EditContactScreen';
import { DiaryEntryFormScreen } from '@/screens/diary/DiaryEntryFormScreen';
import { DiaryListScreen } from '@/screens/diary/DiaryListScreen';
import { DashboardScreen } from '@/screens/home/DashboardScreen';
import { EmergencyAlertScreen } from '@/screens/home/EmergencyAlertScreen';
import { NotificationsScreen } from '@/screens/notifications/NotificationsScreen';
import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen
        name="EmergencyAlert"
        component={EmergencyAlertScreen}
        options={{ presentation: 'fullScreenModal', gestureEnabled: false }}
      />
      <Stack.Screen name="DiaryList" component={DiaryListScreen} />
      <Stack.Screen name="DiaryEntryForm" component={DiaryEntryFormScreen} />
      <Stack.Screen name="ContactsList" component={ContactsListScreen} />
      <Stack.Screen name="AddContact" component={AddContactScreen} />
      <Stack.Screen name="EditContact" component={EditContactScreen} />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
