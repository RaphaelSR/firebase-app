import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "./src/router";
import { ThemeProvider } from "./src/contexts/themeContext";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
