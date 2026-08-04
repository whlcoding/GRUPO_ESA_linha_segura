import { StyleSheet, Text, View } from 'react-native';

import type { ChatMessage } from '@/models/Chat';
import { colors, radii, spacing, typography } from '@/theme';

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isMine = message.sender === 'me';

  return (
    <View style={[styles.row, isMine ? styles.rowMine : styles.rowOther]}>
      <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleOther]}>
        <Text style={[styles.text, isMine ? styles.textMine : styles.textOther]}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: spacing.sm,
    flexDirection: 'row',
  },
  rowMine: { justifyContent: 'flex-end' },
  rowOther: { justifyContent: 'flex-start' },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.lg,
  },
  bubbleMine: {
    backgroundColor: colors.primary.default,
    borderBottomRightRadius: radii.sm,
  },
  bubbleOther: {
    backgroundColor: colors.surface.default,
    borderBottomLeftRadius: radii.sm,
  },
  text: {
    ...typography.bodySmall,
  },
  textMine: { color: colors.text.onDark },
  textOther: { color: colors.text.primary },
});
