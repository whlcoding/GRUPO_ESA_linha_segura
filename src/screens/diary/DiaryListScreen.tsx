import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';

import { DiaryEntryCard } from '@/components/domain/DiaryEntryCard';
import { EmptyState, Fab, Header, Screen } from '@/components/ui';
import { useDiaryStore } from '@/store/useDiaryStore';
import { spacing } from '@/theme';
import type { HomeStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'DiaryList'>;

export function DiaryListScreen({ navigation }: Props) {
  const entries = useDiaryStore((state) => state.entries);

  return (
    <Screen variant="plain">
      <Header title="Diário" onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {entries.length === 0 ? (
          <EmptyState
            icon="📔"
            title="Nenhum registro ainda"
            description="Registre datas, fatos e sensações. Isso pode ajudar você no futuro."
          />
        ) : (
          entries.map((entry) => (
            <DiaryEntryCard
              key={entry.id}
              entry={entry}
              onPress={() => navigation.navigate('DiaryEntryForm', { entryId: entry.id })}
            />
          ))
        )}
      </ScrollView>
      <Fab testID="diary-new-entry-fab" onPress={() => navigation.navigate('DiaryEntryForm', {})} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.xl, paddingBottom: 100, flexGrow: 1 },
});
