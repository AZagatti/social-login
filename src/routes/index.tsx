import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import Auth from '../screens/Auth';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default Routes;
