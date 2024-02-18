import React from 'react';
import {StyleSheet, View} from 'react-native';
import TheText from '../components/base/TheText.tsx';
import CommonButton from '../components/base/CommonButton.tsx';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator.tsx';
import {BLACK, GRAY} from '../colors.ts';
import Start from '../components/svg/start.tsx';
import {Black, Bold, Italic} from '../fonts.ts';

const HelloScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  function handleStart() {
    navigation.navigate('Main', {screen: 'LanguageScreen'});
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TheText color={BLACK} fontSize={32} fontFamily={Black}>
          Hi! I’m Phrazzy{' '}
        </TheText>
        <TheText color={GRAY} fontSize={12}>
          Your assistant in phrase practice{' '}
        </TheText>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.icon}>
          <Start />
        </View>
        <View style={styles.button}>
          <CommonButton
            title={'Start'}
            onPress={handleStart}
            width={'80%'}
            color={BLACK}
          />
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
  button: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: BLACK,
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    // borderWidth: 1,
    // borderColor: BLACK,
  },
});
