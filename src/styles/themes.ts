// themes.ts
import { DefaultTheme, MD3DarkTheme } from "react-native-paper";

const LightColors = {
  primary: "#039BE5",
  primaryVariant: "#3700B3",
  secondary: "#03DAC6",
  secondaryVariant: "#018786",
  background: "#F5F5F5",
  surface: "#FFFFFF",
  error: "#B00020",
  onPrimary: "#FFFFFF",
  onSecondary: "#000000",
  onBackground: "#000000",
  onSurface: "#000000",
  onError: "#FFFFFF",
  text: "#000000",
};

const DarkColors = {
  primary: "#BB86FC",
  primaryVariant: "#3700B3",
  secondary: "#03DAC6",
  secondaryVariant: "#018786",
  background: "#272727",
  surface: "#121212",
  error: "#CF6679",
  onPrimary: "#000000",
  onSecondary: "#000000",
  onBackground: "#FFFFFF",
  onSurface: "#FFFFFF",
  onError: "#000000",
  text: "#FFFFFF",
};

export const MaterialLightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...LightColors,
  },
};

export const MaterialDarkTheme = {
  ...MD3DarkTheme,
  roundness: 2,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkColors,
  },
};
