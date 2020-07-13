import {all, takeLatest, call, put} from 'redux-saga/effects';
import api from '../../../services/api';
import {getSuccess, getFailure} from './list';

export function* getCards() {
  try {
    const response = yield call(api.get, 'card');
    if (response.data && response.data.length > 0) {
      yield put(getSuccess(response.data));
    } else {
      yield put(getFailure());
    }
  } catch (e) {
    yield put(getFailure());
  }
}

export default all([takeLatest('@creditcard/GET_REQUEST', getCards)]);
