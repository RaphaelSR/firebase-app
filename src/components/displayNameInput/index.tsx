import React from "react";
import { TextInput, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { createStyles } from "./styles";

interface DisplayNameInputProps {
  displayName: string;
  setDisplayName: (value: string) => void;
  handleUpdateDisplayName: () => void;
  isTextInputFocused: boolean;
  setIsTextInputFocused: (value: boolean) => void;
}

export function DisplayNameInput({
  displayName,
  setDisplayName,
  handleUpdateDisplayName,
  isTextInputFocused,
  setIsTextInputFocused,
}: DisplayNameInputProps) {
  const styles = createStyles();
  const { colors } = useTheme();

  return (
    <>
      <Text style={styles.label}>Display Name</Text>
      <TextInput
        style={[
          styles.textInput,
          {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: isTextInputFocused
              ? colors.primary
              : colors.placeholder,
          },
        ]}
        value={displayName}
        placeholder="Type your first name"
        onChangeText={setDisplayName}
        onSubmitEditing={handleUpdateDisplayName}
        onFocus={() => setIsTextInputFocused(true)}
        onBlur={() => setIsTextInputFocused(false)}
      />
    </>
  );
}
