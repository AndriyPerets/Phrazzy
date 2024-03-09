import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TheText from '../components/base/TheText';
import {BLACK, BRIGHTBLUE, LIGHTGRAY} from '../colors';
import Go from '../components/svg/go';
import {BlackItalic, UltraLightItalic} from '../fonts';
import React, {useEffect, useState} from 'react';
import VerticalSpace from '../components/base/VerticalSpace';
import BackIcon from '../components/svg/back';
import CommonButton from '../components/base/CommonButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';

const SpeakScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [showGo, setShowGo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGo(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {};

  return (
    <View style={styles.container}>
      {showGo ? (
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
          <View style={styles.footer}>
            <CommonButton
              title={'Next Phrase'}
              onPress={handleNext}
              width={'80%'}
              color={BRIGHTBLUE}
              textColor={BLACK}
              borderRadius={25}
            />
          </View>
          <VerticalSpace height={20} />
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
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'red',
  },
});
