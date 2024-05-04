import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import TheText from '../components/base/TheText';
import {BLACK, BRIGHTBLUE, GRAY, LIGHTGRAY, WHITE} from '../colors';
import VerticalSpace from '../components/base/VerticalSpace';
import BackIcon from '../components/svg/back';
import {BlackItalic} from '../fonts';
import CommonButton from '../components/base/CommonButton';
import {BottomStackParamList} from '../navigation/BottomStack';
import {StackScreenProps} from '@react-navigation/stack';

type PhraseScreenNavigationProp = StackScreenProps<
  BottomStackParamList,
  'PhraseScreen'
>;

const PhraseScreen = ({navigation, route}: PhraseScreenNavigationProp) => {
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedPhrase, setSelectedPhrase] = useState('');
  const phrases = route.params?.phrases || [];

  const handlePhrase = (phrase: string) => {
    setSelectedPhrase(phrase);
  };

  const handleNext = () => {
    if (selectedPhrase !== '') {
      navigation.navigate('SpeakScreen');
    }
  };

  const handleBack = () => {
    navigation.navigate('TopicScreen');
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
          Select phrases
        </TheText>
        <View style={styles.icon} />
      </View>
      <VerticalSpace height={20} />
      <FlatList
        data={phrases}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.topic}>
            <CommonButton
              title={item}
              onPress={() => handlePhrase(item)}
              width={'80%'}
              color={selectedPhrase === item ? BRIGHTBLUE : LIGHTGRAY}
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
          color={selectedPhrase !== '' ? BRIGHTBLUE : LIGHTGRAY}
          textColor={BLACK}
          borderColor={GRAY}
        />
      </View>
      <VerticalSpace height={40} />
    </View>
  );
};

export default PhraseScreen;

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
