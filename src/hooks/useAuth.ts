import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { signInRequest, updateAvatarURL } from "../store/user/actions";
import { User as ReduxUser } from "../store/user/types";

interface AuthData {
  token: string | null;
  currentUser: ReduxUser | null;
  updateUserInfo: (displayName: string) => Promise<void>;
  uploadAvatar: (avatarUri: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getCurrentUser: (
    callback: (user: FirebaseAuthTypes.User | null) => void
  ) => () => void;
  logout: () => void;
}

export function useAuth(): AuthData {
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(
    null
  );
  const dispatch = useDispatch();

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setCurrentUser(user as FirebaseAuthTypes.User | null);
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
      password
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

  const updateUserInfo = async (displayName: string) => {
    if (currentUser) {
      await currentUser.updateProfile({ displayName });
      setCurrentUser({ ...currentUser, displayName });
    }
  };

  const uploadAvatar = async (avatarUri: string) => {
    if (currentUser && currentUser.uid) {
      dispatch(updateAvatarURL(currentUser.uid, avatarUri));
    }
  };

  const getCurrentUser = (
    callback: (user: FirebaseAuthTypes.User | null) => void
  ): (() => void) => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      callback(user);
    });
    return () => unsubscribe();
  };

  return {
    token,
    currentUser,
    login,
    signup,
    resetPassword,
    logout,
    getCurrentUser,
    updateUserInfo,
    uploadAvatar,
  };
}
