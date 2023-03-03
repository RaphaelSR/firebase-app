import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Routes} from './src/router';

export default function App() {
  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  );
}
