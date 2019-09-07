import { put, takeLatest, delay } from 'redux-saga/effects';

import * as type from './constants';
import callApi from '../../utils/apiCaller';
import { loginSuccess, loginFailure } from './actions';
import { showLoading, hideLoading } from '../GlobalLoading/actions';

function* login(state) {
  yield put(showLoading());
  const data = yield callApi('accountLogin', 'get', null).then(res => [
    ...res.data,
  ]);
  yield delay(1000);
  yield put(hideLoading());
  const user = data.filter(value => value.email === state.email);
  if (user.length > 0) {
    if (user[0].password === state.password) {
      switch (user[0].level) {
        case 0:
          {
            const staffs = yield callApi('staff', 'get', null).then(res => [
              ...res.data,
            ]);
            const users = staffs.filter(value =>
              value.email === user[0].email ? value : null,
            );
            const userInfo = { ...users[0], level: user[0].level };
            yield put(loginSuccess(userInfo));
          }
          break;
        case 1:
          {
            const teacher = yield callApi('teacher', 'get', null).then(res => [
              ...res.data,
            ]);
            const users = teacher.filter(value =>
              value.email === user[0].email ? value : null,
            );
            const userInfo = { ...users[0], level: user[0].level };
            yield put(loginSuccess(userInfo));
          }
          break;
        case 2:
          {
            const students = yield callApi('students', 'get', null).then(
              res => [...res.data],
            );
            const users = students.filter(value =>
              value.email === user[0].email ? value : null,
            );
            const userInfo = { ...users[0], level: user[0].level };
            yield put(loginSuccess(userInfo));
          }
          break;
        default:
          break;
      }
    } else {
      yield put(loginFailure('Password không đúng'));
    }
  } else {
    yield put(loginFailure('Email không tồn tại'));
  }
}

export default function* sagaWatcher() {
  yield takeLatest(type.LOGIN_REQUEST, login);
}
