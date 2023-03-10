import produce from 'immer';
import {UserActionTypes, UserState} from './types';

const INITIAL_STATE: UserState = {
  user: null,
  error: false,
  loading: false,
};

export default function user(
  state = INITIAL_STATE,
  action: {type: UserActionTypes; payload: any},
): UserState {
  return produce(state, draft => {
    switch (action.type) {
      case UserActionTypes.SIGN_IN_REQUEST:
        draft.loading = true;
        break;
      case UserActionTypes.SIGN_IN_SUCCESS:
        draft.user = action.payload.user;
        draft.error = false;
        draft.loading = false;
        break;
      case UserActionTypes.SIGN_IN_FAILURE:
        draft.user = null;
        draft.error = true;
        draft.loading = false;
        break;
      case UserActionTypes.SIGN_OUT_REQUEST:
        draft.loading = true;
        break;
      case UserActionTypes.SIGN_OUT_SUCCESS:
        draft.user = null;
        draft.error = false;
        draft.loading = false;
        break;
      default:
        break;
    }
  });
}
