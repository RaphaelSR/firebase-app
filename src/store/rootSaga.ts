import {all} from 'redux-saga/effects';
import todoSaga from './todo/sagas';

import userSaga from './user/sagas';

export default function* rootSaga() {
  yield all([userSaga(), todoSaga()]);
}
