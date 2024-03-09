import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BLACK, BRIGHTBLUE, WHITE} from '../colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import LanguageScreen from '../screens/LanguageScreen';
import TopicScreen from '../screens/TopicScreen';
import PhraseScreen from '../screens/PhraseScreen';
import SpeakScreen from '../screens/SpeakScreen';
import GlobeIcon from '../components/svg/menu-globe';
import TopicIcon from '../components/svg/menu-topic';
import PhraseIcon from '../components/svg/menu-phrase';
import PracticeIcon from '../components/svg/menu-practice';

export type BottomStackParamList = {
  LanguageScreen: undefined;
  TopicScreen: undefined;
  PhraseScreen: undefined;
  SpeakScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomStackParamList>();

type TabBarIconProps = {
  route: RouteProp<BottomStackParamList, keyof BottomStackParamList>;
  focused: boolean;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({route, focused}) => {
  let iconName;
  switch (route.name) {
    case 'LanguageScreen':
      iconName = focused ? (
        <GlobeIcon color={BRIGHTBLUE} />
      ) : (
        <GlobeIcon color={WHITE} />
      );
      break;
    case 'TopicScreen':
      iconName = focused ? (
        <TopicIcon color={BRIGHTBLUE} />
      ) : (
        <TopicIcon color={WHITE} />
      );
      break;
    case 'PhraseScreen':
      iconName = focused ? (
        <PhraseIcon color={BRIGHTBLUE} />
      ) : (
        <PhraseIcon color={WHITE} />
      );
      break;
    case 'SpeakScreen':
      iconName = focused ? (
        <PracticeIcon color={BRIGHTBLUE} />
      ) : (
        <PracticeIcon color={WHITE} />
      );
      break;
    default:
      iconName = null;
  }
  return <View style={styles.iconContainer}>{iconName}</View>;
};

const renderTabBarIcon = (
  route: TabBarIconProps['route'],
  focused: boolean,
) => <TabBarIcon route={route} focused={focused} />;

const BottomStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: BLACK,
          borderTopWidth: 0,
          shadowColor: 'transparent',
        },
        tabBarIcon: ({focused}) => renderTabBarIcon(route, focused),
        tabBarLabel: '',
      })}>
      <Tab.Screen
        name="LanguageScreen"
        component={LanguageScreen}
        options={{
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="TopicScreen"
        component={TopicScreen}
        options={{
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PhraseScreen"
        component={PhraseScreen}
        options={{
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SpeakScreen"
        component={SpeakScreen}
        options={{
          tabBarLabel: '',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default BottomStack;
