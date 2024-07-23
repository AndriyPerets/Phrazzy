import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from '../../navigation/MainStack';
import React, {FC, useCallback, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {WHITE} from '../../colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ListItem from '../../components/base/ListItem';
import {saveTopic, Topic, TOPIC_LIST} from '../../asyncStorageApi/topic';
import MegaButton from '../../components/base/MegaButton';
import {useTopic} from '../../hook/useSaveTopics';

type SelectTopicNavigationProp = StackScreenProps<
  MainStackParamList,
  'SelectTopic'
>;

const SelectTopic: FC<SelectTopicNavigationProp> = ({navigation}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const [isSaving, setSaving] = useState(false);
  const {topicToLearn, setTopicToLearn} = useTopic();

  const onItemPress = useCallback(
    (value: Topic) => {
      setTopicToLearn(value);
    },
    [setTopicToLearn],
  );

  const onContinuePress = useCallback(async () => {
    if (topicToLearn) {
      setSaving(true);
      await saveTopic(topicToLearn);
      setSaving(false);
      navigation.navigate('SelectPhrases');
    }
  }, [navigation, topicToLearn]);

  const renderItem: ListRenderItem<{value: Topic; label: string}> = useCallback(
    ({item}) => (
      <ListItem
        onPress={onItemPress}
        item={item}
        isSelected={item.value === topicToLearn}
      />
    ),
    [onItemPress, topicToLearn],
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
        data={TOPIC_LIST.map(topic => ({
          value: topic,
          label: topic.toString(),
        }))}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <MegaButton
        onPress={onContinuePress}
        loading={isSaving}
        disabled={!topicToLearn}
        text={'Continue'}
      />
    </View>
  );
};

export default SelectTopic;

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
