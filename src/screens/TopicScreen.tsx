import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import TheText from '../components/base/TheText.tsx';
import {WHITE} from '../colors.ts';
import StarIcon from '../components/svg/start.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator.tsx';

const TopicScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  // const {t} = useTranslation();
  // const {topics, setTopic} = useTopic();
  // const {setPhrase} = usePhrase();
  // const {setSpeak} = useSpeak();
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleTopic = (topic: string) => {
    setSelectedTopic(topic);
    // setTopic(topic);
    // setPhrase('');
    // setSpeak('');
    navigation.navigate('PhraseScreen');
  };

  let topics = ['Greetings', 'Food', 'Travel', 'Shopping', 'Directions'];

  const t = (title: string) => {
    return undefined;
  };

  return (
    <View style={styles.container}>
      <TheText style={styles.title}>{t('topicScreen.title')}</TheText>
      <FlatList
        data={topics}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleTopic(item)}>
            <TheText style={styles.item}>{item}</TheText>
            {selectedTopic === item && <StarIcon color={WHITE} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TopicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    fontSize: 20,
  },
});
