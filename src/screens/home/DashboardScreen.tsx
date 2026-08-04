import { Ionicons } from '@expo/vector-icons';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui';
import { PanicButtonCard } from '@/components/domain/PanicButtonCard';
import { QuickAccessGrid, type QuickAccessItem } from '@/components/domain/QuickAccessGrid';
import { relativeTime } from '@/lib/utils/date';
import type { HomeStackParamList, MainTabParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/useAuthStore';
import { useForumStore } from '@/store/useForumStore';
import { useNotificationsStore } from '@/store/useNotificationsStore';
import { colors, primaryGradient, radii, spacing, typography } from '@/theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props) {
  const profile = useAuthStore((state) => state.profile);
  const latestPost = useForumStore((state) => state.posts[0]);
  const unreadNotifications = useNotificationsStore(
    (state) => state.notifications.filter((item) => !item.read).length
  );
  const tabNavigation = navigation.getParent<BottomTabNavigationProp<MainTabParamList>>();

  const quickAccessItems: QuickAccessItem[] = [
    {
      key: 'contacts',
      icon: 'people',
      iconColor: '#4C3A8F',
      iconBackground: '#EDE9FE',
      title: 'Contatos',
      subtitle: 'Rede de confiança',
      onPress: () => navigation.navigate('ContactsList'),
    },
    {
      key: 'emergency',
      icon: 'alert-circle',
      iconColor: '#B91C3C',
      iconBackground: '#FCE4E8',
      title: 'Emergência',
      subtitle: 'Serviços 24h',
      onPress: () => navigation.navigate('EmergencyAlert'),
    },
    {
      key: 'diary',
      icon: 'book',
      iconColor: '#2FA36B',
      iconBackground: '#E3F5EC',
      title: 'Diário',
      subtitle: 'Registrar ocorrências',
      onPress: () => navigation.navigate('DiaryList'),
    },
    {
      key: 'chat',
      icon: 'chatbubble-ellipses',
      iconColor: '#0891B2',
      iconBackground: '#E0F7FA',
      title: 'Chat Seguro',
      subtitle: 'Mensagens criptografadas',
      onPress: () => tabNavigation?.navigate('ChatTab'),
    },
    {
      key: 'professionals',
      icon: 'briefcase',
      iconColor: '#D98C1C',
      iconBackground: '#FBEBD3',
      title: 'Profissionais',
      subtitle: 'Psicólogos, advogados',
      onPress: () => tabNavigation?.navigate('GuidanceTab'),
    },
    {
      key: 'guidance',
      icon: 'document-text',
      iconColor: '#4C3A8F',
      iconBackground: '#EDE9FE',
      title: 'Orientações',
      subtitle: 'Seus direitos',
      onPress: () => tabNavigation?.navigate('GuidanceTab'),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={primaryGradient.colors}
        start={primaryGradient.start}
        end={primaryGradient.end}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greetingSmall}>Bom dia, bem-vinda</Text>
            <Text style={styles.greetingBig}>
              {profile?.name ? `Você está segura aqui, ${profile.name} 💜` : 'Você está segura aqui 💜'}
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <Pressable
              testID="notifications-bell"
              onPress={() => navigation.navigate('Notifications')}
              style={styles.iconButton}
              hitSlop={8}
            >
              <Ionicons name="notifications-outline" size={20} color={colors.text.onDark} />
              {unreadNotifications > 0 ? <View style={styles.notificationDot} /> : null}
            </Pressable>
            <View style={styles.avatar}>
              <Ionicons name="person" size={18} color={colors.text.onDark} />
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <PanicButtonCard onTrigger={() => navigation.navigate('EmergencyAlert')} />

        <Text style={styles.sectionTitle}>O que você precisa</Text>
        <QuickAccessGrid items={quickAccessItems} />

        <View style={styles.forumHeader}>
          <Text style={styles.sectionTitle}>Fórum Recente</Text>
          <Pressable onPress={() => tabNavigation?.navigate('ForumTab')}>
            <Text style={styles.link}>Ver tudo</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => tabNavigation?.navigate('ForumTab')}>
          <Card>
            {latestPost ? (
              <>
                <Text style={styles.forumAuthor}>{latestPost.authorAlias}</Text>
                <Text style={styles.forumTitle}>{latestPost.title}</Text>
                <Text style={styles.forumPlaceholder} numberOfLines={2}>
                  {latestPost.content}
                </Text>
                <Text style={styles.forumTime}>{relativeTime(latestPost.createdAt)}</Text>
              </>
            ) : (
              <Text style={styles.forumPlaceholder}>
                As publicações recentes do fórum aparecerão aqui.
              </Text>
            )}
          </Card>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface.muted,
  },
  header: {
    paddingTop: 60,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    borderBottomLeftRadius: radii.lg,
    borderBottomRightRadius: radii.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greetingSmall: {
    ...typography.caption,
    color: colors.text.onDarkMuted,
  },
  greetingBig: {
    ...typography.heading3,
    color: colors.text.onDark,
    marginTop: 2,
    maxWidth: 240,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger.default,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  sectionTitle: {
    ...typography.heading3,
    color: colors.text.primary,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  forumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  link: {
    ...typography.bodySmall,
    color: colors.primary.accent,
    fontWeight: '600',
  },
  forumPlaceholder: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  forumAuthor: {
    ...typography.caption,
    color: colors.primary.accent,
    fontWeight: '700',
    marginBottom: 2,
  },
  forumTitle: {
    ...typography.heading3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  forumTime: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
});
