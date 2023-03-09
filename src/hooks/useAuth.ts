import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface User extends FirebaseAuthTypes.User {
  email: string;
}

interface AuthData {
  token: string | null;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => void;
}

export function useAuth(): AuthData {
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    console.log('onAuthStateChanged - User:', user);
    setCurrentUser(user as User | null);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    console.log('useEffect - Iniciando...');
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const login = async (email: string, password: string) => {
    console.log('login - email:', email, 'password:', password);
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    console.log('login - UserCredential:', userCredential);
    setToken(userCredential.user.uid);
  };

  const signup = async (email: string, password: string) => {
    console.log('signup - email:', email, 'password:', password);
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    console.log('signup - UserCredential:', userCredential);
    setToken(userCredential.user.uid);
  };

  const resetPassword = async (email: string) => {
    console.log('resetPassword - email:', email);
    await auth().sendPasswordResetEmail(email);
    console.log('resetPassword - Email enviado para:', email);
  };

  const logout = () => {
    console.log('logout');
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    setToken(null);
  };

  return {token, currentUser, login, signup, resetPassword, logout};
}
