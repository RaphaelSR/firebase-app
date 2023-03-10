// Actions Types
export enum UserActionTypes {
  SIGN_IN_REQUEST = '@user/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS = '@user/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = '@user/SIGN_IN_FAILURE',
  SIGN_OUT_REQUEST = '@user/SIGN_OUT_REQUEST',
  SIGN_OUT_SUCCESS = '@user/SIGN_OUT_SUCCESS',
}

// Data Types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// State Type
export interface UserState {
  readonly user: User | null;
  readonly error: boolean;
  readonly loading: boolean;
}
