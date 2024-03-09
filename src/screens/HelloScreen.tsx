import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {UltraLightItalic} from '../fonts';
import {RootStackParamList} from '../navigation/AppNavigator';
import TheText from '../components/base/TheText';
import {BLACK, GRAY} from '../colors';
import Start from '../components/svg/start';
import CommonButton from '../components/base/CommonButton';

const HelloScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleStart = () => {
    navigation.navigate('Main', {screen: 'LanguageScreen'});
  };

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
        <View style={styles.button}>
          <CommonButton
            title={' Start'}
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
