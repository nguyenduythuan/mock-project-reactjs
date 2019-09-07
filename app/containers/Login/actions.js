import { toast } from 'react-toastify';
import * as type from './constants';

export function loginRequest(email, password, submit) {
  return {
    type: type.LOGIN_REQUEST,
    email,
    password,
    submit,
  };
}
export function loginSuccess(userInfo) {
  return {
    type: type.LOGIN_SUCCESS,
    userInfo,
  };
}

export function loginFailure(err) {
  toast.error(`${err}`, {
    position: toast.POSITION.TOP_CENTER,
  });
  return {
    type: type.LOGIN_FAILURE,
    err,
  };
}
