import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {signInRequest} from '../store/user/actions';
import {User} from '../store/user/types';

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
  const dispatch = useDispatch();

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
    dispatch(signInRequest(email, password));
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
    auth()
      .signOut()
      .then(() => {});
    setToken(null);
  };

  return {token, currentUser, login, signup, resetPassword, logout};
}
