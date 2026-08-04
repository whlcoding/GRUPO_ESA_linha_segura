import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ChatConversationScreen } from '@/screens/chat/ChatConversationScreen';
import { ChatConversationsListScreen } from '@/screens/chat/ChatConversationsListScreen';
import type { ChatStackParamList } from './types';

const Stack = createNativeStackNavigator<ChatStackParamList>();

export function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatConversationsList" component={ChatConversationsListScreen} />
      <Stack.Screen name="ChatConversation" component={ChatConversationScreen} />
    </Stack.Navigator>
  );
}
