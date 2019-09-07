import * as type from './constants';

export function showLoading() {
  return {
    type: type.SHOW_LOADING,
  };
}

export function hideLoading() {
  return {
    type: type.HIDE_LOADING,
  };
}
