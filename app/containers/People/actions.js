import { toast } from 'react-toastify';
import * as type from './constants';
import 'react-toastify/dist/ReactToastify.css';

const toastTify = err => {
  toast.error(err, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export function getData() {
  return {
    type: type.GET_DATA,
  };
}
export function getDataSuccess(values) {
  return {
    type: type.GET_DATA_SUCCESS,
    values,
  };
}
export function getDataFail(err) {
  toastTify(err);
  return {
    type: type.GET_DATA_FAIL,
  };
}

// export function getKeyFilter(item) {
//   return {
//     type: type.GET_KEY_FILTER,
//     item,
//   };
// }
