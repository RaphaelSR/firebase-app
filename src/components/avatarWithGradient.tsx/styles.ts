import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const createStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    modalView: {
      backgroundColor: colors.background,
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
      color: colors.text,
    },
    imageView: {
      alignItems: "center",
      justifyContent: "center",
    },
    avatarImage: {
      width: "100%",
      height: "80%",
      resizeMode: "contain",
    },
    closeButton: {
      marginTop: 16,
    },
  });
};
