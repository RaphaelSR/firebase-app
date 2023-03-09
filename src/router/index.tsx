import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppRoutes} from './app.routes';
import {AuthRoutes} from './auth.routes';
import {useAuth} from '../hooks/useAuth';

export function Routes() {
  const {currentUser} = useAuth();

  return (
    <NavigationContainer>
      {currentUser ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
