import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from '../../navigation/MainStack';
import React, {FC, useCallback, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {WHITE} from '../../colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ListItem from '../../components/base/ListItem';
import {
  savePhrases,
  Phrases,
  PHRASES_LIST,
} from '../../asyncStorageApi/phrases';
import MegaButton from '../../components/base/MegaButton';
import {usePhrases} from '../../hook/useSavePhrases';

type SelectPhrasesNavigationProp = StackScreenProps<
  MainStackParamList,
  'SelectPhrases'
>;

const SelectPhrases: FC<SelectPhrasesNavigationProp> = ({navigation}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const [isSaving, setSaving] = useState(false);
  const {phrasesToLearn, setPhrasesToLearn} = usePhrases();

  const onItemPress = useCallback(
    (value: Phrases) => {
      setPhrasesToLearn(value);
    },
    [setPhrasesToLearn],
  );

  const onContinuePress = useCallback(async () => {
    if (phrasesToLearn) {
      setSaving(true);
      await savePhrases(phrasesToLearn);
      setSaving(false);
      navigation.navigate('SpeakPhrases');
    }
  }, [navigation, phrasesToLearn]);

  const renderItem: ListRenderItem<{value: Phrases; label: string}> =
    useCallback(
      ({item}) => (
        <ListItem
          onPress={onItemPress}
          item={item}
          isSelected={item.value === phrasesToLearn}
        />
      ),
      [onItemPress, phrasesToLearn],
    );

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  return (
    <View
      style={[styles.container, {paddingBottom: safeAreaInsets.bottom + 16}]}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={ItemSeparatorComponent}
        data={PHRASES_LIST.map(phrases => ({
          value: phrases,
          label: phrases.toString(),
        }))}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <MegaButton
        onPress={onContinuePress}
        loading={isSaving}
        disabled={!phrasesToLearn}
        text={'Continue'}
      />
    </View>
  );
};

export default SelectPhrases;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    gap: 12,
    paddingHorizontal: 16,
  },

  contentContainer: {
    paddingTop: 16,
  },

  separator: {
    height: 12,
  },
});
