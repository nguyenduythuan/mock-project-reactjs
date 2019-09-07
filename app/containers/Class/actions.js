import * as type from './constants';

export function fetchClass() {
  return {
    type: type.FETCH_CLASS,
  };
}
export function fetchClassSuccess(data) {
  return {
    type: type.FETCH_CLASS_SUCCESS,
    data,
  };
}

// export function getSearch(keyWord) {
//   return {
//     type: type.GET_SEARCH,
//     keyWord,
//   };
// }
// export function getSearchSuccess(values, day) {
//   return {
//     type: type.GET_SEARCH_SUCCESS,
//     values,
//     day,
//   };
// }

// export function getWeekClass(key) {
//   return {
//     type: type.GET_WEEKDAY,
//     key,
//   };
// }
// export function getWeekCS(values) {
//   return {
//     type: type.GET_WEEKDAY_SUCCSESS,
//     values,
//   };
// }
