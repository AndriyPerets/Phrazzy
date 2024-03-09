import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import BottomStack, {BottomStackParamList} from './BottomStack';
import {createStackNavigator} from '@react-navigation/stack';
import HelloScreen from '../screens/HelloScreen';

export type RootStackParamList = {
  Main: NavigatorScreenParams<BottomStackParamList>;
  HelloScreen: undefined;
  TopicScreen: undefined;
  PhraseScreen: undefined;
  SpeakScreen: undefined;
  LanguageScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="HelloScreen"
        component={HelloScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Main"
        component={BottomStack}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
