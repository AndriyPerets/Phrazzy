import React from 'react';
import TopicScreen from '../screens/TopicScreen';
import PhraseScreen from '../screens/PhraseScreen';
import SpeakScreen from '../screens/SpeakScreen';
import HelloScreen from '../screens/HelloScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {LanguageType} from '../asyncStorageApi/language';
import SelectLanguage from '../screens/selectLanguage';
import UserTargetLanguages from '../screens/userTargetLanguages';
import {LanguageProvider} from '../hook/useLanguage';
import rightChevron from '../../public/assets/images/rightChevron.png';
import {Image} from 'react-native';

export type MainStackParamList = {
  HelloScreen: undefined;
  UserTargetLanguages: undefined;
  SelectLanguage: {
    languageType: LanguageType;
  };
  TopicScreen: undefined;
  PhraseScreen: {topic: string; phrases: string[]};
  SpeakScreen: {selectedPhrases: string[]};
};

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <LanguageProvider>
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
            headerBackImage: () => (
              <Image style={{borderWidth: 1}} source={rightChevron} />
            ),
            headerLeftContainerStyle: {
              borderWidth: 1,
            },
          })}
        />
        <Stack.Screen
          name="TopicScreen"
          component={TopicScreen}
          options={{
            title: 'Topic Screen',
          }}
        />
        <Stack.Screen
          name="PhraseScreen"
          component={PhraseScreen}
          options={{
            title: 'Phrase Screen',
          }}
        />
        <Stack.Screen
          name="SpeakScreen"
          component={SpeakScreen}
          options={{
            title: 'Speak Screen',
          }}
        />
      </Stack.Navigator>
    </LanguageProvider>
  );
};

export default MainStack;
