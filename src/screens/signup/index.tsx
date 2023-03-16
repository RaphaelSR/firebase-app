import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import ArrowBack from "../../components/arrowBack";
import SafeAreaViewWrapper from "../../components/safeAreaViewWrapper";
import { useAuth } from "../../hooks/useAuth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const { colors } = useTheme();

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError("");
      if (!email || !password) {
        throw new Error("Preencha todos os campos");
      }
      await signup(email, password);
    } catch (e) {
      setError(
        "Falha ao cadastrar. Verifique suas credenciais e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };

  return (
    <SafeAreaViewWrapper>
      <ArrowBack />
      <View style={styles.content}>
        <Text variant="displayMedium" style={{ color: colors.primary }}>
          Signup
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isPasswordSecure}
            right={
              <TextInput.Icon
                onPress={togglePasswordVisibility}
                icon={isPasswordSecure ? "eye-off" : "eye"}
              />
            }
            mode="outlined"
          />
          <Button
            mode="contained"
            onPress={handleSignUp}
            style={styles.button}
            disabled={loading}
            loading={loading}
          >
            Cadastrar
          </Button>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </View>
    </SafeAreaViewWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
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
    marginTop: 8,
    textAlign: "center",
  },
});
