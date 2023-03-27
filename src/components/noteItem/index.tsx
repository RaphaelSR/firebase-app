import React from "react";
import { TouchableOpacity, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import AnimatedNote from "../animatedNote";

import { createStyles } from "./styles";

interface NoteItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggleStatus: (id: string, title: string, completed: boolean) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

function NoteItem({
  id,
  title,
  completed,
  onToggleStatus,
  onEdit,
  onDelete,
}: NoteItemProps) {
  const styles = createStyles();
  const { colors } = useTheme();

  return (
    <View style={styles.noteCard}>
      <TouchableOpacity
        onPress={() => onToggleStatus(id, title, completed)}
        style={styles.noteContainer}
      >
        <AnimatedNote
          title={title}
          completed={completed}
          id={id}
          onPress={() => onToggleStatus(id, title, completed)}
        />
      </TouchableOpacity>
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

export default NoteItem;
