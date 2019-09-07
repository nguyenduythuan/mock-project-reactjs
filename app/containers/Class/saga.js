import { put, takeLatest, delay } from 'redux-saga/effects';

import { FETCH_CLASS } from './constants';
import { fetchClassSuccess } from './actions';
import callApi from '../../utils/apiCaller';

// const dayGlobal = {
//   dayI: [], // cac thu trong tuan cua tat ca cac lop
//   dayII: [], // cac thu trong tuan cua cac lop khi search
//   data: [], // data khi chua search
//   dataS: [], // dat ta khi search
// };

export function* getDataUser() {
  try {
    const classes = yield callApi('class', 'get', null).then(res => [
      ...res.data,
    ]); // goi Api
    const students = yield callApi('students', 'get', null).then(res => [
      ...res.data,
    ]);
    const data = { dataClass: classes, dataStudent: students };
    yield delay(1000);
    yield put(fetchClassSuccess(data));
    // const token = JSON.parse(localStorage.getItem('token')); // lay token
    // const data = [];
    // const user = [];
    // const weekday = [];
    // // kiem tra token
    // if (token) {
    //   switch (token.level) {
    //     case 0: // quyen admin
    //       classes.forEach(element =>
    //         element.classWeekday.weekdayHours.filter(item =>
    //           item.weekday !== '' ? weekday.push(item.weekday) : null,
    //         ),
    //       ); // lay cac thu cua cac lop
    //       dayGlobal.data = [...classes];
    //       yield put(fetchClassSuccess(classes, weekday));
    //       break;
    //     case 1: // quyen giao vien
    //       classes.forEach(element => {
    //         element.teacherId.filter(id =>
    //           id === token.id ? data.push(element) : null,
    //         );
    //       }); // lay cac lop giao vien do dang day
    //       data.forEach(element =>
    //         element.classWeekday.weekdayHours.filter(item =>
    //           item.weekday !== '' ? weekday.push(item.weekday) : null,
    //         ),
    //       );
    //       dayGlobal.data = [...data];
    //       yield put(fetchClassSuccess(data, weekday));
    //       break;
    //     case 2: // quyen hoc sinh
    //       students.filter(item =>
    //         item.email === token.mail ? user.push(item) : null,
    //       ); // lay user
    //       classes.forEach(item => {
    //         user[0].classId.filter(id =>
    //           item.id === id ? data.push(item) : null,
    //         ); // lay cac lop user dang theo hoc
    //       });
    //       data.forEach(element =>
    //         element.classWeekday.weekdayHours.filter(item =>
    //           item.weekday !== '' ? weekday.push(item.weekday) : null,
    //         ),
    //       ); // lay cac thu trong lop duoc tra ve
    //       dayGlobal.data = [...data];
    //       yield put(fetchClassSuccess(data, weekday));
    //       break;
    //     default:
    //       break;
    //   }
    // }
    // dayGlobal.dayI = [...weekday];
  } catch (error) {
    return error;
  }
  return null;
}

// function* getsearch(payload) {
//   const { keyWord } = payload;
//   const weekday = [];
//   // kiem tra keyword
//   if (keyWord) {
//     yield delay(500);
//     const classes = dayGlobal.data.filter(cl =>
//       cl.name
//         .trim()
//         .toLowerCase()
//         .includes(keyWord.trim().toLowerCase()),
//     ); // loc tra ve ket qua theo keyword
//     classes.forEach(element =>
//       element.classWeekday.weekdayHours.filter(item =>
//         item.weekday !== '' ? weekday.push(item.weekday) : null,
//       ),
//     ); // lay cac thu tu du lieu tra ve
//     dayGlobal.dataS = [...classes];
//     yield put(getSearchSuccess(classes, weekday));
//   }
//   // truong hop keyword rong
//   if (!keyWord) {
//     yield put(getSearchSuccess(dayGlobal.data, weekday));
//   }
//   dayGlobal.dayII = [...weekday];
// }

// function* getWeekDay(params) {
//   const { dayI, dayII, dataS, data } = dayGlobal;
//   const { key } = params;
//   const weekday = [];
//   // kiem tra gia tri filter
//   if (key) {
//     // kiem tra da search hay chua
//     if (dayII.length > 0 && dataS.length > 0) {
//       dataS.forEach(cla =>
//         cla.classWeekday.weekdayHours.filter(item =>
//           item.weekday === key ? weekday.push(cla) : null,
//         ),
//       ); // filter data
//       yield put(getSearchSuccess(weekday, dayII));
//     } else {
//       data.forEach(cla =>
//         cla.classWeekday.weekdayHours.filter(item =>
//           item.weekday === key ? weekday.push(cla) : null,
//         ),
//       ); // filter data
//       yield put(getSearchSuccess(weekday, dayI));
//     }
//   }
//   if (!key) {
//     if (dayII.length > 0 && dataS.length > 0) {
//       yield put(getSearchSuccess(dataS, dayII));
//     } else {
//       yield put(getSearchSuccess(data, dayI));
//     }
//   }
// }

export default function* sagaWatcher() {
  yield takeLatest(FETCH_CLASS, getDataUser);
  // yield takeLatest(GET_SEARCH, getsearch);
  // yield takeLatest(GET_WEEKDAY, getWeekDay);
}
