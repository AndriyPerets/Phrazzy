import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from '../../navigation/MainStack';
import {WHITE} from '../../colors';
import {Language, LANGUAGE_LIST} from '../../asyncStorageApi/language';
import ListItem from '../../components/base/ListItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useLanguage} from '../../hook/useLanguage';

type LanguageScreenNavigationProp = StackScreenProps<
  MainStackParamList,
  'SelectLanguage'
>;

const SelectLanguage = ({navigation, route}: LanguageScreenNavigationProp) => {
  const {languageType} = route.params;

  const safeAreaInsets = useSafeAreaInsets();

  const {setLanguageToLearn, setNativeLanguage} = useLanguage();

  const onItemPress = useCallback(
    (value: Language) => {
      if (languageType === 'learn') {
        setLanguageToLearn(value);
      } else {
        setNativeLanguage(value);
      }
      navigation.goBack();
    },
    [languageType, setLanguageToLearn, setNativeLanguage, navigation],
  );

  const renderItem: ListRenderItem<{value: Language; label: string}> =
    useCallback(
      ({item}) => <ListItem onPress={onItemPress} item={item} />,
      [onItemPress],
    );

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        {paddingBottom: safeAreaInsets.bottom + 16},
      ]}
      ItemSeparatorComponent={ItemSeparatorComponent}
      data={LANGUAGE_LIST.map(language => ({
        value: language,
        label: language.toString(),
      }))}
      renderItem={renderItem}
    />
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },

  contentContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },

  separator: {
    height: 12,
  },
});
