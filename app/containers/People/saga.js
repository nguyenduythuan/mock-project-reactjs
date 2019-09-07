import { takeLatest, put } from 'redux-saga/effects';
import { GET_DATA } from './constants';
import callApi from '../../utils/apiCaller';
import { getDataSuccess, getDataFail } from './actions';

export function* getDataForm() {
  try {
    const teachers = yield callApi('teacher', 'get', null).then(res => [
      ...res.data,
    ]);
    const students = yield callApi('students', 'get', null).then(res => [
      ...res.data,
    ]);
    const staffs = yield callApi('staff', 'get', null).then(res => [
      ...res.data,
    ]);
    const allData = {
      teachers,
      students,
      staffs,
    };
    yield put(getDataSuccess(allData));
  } catch (error) {
    yield put(getDataFail(error));
  }
}

export default function* sagaWatcher() {
  yield takeLatest(GET_DATA, getDataForm);
}
