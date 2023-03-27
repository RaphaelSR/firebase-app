import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const createStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    content: {
      flex: 1,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      marginTop: 8,
    },
    form: {
      width: "100%",
      marginTop: 16,
    },
    button: {
      marginTop: 16,
    },
    errorText: {
      color: "red",
      marginTop: 8,
      textAlign: "center",
    },
    signUpAndReset: {
      marginTop: 16,
      alignItems: "center",
    },
    signUpText: {
      color: "#888",
      textAlign: "center",
    },
    signUpLink: {
      color: "blue",
    },
    resetPassword: {
      color: "blue",
      marginTop: 8,
    },
  });
};
