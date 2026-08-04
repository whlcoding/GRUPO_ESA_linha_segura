import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { colors } from '@/theme';
import { ChatStack } from './ChatStack';
import { ForumStack } from './ForumStack';
import { GuidanceStack } from './GuidanceStack';
import { HomeStack } from './HomeStack';
import { SecurityStack } from './SecurityStack';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
  HomeTab: 'home',
  ForumTab: 'people-circle',
  GuidanceTab: 'document-text',
  SecurityTab: 'shield-checkmark',
  ChatTab: 'chatbubble-ellipses',
};

const LABELS: Record<keyof MainTabParamList, string> = {
  HomeTab: 'Início',
  ForumTab: 'Fórum',
  GuidanceTab: 'Orientação',
  SecurityTab: 'Segurança',
  ChatTab: 'Chat',
};

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const focusedRouteName = getFocusedRouteNameFromRoute(route);
        const hideTabBar = route.name === 'HomeTab' && focusedRouteName === 'EmergencyAlert';

        return {
          headerShown: false,
          tabBarActiveTintColor: colors.primary.default,
          tabBarInactiveTintColor: colors.text.secondary,
          tabBarLabel: LABELS[route.name],
          tabBarStyle: hideTabBar ? { display: 'none' } : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={ICONS[route.name]} color={color} size={size} />
          ),
        };
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="ForumTab" component={ForumStack} />
      <Tab.Screen name="GuidanceTab" component={GuidanceStack} />
      <Tab.Screen name="SecurityTab" component={SecurityStack} />
      <Tab.Screen name="ChatTab" component={ChatStack} />
    </Tab.Navigator>
  );
}
