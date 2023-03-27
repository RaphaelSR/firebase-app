import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const createStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    modalOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: colors.background,
      borderRadius: 10,
      padding: 20,
      maxWidth: "80%",
      alignSelf: "center",
    },
    modalMessage: {
      fontSize: 16,
      marginBottom: 20,
      fontWeight: "bold",
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    modalButtonText: {
      fontSize: 16,
      color: colors.primary,
    },
  });
};
