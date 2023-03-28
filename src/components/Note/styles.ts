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
