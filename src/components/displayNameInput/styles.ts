import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const createStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
      color: colors.text,
    },
    textInput: {
      height: 40,
      borderColor: colors.text,
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 8,
      marginBottom: 16,
      color: colors.text,
      backgroundColor: colors.inverseOnSurface,
      opacity: 0.6,
    },
  });
};
