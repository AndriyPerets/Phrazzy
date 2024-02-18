import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BLACK, MEDIUMGRAY, WHITE} from '../colors.ts';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import FeedActiveIcon from '../components/svg/menu-feed-active.tsx';
import FeedIcon from '../components/svg/menu-feed.tsx';
import ChallengeActiveIcon from '../components/svg/menu-challenges-active.tsx';
import ChallengeIcon from '../components/svg/menu-challenges.tsx';
import ProfileActiveIcon from '../components/svg/menu-profile-active.tsx';
import ProfileIcon from '../components/svg/menu-profile.tsx';
import MessagesIcon from '../components/svg/menu-messages.tsx';
import MessagesActiveIcon from '../components/svg/menu-messages-active.tsx';
import LanguageScreen from '../screens/LanguageScreen.tsx';
import TopicScreen from '../screens/TopicScreen.tsx';
import PhraseScreen from '../screens/PhraseScreen.tsx';
import SpeakScreen from '../screens/SpeakScreen.tsx';

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
        <FeedActiveIcon width={24} height={24} color={WHITE} />
      ) : (
        <FeedIcon width={24} height={24} color={MEDIUMGRAY} />
      );
      break;
    case 'TopicScreen':
      iconName = focused ? (
        <ChallengeActiveIcon width={24} height={24} color={WHITE} />
      ) : (
        <ChallengeIcon width={24} height={24} color={MEDIUMGRAY} />
      );
      break;
    case 'PhraseScreen':
      iconName = focused ? (
        <ProfileActiveIcon width={24} height={24} color={WHITE} />
      ) : (
        <ProfileIcon width={24} height={24} color={MEDIUMGRAY} />
      );
      break;
    case 'SpeakScreen':
      iconName = focused ? (
        <MessagesActiveIcon width={24} height={24} color={WHITE} />
      ) : (
        <MessagesIcon width={24} height={24} color={MEDIUMGRAY} />
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
