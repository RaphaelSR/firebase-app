import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '../pages/home';

const AppStack = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
  );
}
