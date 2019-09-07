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

export function getDataSuccess(data) {
  return {
    type: type.GET_DATA_SUCCESS,
    data,
  };
}

export function getDataFailed(error) {
  toastTify(error);
  return {
    type: type.GET_DATA_FAIL,
    error,
  };
}
