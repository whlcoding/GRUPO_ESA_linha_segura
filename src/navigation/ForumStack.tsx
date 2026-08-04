import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ForumListScreen } from '@/screens/forum/ForumListScreen';
import { ForumNewPostScreen } from '@/screens/forum/ForumNewPostScreen';
import { ForumPostDetailScreen } from '@/screens/forum/ForumPostDetailScreen';
import type { ForumStackParamList } from './types';

const Stack = createNativeStackNavigator<ForumStackParamList>();

export function ForumStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ForumList" component={ForumListScreen} />
      <Stack.Screen name="ForumPostDetail" component={ForumPostDetailScreen} />
      <Stack.Screen
        name="ForumNewPost"
        component={ForumNewPostScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
