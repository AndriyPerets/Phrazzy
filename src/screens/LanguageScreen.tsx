import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import TheText from '../components/base/TheText';
import {BLACK, BRIGHTBLUE, GRAY, LIGHTGRAY, WHITE} from '../colors';
import {BlackItalic, Regular} from '../fonts';
import VerticalSpace from '../components/base/VerticalSpace';
import CommonButton from '../components/base/CommonButton';
import GermanyIcon from '../components/svg/germany';
import UKIcon from '../components/svg/uk';
import UkraineIcon from '../components/svg/ukrane';
import {BottomStackParamList} from '../navigation/BottomStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonInput from '../components/base/CommonInput';
import {TextInput as RNTextInput} from 'react-native/Libraries/Components/TextInput/TextInput';
import useOrientation from '../hook/useOrientation';

type LanguageScreenNavigationProp = StackScreenProps<
  BottomStackParamList,
  'LanguageScreen'
>;

const LanguageScreen = ({navigation}: LanguageScreenNavigationProp) => {
  const [isMenuForNativeLanguageOpen, setIsMenuForNativeLanguageOpen] =
    useState(false);
  const [isMenuForLanguageToLearnOpen, setIsMenuForLanguageToLearnOpen] =
    useState(false);
  const [nativeLanguageFilter, setNativeLanguageFilter] = useState('');
  const [languageToLearnFilter, setLanguageToLearnFilter] = useState('');
  const [selectedNativeLanguage, setSelectedNativeLanguage] = useState('');
  const [selectedLanguageToLearn, setSelectedLanguageToLearn] = useState('');
  const nativeLanguageInputRef = useRef<RNTextInput>(null);
  const languageToLearnInputRef = useRef<RNTextInput>(null);
  const isLandscape = useOrientation();

  useEffect(() => {
    if (isMenuForNativeLanguageOpen && nativeLanguageInputRef.current) {
      nativeLanguageInputRef.current.focus();
    }
  }, [isMenuForNativeLanguageOpen]);

  useEffect(() => {
    if (isMenuForLanguageToLearnOpen && languageToLearnInputRef.current) {
      languageToLearnInputRef.current.focus();
    }
  }, [isMenuForLanguageToLearnOpen]);

  // Извлечение сохраненных языков из AsyncStorage при монтировании компонента
  useEffect(() => {
    const getLanguages = async () => {
      const savedNativeLanguage = await AsyncStorage.getItem(
        'selectedNativeLanguage',
      );
      const savedLanguageToLearn = await AsyncStorage.getItem(
        'selectedLanguageToLearn',
      );
      if (savedNativeLanguage) {
        setSelectedNativeLanguage(savedNativeLanguage);
      }
      if (savedLanguageToLearn) {
        setSelectedLanguageToLearn(savedLanguageToLearn);
      }
    };

    getLanguages();
  }, []);

  // Сохранение выбранных языков в AsyncStorage каждый раз, когда они меняются
  useEffect(() => {
    if (selectedNativeLanguage) {
      AsyncStorage.setItem('selectedNativeLanguage', selectedNativeLanguage);
    }
  }, [selectedNativeLanguage]);

  useEffect(() => {
    if (selectedLanguageToLearn) {
      AsyncStorage.setItem('selectedLanguage', selectedLanguageToLearn);
    }
  }, [selectedLanguageToLearn]);

  const handleNativeLanguage = (language: string) => {
    setSelectedNativeLanguage(language);
    setIsMenuForNativeLanguageOpen(false);
    setNativeLanguageFilter('');
  };

  const handleLanguageToLearn = (language: string) => {
    setSelectedLanguageToLearn(language);
    setIsMenuForLanguageToLearnOpen(false);
    setLanguageToLearnFilter('');
  };

  const [languages] = useState([
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Japanese',
    'Chinese',
    'Turkish',
    'Swedish',
    'Russian',
    'Portuguese',
    'Polish',
    'Norwegian',
    'Korean',
    'Hindi',
    'Greek',
    'Finnish',
  ]);

  const [icons] = useState<{[key: string]: JSX.Element}>({
    English: <UKIcon />,
    Spanish: <UkraineIcon />,
    French: <GermanyIcon />,
    German: <GermanyIcon />,
    Italian: <UkraineIcon />,
    Japanese: <UKIcon />,
    Chinese: <UKIcon />,
    Turkish: <UkraineIcon />,
    Swedish: <GermanyIcon />,
    Russian: <GermanyIcon />,
    Portuguese: <UkraineIcon />,
    Polish: <UKIcon />,
    Norwegian: <UKIcon />,
    Korean: <UkraineIcon />,
    Hindi: <GermanyIcon />,
    Greek: <GermanyIcon />,
    Finnish: <UkraineIcon />,
  });

  const handleNext = () => {
    if (selectedLanguageToLearn && selectedNativeLanguage) {
      navigation.navigate('TopicScreen');
    }
  };

  const toggleNativeLanguageMenu = () => {
    setIsMenuForNativeLanguageOpen(!isMenuForNativeLanguageOpen);
    // setIsMenuForNativeLanguageOpen(prevState => !prevState);
  };

  const toggleLanguageToLearnMenu = () => {
    setIsMenuForLanguageToLearnOpen(!isMenuForLanguageToLearnOpen);
  };

  const closeDropdowns = () => {
    setIsMenuForLanguageToLearnOpen(false);
    setIsMenuForNativeLanguageOpen(false);

    setNativeLanguageFilter('');
    setLanguageToLearnFilter('');
  };

  const filteredNativeLanguages =
    nativeLanguageFilter.trim() === ''
      ? languages
      : languages.filter(language =>
          language.toLowerCase().includes(nativeLanguageFilter.toLowerCase()),
        );

  const filteredLanguagesToLearn =
    languageToLearnFilter.trim() === ''
      ? languages
      : languages.filter(language =>
          language.toLowerCase().includes(languageToLearnFilter.toLowerCase()),
        );

  const handleFocusNativeLanguage = () => {
    console.log('Focus input', selectedNativeLanguage);
    setNativeLanguageFilter('');
  };

  const handleFocusLanguageToLearn = () => {
    console.log('Focus input', selectedLanguageToLearn);
    setLanguageToLearnFilter('');
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdowns}>
      <View style={styles.container}>
        <VerticalSpace height={isLandscape ? 20 : 40} />
        <View style={styles.title}>
          <TheText
            fontFamily={BlackItalic}
            fontSize={16}
            color={BLACK}
            textTransform={'uppercase'}>
            Select language
          </TheText>
        </View>
        <View style={styles.subTitle}>
          <TheText fontFamily={Regular} fontSize={16} color={BLACK}>
            Native language
          </TheText>
        </View>
        {!isMenuForNativeLanguageOpen && (
          <CommonButton
            title={selectedNativeLanguage || 'Select your native language'}
            onPress={toggleNativeLanguageMenu}
            width={'80%'}
            color={selectedNativeLanguage !== '' ? LIGHTGRAY : BRIGHTBLUE}
            textColor={BLACK}
            borderRadius={25}
            icon={icons[selectedNativeLanguage]}
            iconPosition={'startOut'}
            justifyContent={
              selectedNativeLanguage !== '' ? 'flex-start' : 'center'
            }
          />
        )}
        {isMenuForNativeLanguageOpen && (
          <>
            <View style={styles.flatListContainer}>
              <CommonInput
                ref={nativeLanguageInputRef}
                value={nativeLanguageFilter}
                onChangeText={setNativeLanguageFilter}
                onFocus={handleFocusNativeLanguage}
              />
              <FlatList
                data={filteredNativeLanguages}
                keyExtractor={item => item}
                ListEmptyComponent={
                  <TheText style={styles.emptyListText}>
                    No languages found.
                  </TheText>
                }
                renderItem={({item}) => (
                  <>
                    <VerticalSpace height={10} />
                    <CommonButton
                      title={item}
                      onPress={() => handleNativeLanguage(item)}
                      width={'80%'}
                      color={LIGHTGRAY}
                      textColor={BLACK}
                      borderRadius={25}
                      icon={icons[item]}
                      iconPosition={'startOut'}
                      justifyContent={'flex-start'}
                    />
                  </>
                )}
                horizontal={false}
              />
            </View>
          </>
        )}
        <VerticalSpace height={20} />
        <View style={styles.subTitle}>
          <TheText fontFamily={Regular} fontSize={16} color={BLACK}>
            Language to learn
          </TheText>
        </View>
        {!isMenuForLanguageToLearnOpen && (
          <CommonButton
            title={selectedLanguageToLearn || 'Select language to learn'}
            onPress={toggleLanguageToLearnMenu}
            width={'80%'}
            color={selectedLanguageToLearn !== '' ? LIGHTGRAY : BRIGHTBLUE}
            textColor={BLACK}
            borderRadius={25}
            icon={icons[selectedLanguageToLearn]}
            iconPosition={'startOut'}
            justifyContent={
              selectedLanguageToLearn !== '' ? 'flex-start' : 'center'
            }
          />
        )}
        {isMenuForLanguageToLearnOpen && (
          <View style={styles.flatListContainer}>
            <CommonInput
              ref={languageToLearnInputRef}
              value={languageToLearnFilter}
              onChangeText={setLanguageToLearnFilter}
              onFocus={handleFocusLanguageToLearn}
            />
            <FlatList
              data={filteredLanguagesToLearn}
              keyExtractor={item => item}
              ListEmptyComponent={
                <TheText style={styles.emptyListText}>
                  No languages found.
                </TheText>
              }
              renderItem={({item}) => (
                <>
                  <VerticalSpace height={10} />
                  <CommonButton
                    title={item}
                    onPress={() => handleLanguageToLearn(item)}
                    width={'80%'}
                    color={LIGHTGRAY}
                    textColor={BLACK}
                    borderRadius={25}
                    icon={icons[item]}
                    iconPosition={'startOut'}
                    justifyContent={'flex-start'}
                  />
                </>
              )}
              horizontal={false}
            />
          </View>
        )}
        <View style={styles.footer}>
          <CommonButton
            title={'Next'}
            onPress={handleNext}
            width={'80%'}
            color={
              selectedLanguageToLearn !== '' && selectedNativeLanguage !== ''
                ? BRIGHTBLUE
                : LIGHTGRAY
            }
            textColor={BLACK}
            borderColor={GRAY}
          />
        </View>
        <VerticalSpace height={40} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  flatListContainer: {
    borderWidth: 1,
    borderColor: GRAY,
    width: '80%',
    borderRadius: 25,
    overflow: 'hidden',
    height: 200,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  title: {
    width: '80%',
    height: 60,
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
  text: {
    width: '80%',
    height: 30,
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
  emptyListText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});
