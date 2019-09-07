import * as type from './constants';

export const initialState = {
  showLoading: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SHOW_LOADING:
      return { ...state, showLoading: true };
    case type.HIDE_LOADING:
      return { ...state, showLoading: false };
    default:
      return { ...state };
  }
};

export default loadingReducer;
