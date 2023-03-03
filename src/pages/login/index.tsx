import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button, TextInput, useTheme} from 'react-native-paper';
import {useAuth} from '../../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(false);

  const {login} = useAuth();
  const {colors} = useTheme();

  const handleLogin = () => {
    // Implementar a lógica de login aqui
    console.log('Email: ', email);
    console.log('Senha: ', password);
    // login(email, password);
    // Implementar um logica para setar um token mockado e enviar para o app.tsx e validar o login
  };

  const togglePasswordVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="displayLarge" style={{color: colors.primary}}>
          Login
        </Text>
      </View>
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
              icon={isPasswordSecure ? 'eye-off' : 'eye'}
            />
          }
          mode="outlined"
        />
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Entrar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 8,
  },
  form: {
    marginTop: 16,
  },
  button: {
    marginTop: 16,
  },
});
