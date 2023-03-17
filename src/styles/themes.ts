// themes.ts
import { DefaultTheme, MD3DarkTheme } from "react-native-paper";

export const TwitterLightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1DA1F2",
    accent: "#F1C40F",
    background: "#FFFFFF",
    surface: "#F5F8FA",
    text: "#14171A",
  },
};

export const TwitterDarkTheme = {
  ...MD3DarkTheme,
  roundness: 2,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#1DA1F2",
    accent: "#F1C40F",
    background: "#15202B",
    surface: "#172D3F",
    text: "#FFFFFF",
  },
};
