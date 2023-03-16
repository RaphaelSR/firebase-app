import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import SafeAreaViewWrapper from "../../components/safeAreaViewWrapper";
import { useAuth } from "../../hooks/useAuth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { colors } = useTheme();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      if (!email || !password) {
        setError("Por favor, informe seu email e senha.");
      } else {
        await login(email, password);
      }
    } catch (e) {
      setError("Falha no login. Verifique suas credenciais e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };

  return (
    <SafeAreaViewWrapper>
      <View style={styles.content}>
        <Text variant="displayMedium" style={{ color: colors.primary }}>
          Login
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
            onPress={handleLogin}
            style={styles.button}
            disabled={loading}
            loading={loading}
          >
            Entrar
          </Button>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.signUpAndReset}>
            <Text style={styles.signUpText}>
              Ainda não tem uma conta?{" "}
              <Text
                style={styles.signUpLink}
                onPress={() => navigation.navigate("Signup")}
              >
                Cadastre-se aqui
              </Text>
            </Text>
            <Text
              style={styles.resetPassword}
              onPress={() => navigation.navigate("ResetPassword")}
            >
              Esqueceu sua senha?
            </Text>
          </View>
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
  signUpAndReset: {
    marginTop: 16,
    alignItems: "center",
  },
  signUpText: {
    color: "#888",
    textAlign: "center",
  },
  signUpLink: {
    color: "blue",
  },
  resetPassword: {
    color: "blue",
    marginTop: 8,
  },
});
