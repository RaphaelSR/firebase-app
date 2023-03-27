import { call, put, takeLatest } from "redux-saga/effects";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import { UpdateAvatarAction, UserActionTypes } from "./types";
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  updateAvatarURL,
} from "./actions";
import { SagaIterator } from "redux-saga";

function* signIn({ payload: { email, password } }: any) {
  try {
    const result: FirebaseAuthTypes.UserCredential = yield call(
      [auth(), auth().signInWithEmailAndPassword],
      email,
      password
    );

    const { uid, email: userEmail, displayName, photoURL } = result.user;
    const user = { uid, email: userEmail, displayName, photoURL };
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure());
  }
}

function* updateAvatar({
  payload: { uid, avatarUri },
}: UpdateAvatarAction): SagaIterator {
  try {
    const storageRef = storage().ref(`avatars/${uid}`);
    yield call([storageRef, storageRef.putFile], avatarUri);
    const avatarURL = yield call([storageRef, storageRef.getDownloadURL]);
    yield put(updateAvatarURL(uid, avatarURL));
  } catch (error) {
    console.log(error);
  }
}

function* signOut() {
  try {
    yield call([auth(), auth().signOut]);
    yield put(signOutSuccess());
  } catch (error) {
    console.log(error);
  }
}

export default function* userSaga() {
  yield takeLatest(UserActionTypes.SIGN_IN_REQUEST, signIn);
  yield takeLatest(UserActionTypes.SIGN_OUT_REQUEST, signOut);
  yield takeLatest(UserActionTypes.UPDATE_AVATAR_URL, updateAvatar);
}
