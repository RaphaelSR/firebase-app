import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";

import { Home } from "../screens/home";
import { Profile } from "../screens/profile";

const AppStack = createNativeStackNavigator();

export function AppRoutes() {
  const { colors } = useTheme();

  return (
    <AppStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Profile" component={Profile} />
    </AppStack.Navigator>
  );
}
