import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Routes from './src/routes';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />

      <Routes />
    </NavigationContainer>
  );
};

export default App;
