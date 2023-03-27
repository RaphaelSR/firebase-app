import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const createStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    content: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 16,
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
      fontSize: 12,
      marginTop: 4,
    },
  });
};
