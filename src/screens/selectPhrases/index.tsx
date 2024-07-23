import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from '../../navigation/MainStack';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {WHITE} from '../../colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ListItem from '../../components/base/ListItem';
import {savePhrases} from '../../asyncStorageApi/phrases';
import MegaButton from '../../components/base/MegaButton';
import {usePhrases} from '../../hook/useSavePhrases';
import {useTopic} from '../../hook/useSaveTopics';
import {useLanguage} from '../../hook/useLanguage';

type SelectPhrasesNavigationProp = StackScreenProps<
  MainStackParamList,
  'SelectPhrases'
>;

const SelectPhrases: FC<SelectPhrasesNavigationProp> = ({navigation}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const [isSaving, setSaving] = useState(false);
  const {phrasesToLearn, setPhrasesToLearn, availablePhrases} = usePhrases();
  const {topicToLearn} = useTopic();
  const {languageToLearn} = useLanguage();

  const onItemPress = useCallback(
    (value: string) => {
      const currentIndex = phrasesToLearn?.indexOf(value);
      let newPhrasesToLearn = [];

      if (currentIndex === -1 || !phrasesToLearn) {
        newPhrasesToLearn = [...(phrasesToLearn || []), value];
      } else {
        newPhrasesToLearn = phrasesToLearn.filter((_, index) => index !== currentIndex);
      }

      setPhrasesToLearn(newPhrasesToLearn);
    },
    [phrasesToLearn, setPhrasesToLearn],
  );

  const onContinuePress = useCallback(async () => {
    if (phrasesToLearn && phrasesToLearn.length > 0) {
      setSaving(true);
      await savePhrases(phrasesToLearn, topicToLearn, languageToLearn);
      setSaving(false);
      navigation.navigate('SpeakPhrases');
    }
  }, [navigation, phrasesToLearn, topicToLearn, languageToLearn]);

  const renderItem: ListRenderItem<{value: string; label: string}> =
    useCallback(
      ({item}) => (
        <ListItem
          onPress={onItemPress}
          item={item}
          isSelected={phrasesToLearn?.includes(item.value)}
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
        data={availablePhrases.map((phrase)  => ({
          value: phrase,
          label: phrase
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
