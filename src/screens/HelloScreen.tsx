import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {UltraLightItalic} from '../fonts';
import TheText from '../components/base/TheText';
import {BLACK, GRAY} from '../colors';
import Start from '../components/svg/start';
import {MainStackParamList} from '../navigation/MainStack';
import {StackScreenProps} from '@react-navigation/stack';

type HelloScreenNavigationProp = StackScreenProps<
  MainStackParamList,
  'HelloScreen'
>;
const HelloScreen = ({navigation}: HelloScreenNavigationProp) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('UserTargetLanguages');
    }, 1000); // Set to 1000ms or 1 second, adjust as needed

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TheText color={BLACK} fontSize={27} fontFamily={UltraLightItalic}>
          Hi! I’m Phrazzy
        </TheText>
        <TheText color={GRAY} fontSize={12}>
          Your assistant in phrase practice
        </TheText>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.icon}>
          <Start />
        </View>
      </View>
    </View>
  );
};

export default HelloScreen;

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
  icon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    // borderWidth: 1,
    // borderColor: BLACK,
  },
});
