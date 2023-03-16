import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";

import Login from "../screens/login";
import SignUp from "../screens/signup";
import ResetPassword from "../screens/resetPassword";

const AuthStack = createNativeStackNavigator();

export function AuthRoutes() {
  const { colors } = useTheme();
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
      <AuthStack.Screen name="Signup" component={SignUp} />
    </AuthStack.Navigator>
  );
}
