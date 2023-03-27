import {User, UserActionTypes} from './types';

export const signInRequest = (email: string, password: string) => ({
  type: UserActionTypes.SIGN_IN_REQUEST,
  payload: {email, password},
});

export const signInSuccess = (user: User) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: {user},
});

export const signInFailure = () => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
});

export const signOutRequest = () => ({
  type: UserActionTypes.SIGN_OUT_REQUEST,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const updateAvatarURL = (uid: string, avatarURL: string) => ({
  type: UserActionTypes.UPDATE_AVATAR_URL,
  payload: { uid, avatarURL },
});