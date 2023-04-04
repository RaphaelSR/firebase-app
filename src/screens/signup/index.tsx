import React, { useState } from "react";
import { View } from "react-native";
import { createStyles } from "./styles";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import ArrowBack from "../../components/ArrowBack";
import SafeAreaViewWrapper from "../../components/SafeAreaViewWrapper";
import { useAuth } from "../../hooks/useAuth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(false);
  const [error, setError] = useState("");
  const styles = createStyles();
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const { colors } = useTheme();

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError("");
      if (!email || !password || !firstName) {
        throw new Error("Preencha todos os campos");
      }
      await signup(email, password, firstName);
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
            label="Primeiro nome"
            value={firstName}
            onChangeText={setFirstName}
            mode="outlined"
          />
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
