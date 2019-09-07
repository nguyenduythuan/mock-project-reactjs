import { put, takeEvery } from 'redux-saga/effects';

import { GET_DATA } from './constants';
import { getDataSuccess, getDataFailed } from './actions';
import callApi from '../../utils/apiCaller';

export function* getDataInfo() {
  try {
    const classes = yield callApi('class', 'get', null).then(res => [
      ...res.data,
    ]);
    const students = yield callApi('students', 'get', null).then(res => [
      ...res.data,
    ]);
    const teachers = yield callApi('teacher', 'get', null).then(res => [
      ...res.data,
    ]);

    const data = {
      dataClass: classes,
      dataStudent: students,
      dataTeacher: teachers,
    };
    yield put(getDataSuccess(data));
  } catch (error) {
    yield put(getDataFailed(error));
  }
  return null;
}

export default function* sagaWatcher() {
  yield takeEvery(GET_DATA, getDataInfo);
}
