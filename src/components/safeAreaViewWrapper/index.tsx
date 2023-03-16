import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SafeAreaViewWrapperProps = {
  children: React.ReactNode;
  style?: Object;
};

const SafeAreaViewWrapper = ({ children, style }: SafeAreaViewWrapperProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const dynamicStyles = {
    container: {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
  };

  return (
    <View
      style={[
        styles.container,
        dynamicStyles.container,
        style,
        { backgroundColor: colors.background },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeAreaViewWrapper;
