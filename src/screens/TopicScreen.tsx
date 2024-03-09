import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import TheText from '../components/base/TheText';
import {BLACK, BRIGHTBLUE, LIGHTGRAY, WHITE} from '../colors';
import {BlackItalic} from '../fonts';
import VerticalSpace from '../components/base/VerticalSpace';
import CommonButton from '../components/base/CommonButton';
import BackIcon from '../components/svg/back';

const TopicScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleTopic = (topic: string) => {
    setSelectedTopic(topic);
  };

  let topics = ['Greetings', 'Food', 'Travel', 'Shopping', 'Directions'];

  const handleNext = () => {
    navigation.navigate('PhraseScreen');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <VerticalSpace height={70} />
      <View style={styles.title}>
        <TouchableOpacity onPress={handleBack} style={styles.icon}>
          <BackIcon />
        </TouchableOpacity>
        <TheText
          fontFamily={BlackItalic}
          fontSize={16}
          color={BLACK}
          textTransform={'uppercase'}>
          Select a topic
        </TheText>
        <View style={styles.icon} />
      </View>
      <VerticalSpace height={20} />
      <FlatList
        data={topics}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.topic}>
            {/*<VerticalSpace height={20} />*/}
            <CommonButton
              title={item}
              onPress={() => handleTopic(item)}
              width={'80%'}
              color={selectedTopic === item ? BRIGHTBLUE : LIGHTGRAY}
              textColor={BLACK}
              borderRadius={25}
            />
            <VerticalSpace height={20} />
          </View>
        )}
      />
      <View style={styles.footer}>
        <CommonButton
          title={'Next'}
          onPress={handleNext}
          width={'80%'}
          color={selectedTopic !== '' ? BRIGHTBLUE : LIGHTGRAY}
          textColor={BLACK}
          borderRadius={25}
        />
      </View>
      <VerticalSpace height={20} />
    </View>
  );
};

export default TopicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  title: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  subTitle: {
    width: '80%',
    height: 40,
    // justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  topic: {
    width: '80%',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'red',
  },
});
