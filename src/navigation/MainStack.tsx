import React from 'react';
import HelloScreen from '../screens/HelloScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {LanguageType} from '../asyncStorageApi/language';
import SelectLanguage from '../screens/selectLanguage';
import UserTargetLanguages from '../screens/userTargetLanguages';
import {LanguageProvider} from '../hook/useLanguage';
import {TopicProvider} from '../hook/useSaveTopics';
import leftChevron from '../../public/assets/images/leftChevron.png';
import {Image, StyleSheet} from 'react-native';
import SelectTopic from '../screens/selectTopic';
import SelectPhrases from '../screens/selectPhrases';
import SpeakPhrases from '../screens/speakPhrases';
import {PhrasesProvider} from '../hook/useSavePhrases';

export type MainStackParamList = {
  HelloScreen: undefined;
  UserTargetLanguages: undefined;
  SelectLanguage: {
    languageType: LanguageType;
  };
  SelectTopic: undefined;
  SelectPhrases: undefined;
  SpeakPhrases: undefined;
};

const BackButton = () => (
  <Image source={leftChevron} style={styles.backButton} />
);

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <LanguageProvider>
      <TopicProvider>
        <PhrasesProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="HelloScreen"
              component={HelloScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserTargetLanguages"
              component={UserTargetLanguages}
              options={{
                title: 'Select languages',
                headerTitleStyle: {
                  textTransform: 'uppercase',
                },
              }}
            />
            <Stack.Screen
              name="SelectLanguage"
              component={SelectLanguage}
              options={({route}) => ({
                title: `Select ${route.params.languageType}`,
                headerTitleStyle: {
                  textTransform: 'uppercase',
                },
                headerLeftLabelVisible: false,
                headerBackImage: BackButton,
              })}
            />
            <Stack.Screen
              name="SelectTopic"
              component={SelectTopic}
              options={{
                title: 'Select Topic',
                headerTitleStyle: {
                  textTransform: 'uppercase',
                },
                headerLeftLabelVisible: false,
                headerBackImage: BackButton,
              }}
            />
            <Stack.Screen
              name="SelectPhrases"
              component={SelectPhrases}
              options={{
                title: 'Select Phrase',
                headerTitleStyle: {
                  textTransform: 'uppercase',
                },
                headerLeftLabelVisible: false,
                headerBackImage: BackButton,
              }}
            />
            <Stack.Screen
              name="SpeakPhrases"
              component={SpeakPhrases}
              options={{
                title: 'Speak',
                headerTitleStyle: {
                  textTransform: 'uppercase',
                },
                headerLeftLabelVisible: false,
                headerBackImage: BackButton,
              }}
            />
          </Stack.Navigator>
        </PhrasesProvider>
      </TopicProvider>
    </LanguageProvider>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  backButton: {
    height: 24,
    width: 24,
    marginLeft: 16,
  },
});
