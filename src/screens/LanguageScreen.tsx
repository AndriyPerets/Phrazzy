import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import TheText from '../components/base/TheText';
import {BLACK, BRIGHTBLUE, GRAY, LIGHTGRAY, WHITE} from '../colors';
import {BlackItalic, Regular} from '../fonts';
import VerticalSpace from '../components/base/VerticalSpace';
import CommonButton from '../components/base/CommonButton';
import GermanyIcon from '../components/svg/germany';
import UKIcon from '../components/svg/uk';
import UkraineIcon from '../components/svg/ukrane';
import SpainIcon from '../components/svg/spain';
import {BottomStackParamList} from '../navigation/BottomStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LanguageScreenNavigationProp = StackScreenProps<
  BottomStackParamList,
  'LanguageScreen'
>;

const LanguageScreen = ({navigation}: LanguageScreenNavigationProp) => {
  const [isMenuForNativeLanguageOpen, setIsMenuForNativeLanguageOpen] =
    useState(false);
  const [isMenuForLanguageToLearnOpen, setIsMenuForLanguageToLearnOpen] =
    useState(false);
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedNativeLanguage, setSelectedNativeLanguage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Извлечение сохраненных языков из AsyncStorage при монтировании компонента
  useEffect(() => {
    const getLanguages = async () => {
      const savedNativeLanguage = await AsyncStorage.getItem(
        'selectedNativeLanguage',
      );
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedNativeLanguage) {
        setSelectedNativeLanguage(savedNativeLanguage);
      }
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
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
    if (selectedLanguage) {
      AsyncStorage.setItem('selectedLanguage', selectedLanguage);
    }
  }, [selectedLanguage]);

  const handleNativeLanguage = (language: string) => {
    setSelectedNativeLanguage(language);
    setIsMenuForNativeLanguageOpen(false);
  };

  const handleLanguage = (language: string) => {
    setSelectedLanguage(language);
    setIsMenuForLanguageToLearnOpen(false);
  };

  const [languages] = useState([
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
  ]);

  const [icons] = useState<{[key: string]: JSX.Element}>({
    English: <UKIcon />,
    Spanish: <SpainIcon />,
    French: <GermanyIcon />,
    German: <GermanyIcon />,
    Italian: <UkraineIcon />,
  });

  const handleNext = () => {
    if (selectedLanguage && selectedNativeLanguage) {
      navigation.navigate('TopicScreen');
    }
  };

  return (
    <View style={styles.container}>
      <VerticalSpace height={70} />
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
      <CommonButton
        title={selectedNativeLanguage || 'Select your native language'}
        onPress={() =>
          setIsMenuForNativeLanguageOpen(!isMenuForNativeLanguageOpen)
        }
        width={'80%'}
        color={selectedNativeLanguage !== '' ? LIGHTGRAY : BRIGHTBLUE}
        textColor={BLACK}
        borderRadius={25}
        icon={icons[selectedNativeLanguage]}
        iconPosition={'startOut'}
        justifyContent={selectedNativeLanguage !== '' ? 'flex-start' : 'center'}
      />
      {isMenuForNativeLanguageOpen && (
        <>
          <VerticalSpace height={10} />
          <View style={styles.text}>
            <TheText fontFamily={Regular} fontSize={12} color={BLACK}>
              My native language
            </TheText>
          </View>
          <FlatList
            data={languages}
            keyExtractor={item => item}
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
          />
        </>
      )}
      <VerticalSpace height={20} />
      <View style={styles.subTitle}>
        <TheText fontFamily={Regular} fontSize={16} color={BLACK}>
          Language to learn
        </TheText>
      </View>
      <CommonButton
        title={selectedLanguage || 'Select language to learn'}
        onPress={() =>
          setIsMenuForLanguageToLearnOpen(!isMenuForLanguageToLearnOpen)
        }
        width={'80%'}
        color={selectedLanguage !== '' ? LIGHTGRAY : BRIGHTBLUE}
        textColor={BLACK}
        borderRadius={25}
        icon={icons[selectedLanguage]}
        iconPosition={'startOut'}
        justifyContent={selectedLanguage !== '' ? 'flex-start' : 'center'}
      />
      {isMenuForLanguageToLearnOpen && (
        <>
          <VerticalSpace height={10} />
          <View style={styles.text}>
            <TheText fontFamily={Regular} fontSize={12} color={BLACK}>
              I want to learn
            </TheText>
          </View>
          <FlatList
            data={languages}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <>
                <VerticalSpace height={10} />
                <CommonButton
                  title={item}
                  onPress={() => handleLanguage(item)}
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
          />
        </>
      )}
      <View style={styles.footer}>
        <CommonButton
          title={'Next'}
          onPress={handleNext}
          width={'80%'}
          color={
            selectedLanguage !== '' && selectedNativeLanguage !== ''
              ? BRIGHTBLUE
              : LIGHTGRAY
          }
          textColor={BLACK}
          borderColor={GRAY}
        />
      </View>
      <VerticalSpace height={40} />
    </View>
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
});
