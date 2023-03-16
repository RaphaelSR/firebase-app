import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '../screens/home';
import { Profile } from '../screens/profile';

const AppStack = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Profile" component={Profile} />
    </AppStack.Navigator>
  );
}
