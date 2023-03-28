import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import { createStyles } from "./styles";
import ArrowBack from "../../components/ArrowBack";
import SafeAreaViewWrapper from "../../components/SafeAreaViewWrapper";
import { useAuth } from "../../hooks/useAuth";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const styles = createStyles();
  const { resetPassword } = useAuth();
  const { colors } = useTheme();

  const handleResetPassword = () => {
    if (!email) {
      setIsEmailValid(false);
      return;
    }
    setIsEmailValid(true);
    resetPassword(email);
  };

  return (
    <SafeAreaViewWrapper>
      <ArrowBack />
      <View style={styles.content}>
        <Text variant="displayMedium" style={{ color: colors.primary }}>
          Reset Password
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={setEmail}
            error={!isEmailValid}
            mode="outlined"
          />
          {!isEmailValid && (
            <Text style={styles.errorText}>
              Por favor, coloque um email válido
            </Text>
          )}
          <Button
            mode="contained"
            onPress={handleResetPassword}
            style={styles.button}
          >
            Reset Password
          </Button>
        </View>
      </View>
    </SafeAreaViewWrapper>
  );
}

const styles = StyleSheet.create({});
