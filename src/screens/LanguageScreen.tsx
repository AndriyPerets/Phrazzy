import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import TheText from '../components/base/TheText';
import {BLACK, BRIGHTBLUE, GRAY, LIGHTGRAY, WHITE} from '../colors';
import {BlackItalic} from '../fonts';
import VerticalSpace from '../components/base/VerticalSpace';
import CommonButton from '../components/base/CommonButton';
import {BottomStackParamList} from '../navigation/BottomStack';
import {TextInput as RNTextInput} from 'react-native/Libraries/Components/TextInput/TextInput';
import useOrientation from '../hook/useOrientation';
import useLanguageDatabase from '../hook/useLanguageDatabase';
import {staticLanguages} from '../config/languages';
import {languageIcons} from '../config/icons';
import LanguageSelectionSection from '../components/LanguageSelectionSection';

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
  const [selectedNativeLanguage, setSelectedNativeLanguage] = useState<
    string | null
  >(null);
  const [selectedLanguageToLearn, setSelectedLanguageToLearn] = useState<
    string | null
  >(null);
  const nativeLanguageInputRef = useRef<RNTextInput>(null);
  const languageToLearnInputRef = useRef<RNTextInput>(null);
  const isLandscape = useOrientation();
  const {insertLanguage, fetchLanguages, languages, dbReady, clearLanguages} =
    useLanguageDatabase();

  const handleNativeClear = () => {
    clearLanguages('native', () => {
      setSelectedNativeLanguage(null);
    });
  };

  const handleLearnClear = () => {
    clearLanguages('learn', () => {
      setSelectedLanguageToLearn(null);
    });
  };

  useEffect(() => {
    if (dbReady) {
      fetchLanguages();
    }
  }, [dbReady]);

  useEffect(() => {
    // Обновление состояний выбранных языков после каждого изменения списка языков
    const updateSelectedLanguages = () => {
      const native = languages.find(lang => lang.type === 'native');
      const learn = languages.find(lang => lang.type === 'learn');
      setSelectedNativeLanguage(native ? native.name : null);
      setSelectedLanguageToLearn(learn ? learn.name : null);
    };

    updateSelectedLanguages();
  }, [languages]);

  const handleSelectLanguage = (language: string, type: 'native' | 'learn') => {
    insertLanguage(language, type);
    if (type === 'native') {
      setSelectedNativeLanguage(language);
      setIsMenuForNativeLanguageOpen(false);
    } else {
      setSelectedLanguageToLearn(language);
      setIsMenuForLanguageToLearnOpen(false);
    }
    setNativeLanguageFilter('');
    setLanguageToLearnFilter('');
  };

  const handleNext = () => {
    if (selectedLanguageToLearn && selectedNativeLanguage) {
      navigation.navigate('TopicScreen');
    }
  };

  const toggleMenu = (type: 'native' | 'learn') => {
    if (type === 'native') {
      // if (!isMenuForNativeLanguageOpen) {
      //   setSelectedNativeLanguage(null);
      // }
      setIsMenuForNativeLanguageOpen(!isMenuForNativeLanguageOpen);
      setIsMenuForLanguageToLearnOpen(false);
    } else {
      // if (!isMenuForLanguageToLearnOpen) {
      //   setSelectedLanguageToLearn(null);
      // }
      setIsMenuForLanguageToLearnOpen(!isMenuForLanguageToLearnOpen);
      setIsMenuForNativeLanguageOpen(false);
    }
  };

  const closeDropdowns = () => {
    setIsMenuForLanguageToLearnOpen(false);
    setIsMenuForNativeLanguageOpen(false);

    setNativeLanguageFilter('');
    setLanguageToLearnFilter('');
  };

  const filteredLanguages = (filter: string) =>
    filter.trim() === ''
      ? staticLanguages
      : staticLanguages.filter(lang =>
          lang.toLowerCase().includes(filter.toLowerCase()),
        );

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
        <LanguageSelectionSection
          title="Native language"
          isOpen={isMenuForNativeLanguageOpen}
          toggleMenu={() => toggleMenu('native')}
          selectedLanguage={selectedNativeLanguage}
          languageFilter={nativeLanguageFilter}
          setLanguageFilter={setNativeLanguageFilter}
          filteredLanguages={filteredLanguages(nativeLanguageFilter)}
          handleSelectLanguage={(lang: string) =>
            handleSelectLanguage(lang, 'native')
          }
          inputRef={nativeLanguageInputRef}
          icons={languageIcons}
          closeIconPress={handleNativeClear}
        />
        <VerticalSpace height={20} />
        <LanguageSelectionSection
          title="Language to learn"
          isOpen={isMenuForLanguageToLearnOpen}
          toggleMenu={() => toggleMenu('learn')}
          selectedLanguage={selectedLanguageToLearn}
          languageFilter={languageToLearnFilter}
          setLanguageFilter={setLanguageToLearnFilter}
          filteredLanguages={filteredLanguages(languageToLearnFilter)}
          handleSelectLanguage={(lang: string) =>
            handleSelectLanguage(lang, 'learn')
          }
          inputRef={languageToLearnInputRef}
          icons={languageIcons}
          closeIconPress={handleLearnClear}
        />
        <View style={styles.footer}>
          <CommonButton
            title={'Next'}
            onPress={handleNext}
            width={'80%'}
            color={
              selectedLanguageToLearn && selectedNativeLanguage
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
