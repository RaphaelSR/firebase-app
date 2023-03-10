import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Routes} from './src/router';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Routes />
      </PaperProvider>
    </Provider>
  );
}
