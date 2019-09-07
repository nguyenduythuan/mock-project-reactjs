import { toast } from 'react-toastify';
import * as type from './constants';

const notify = () =>
  toast.success('Lưu thành công !', {
    position: toast.POSITION.TOP_RIGHT,
  });

export function fetchUser() {
  return {
    type: type.FETCH_USER,
  };
}
export function fetchUserSuccess(user) {
  return {
    type: type.FETCH_USER_SUCCESS,
    user,
  };
}

export function editUser(user) {
  return {
    type: type.EDIT,
    user,
  };
}
export function editSuccess(data) {
  notify();
  return {
    type: type.EDIT_SUCCESS,
    data,
  };
}

export function calcelEdit() {
  return {
    type: type.CALCEL_EDIT,
  };
}
