import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TheText from '../components/base/TheText';
import {BLACK, BRIGHTBLUE, GRAY} from '../colors';
import Go from '../components/svg/go';
import {BlackItalic, UltraLightItalic} from '../fonts';
import React, {useEffect, useState} from 'react';
import VerticalSpace from '../components/base/VerticalSpace';
import BackIcon from '../components/svg/back';
import CommonButton from '../components/base/CommonButton';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomStackParamList} from '../navigation/BottomStack';
import {initialPhrases} from '../config/phrases';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SpeakScreenNavigationProp = StackScreenProps<
  BottomStackParamList,
  'SpeakScreen'
>;
const SpeakScreen = ({navigation, route}: SpeakScreenNavigationProp) => {
  useEffect(() => {
    console.log('Received phrases:', route.params.selectedPhrases);
  }, [route.params.selectedPhrases]);
  const [selectedPhrases, setSelectedPhrases] = useState<string[]>(
    route.params.selectedPhrases || [],
  );
  useEffect(() => {
    setSelectedPhrases(route.params.selectedPhrases || []);
  }, [route.params.selectedPhrases]);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [goScreen, setGoScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGoScreen(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = async () => {
    const selectedTopic = await AsyncStorage.getItem('selectedTopic');
    if (selectedTopic) {
      navigation.navigate('PhraseScreen', {
        topic: selectedTopic,
        phrases: initialPhrases[selectedTopic],
      });
    } else {
      navigation.navigate('TopicScreen');
    }
  };

  const handleNext = () => {
    if (currentPhraseIndex < selectedPhrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
    } else {
      setCurrentPhraseIndex(0);
    }
  };

  return (
    <View style={styles.container}>
      {goScreen ? (
        <>
          <View style={styles.textContainer}>
            <TheText color={BLACK} fontSize={96} fontFamily={UltraLightItalic}>
              Go!
            </TheText>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.iconGo}>
              <Go />
            </View>
          </View>
        </>
      ) : (
        <>
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
              Speak a phrase
            </TheText>
            <View style={styles.icon} />
          </View>
          <TheText
            fontFamily={UltraLightItalic}
            fontSize={24}
            color={BLACK}
            style={styles.phrase}>
            {selectedPhrases[currentPhraseIndex]}
          </TheText>
          <View style={styles.footer}>
            <CommonButton
              title={'Next Phrase'}
              onPress={handleNext}
              width={'80%'}
              color={BRIGHTBLUE}
              textColor={BLACK}
              borderColor={GRAY}
            />
          </View>
          <VerticalSpace height={40} />
        </>
      )}
    </View>
  );
};

export default SpeakScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: BLACK,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: BLACK,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  iconGo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    // borderWidth: 1,
    // borderColor: BLACK,
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
  phrase: {
    textAlign: 'center',
    marginHorizontal: 20, // Add margins for better text display
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
