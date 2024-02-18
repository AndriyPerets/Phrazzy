import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import TheText from '../components/base/TheText.tsx';
import {WHITE} from '../colors.ts';
import StarIcon from '../components/svg/start.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator.tsx';

const LanguageScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  // const {t} = useTranslation();
  // const {languages, setLanguage} = useLanguage();
  // const {setTopic} = useTopic();
  // const {setPhrase} = usePhrase();
  // const {setSpeak} = useSpeak();
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguage = (language: string) => {
    setSelectedLanguage(language);
    // setLanguage(language);
    // setTopic('');
    // setPhrase('');
    // setSpeak('');
    navigation.navigate('TopicScreen');
  };

  let languages = ['English', 'Spanish', 'French', 'German', 'Italian'];

  const t = (title: string) => {
    return undefined;
  };

  return (
    <View style={styles.container}>
      <TheText style={styles.title}>{t('languageScreen.title')}</TheText>
      <FlatList
        data={languages}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleLanguage(item)}>
            <TheText style={styles.item}>{item}</TheText>
            {selectedLanguage === item && <StarIcon color={WHITE} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LanguageScreen;

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
    width: '100%',
    padding: 16,
  },
  item: {
    fontSize: 20,
  },
});
