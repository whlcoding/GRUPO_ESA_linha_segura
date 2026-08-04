import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ChatBubble } from '@/components/domain/ChatBubble';
import { Header, Screen, TextField } from '@/components/ui';
import { useChatStore } from '@/store/useChatStore';
import { colors, spacing } from '@/theme';
import type { ChatStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ChatStackParamList, 'ChatConversation'>;

export function ChatConversationScreen({ navigation, route }: Props) {
  const { conversationId } = route.params;
  const conversation = useChatStore((state) =>
    state.conversations.find((item) => item.id === conversationId)
  );
  const allMessages = useChatStore((state) => state.messages);
  const messages = allMessages.filter((message) => message.conversationId === conversationId);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const markAsRead = useChatStore((state) => state.markAsRead);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    markAsRead(conversationId);
  }, [conversationId, markAsRead]);

  if (!conversation) {
    navigation.goBack();
    return null;
  }

  const handleSend = () => {
    if (!draft.trim()) return;
    sendMessage(conversationId, draft.trim());
    setDraft('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <Screen variant="plain">
      <Header title={conversation.title} onBack={navigation.goBack} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.messages}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </ScrollView>
        <View style={styles.inputRow}>
          <View style={styles.inputWrapper}>
            <TextField
              placeholder="Escreva uma mensagem..."
              value={draft}
              onChangeText={setDraft}
            />
          </View>
          <Pressable testID="send-message-button" style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={18} color={colors.text.onDark} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  messages: { padding: spacing.xl, paddingBottom: spacing.md, flexGrow: 1, justifyContent: 'flex-end' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  inputWrapper: { flex: 1 },
  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
