import {call, put, takeLatest} from 'redux-saga/effects';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {UserActionTypes} from './types';
import {signInSuccess, signInFailure, signOutSuccess} from './actions';

function* signIn({payload: {email, password}}: any) {
  try {
    const result: FirebaseAuthTypes.UserCredential = yield call(
      [auth(), auth().signInWithEmailAndPassword],
      email,
      password,
    );

    const {uid, email: userEmail, displayName, photoURL} = result.user;
    const user = {uid, email: userEmail, displayName, photoURL};
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure());
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
}
