import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import TheText from '../components/base/TheText';
import {BLACK, BRIGHTBLUE, LIGHTGRAY, WHITE} from '../colors';
import {BlackItalic, Bold, Regular} from '../fonts';
import VerticalSpace from '../components/base/VerticalSpace';
import CommonButton from '../components/base/CommonButton';
import GermanyIcon from '../components/svg/germany';
import UKIcon from '../components/svg/uk';
import UkraineIcon from '../components/svg/ukrane';
import SpainIcon from '../components/svg/spain';

const LanguageScreen = () => {
  const [isMenuForNativeLanguageOpen, setIsMenuForNativeLanguageOpen] =
    useState(false);
  const [isMenuForLanguageToLearnOpen, setIsMenuForLanguageToLearnOpen] =
    useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedNativeLanguage, setSelectedNativeLanguage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

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
        title={selectedNativeLanguage || 'Select a language'}
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
        title={selectedLanguage || 'Select a language'}
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
          borderRadius={25}
        />
      </View>
      <VerticalSpace height={20} />
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
