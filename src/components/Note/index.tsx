import React from "react";
import { TouchableOpacity, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import AnimatedNoteText from "../AnimatedNoteText";

import { createStyles } from "./styles";

interface NoteProps {
  id: string;
  title: string;
  completed: boolean;
  onToggleStatus: (id: string, title: string, completed: boolean) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

function areEqual(prevProps: NoteProps, nextProps: NoteProps) {
  return (
    prevProps.title === nextProps.title &&
    prevProps.completed === nextProps.completed
  );
}

function Note({
  id,
  title,
  completed,
  onToggleStatus,
  onEdit,
  onDelete,
}: NoteProps) {
  const styles = createStyles();
  const { colors } = useTheme();

  return (
    <View style={styles.noteCard}>
      <AnimatedNoteText
        title={title}
        completed={completed}
        onPress={() => onToggleStatus(id, title, completed)}
      />
      <View style={styles.actionButtons}>
        <IconButton
          icon="pencil"
          color={colors.text}
          size={20}
          onPress={() => onEdit(id, title)}
        />
        <IconButton
          icon="delete"
          color={colors.error}
          size={20}
          onPress={() => onDelete(id)}
        />
      </View>
    </View>
  );
}

export default React.memo(Note, areEqual);
