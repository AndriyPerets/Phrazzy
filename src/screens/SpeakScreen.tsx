import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TheText from '../components/base/TheText.tsx';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {WHITE} from '../colors.ts';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator.tsx';

const SpeakScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  function useTranslation() {
    return {
      t: (key: string) => key,
    };
  }

  const {t} = useTranslation();
  // const {speak} = useSpeak();
  const [speak, setSpeak] = useState('');

  const handleSpeak = () => {
    // setSpeak('Hello');
    // navigation.navigate('Speak');
  };

  return (
    <View style={styles.container}>
      <TheText style={styles.title}>{t('speakScreen.title')}</TheText>
      <TheText style={styles.speak}>{speak}</TheText>
      <TouchableOpacity style={styles.button} onPress={handleSpeak}>
        <TheText style={styles.buttonText}>{t('speakScreen.speak')}</TheText>
      </TouchableOpacity>
    </View>
  );
};

export default SpeakScreen;

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
  speak: {
    fontSize: 48,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: WHITE,
    fontSize: 24,
  },
});
