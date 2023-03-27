import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const createStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      paddingHorizontal: 16,
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 16,
      marginBottom: 24,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary
    },
    avatar: {},
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    textInput: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 8,
    },
    addButton: {
      backgroundColor: colors.primary,
      marginLeft: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 4,
    },
    addButtonText: {
      color: colors.surface,
      fontWeight: "bold",
    },
    noteList: {
      marginTop: 16,
    },
    noteCard: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      padding: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    noteContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    noteListContent: {
      paddingBottom: 16,
    },
    note: {
      fontSize: 16,
      marginBottom: 4,
    },
    actionButtons: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 8,
    },
  });
};
