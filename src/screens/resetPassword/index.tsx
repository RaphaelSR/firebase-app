import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import ArrowBack from "../../components/arrowBack";
import SafeAreaViewWrapper from "../../components/safeAreaViewWrapper";
import { useAuth } from "../../hooks/useAuth";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  input: {
    marginTop: 8,
  },
  form: {
    width: "100%",
    marginTop: 16,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
