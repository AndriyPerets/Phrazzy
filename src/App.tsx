import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomStack from './navigation/BottomStack';

const App = () => {
  return (
    <NavigationContainer>
      <BottomStack />
    </NavigationContainer>
  );
};

export default App;
