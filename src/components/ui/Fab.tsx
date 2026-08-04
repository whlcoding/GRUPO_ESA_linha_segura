import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

import { colors, radii } from '@/theme';

type FabProps = {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  testID?: string;
};

export function Fab({ onPress, icon = 'add', testID }: FabProps) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [styles.fab, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={26} color={colors.text.onDark} />
    </Pressable>
  );
}

const SIZE = 56;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: SIZE,
    height: SIZE,
    borderRadius: radii.pill,
    backgroundColor: colors.primary.default,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  pressed: {
    opacity: 0.85,
  },
});
