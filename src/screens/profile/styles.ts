import { he } from "date-fns/locale";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const createStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: 16,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 16,
    },
    avatarPreview: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    avatar: {
      marginTop: 8,
      marginBottom: 8,
    },
    infoContainer: {
      marginTop: 32,
    },
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
    darkModeContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    button: {
      marginTop: 16,
      borderWidth: 1,
      borderColor: colors.text,
    },
  });
};
