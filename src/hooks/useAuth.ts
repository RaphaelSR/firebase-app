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
    setCurrentUser(user as User | null);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    setToken(userCredential.user.uid);
  };

  const signup = async (email: string, password: string) => {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    setToken(userCredential.user.uid);
  };

  const resetPassword = async (email: string) => {
    await auth().sendPasswordResetEmail(email);
  };

  const logout = () => {
    ('logout');
    auth()
      .signOut()
      .then(() => {});
    setToken(null);
  };

  return {token, currentUser, login, signup, resetPassword, logout};
}
