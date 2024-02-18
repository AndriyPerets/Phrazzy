import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import TheText from '../components/base/TheText.tsx';
import {WHITE} from '../colors.ts';
import StarIcon from '../components/svg/start.tsx';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator.tsx';

const PhraseScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  function useTranslation() {
    return {
      t: (key: string) => key,
    };
  }

  const {t} = useTranslation();
  // const {phrases, setPhrase} = usePhrase();
  // const {setSpeak} = useSpeak();
  const [selectedPhrase, setSelectedPhrase] = useState('');

  const handlePhrase = (phrase: string) => {
    setSelectedPhrase(phrase);
    // setPhrase(phrase);
    // setSpeak('');
    navigation.navigate('SpeakScreen');
  };

  let phrases = ['Hello', 'Goodbye', 'Please', 'Thank you', 'Yes', 'No'];

  return (
    <View style={styles.container}>
      <TheText style={styles.title}>{t('phraseScreen.title')}</TheText>
      <FlatList
        data={phrases}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handlePhrase(item)}>
            <TheText style={styles.item}>{item}</TheText>
            {selectedPhrase === item && <StarIcon color={WHITE} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PhraseScreen;

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
    fontSize: 18,
  },
});
