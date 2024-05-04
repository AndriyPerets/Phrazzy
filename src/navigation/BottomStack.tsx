import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LanguageScreen from '../screens/LanguageScreen';
import TopicScreen from '../screens/TopicScreen';
import PhraseScreen from '../screens/PhraseScreen';
import SpeakScreen from '../screens/SpeakScreen';
import HelloScreen from '../screens/HelloScreen';

export type BottomStackParamList = {
  HelloScreen: undefined;
  LanguageScreen: undefined;
  TopicScreen: undefined;
  PhraseScreen: {topic: string; phrases: string[]};
  SpeakScreen: {selectedPhrases: string[]};
};

const Tab = createBottomTabNavigator<BottomStackParamList>();

const BottomStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {display: 'none'},
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="HelloScreen"
        component={HelloScreen}
        options={{headerShown: false}}
      />
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

export default BottomStack;

// const styles = StyleSheet.create({
//   iconContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
// });

// type TabBarIconProps = {
//   route: RouteProp<BottomStackParamList, keyof BottomStackParamList>;
//   focused: boolean;
// };

// const TabBarIcon: React.FC<TabBarIconProps> = ({route, focused}) => {
//   let iconName;
//   switch (route.name) {
//     case 'LanguageScreen':
//       iconName = focused ? (
//         <GlobeIcon color={BRIGHTBLUE} />
//       ) : (
//         <GlobeIcon color={WHITE} />
//       );
//       break;
//     case 'TopicScreen':
//       iconName = focused ? (
//         <TopicIcon color={BRIGHTBLUE} />
//       ) : (
//         <TopicIcon color={WHITE} />
//       );
//       break;
//     case 'PhraseScreen':
//       iconName = focused ? (
//         <PhraseIcon color={BRIGHTBLUE} />
//       ) : (
//         <PhraseIcon color={WHITE} />
//       );
//       break;
//     case 'SpeakScreen':
//       iconName = focused ? (
//         <PracticeIcon color={BRIGHTBLUE} />
//       ) : (
//         <PracticeIcon color={WHITE} />
//       );
//       break;
//     default:
//       iconName = null;
//   }
//   return <View style={styles.iconContainer}>{iconName}</View>;
// };

// const renderTabBarIcon = (
//   route: TabBarIconProps['route'],
//   focused: boolean,
// ) => <TabBarIcon route={route} focused={focused} />;

// screenOptions={({route}) => ({
//   tabBarStyle: {
//     backgroundColor: BLACK,
//     borderTopWidth: 0,
//     shadowColor: 'transparent',
//   },
//   tabBarIcon: ({focused}) => renderTabBarIcon(route, focused),
//   tabBarLabel: '',
// })}>
