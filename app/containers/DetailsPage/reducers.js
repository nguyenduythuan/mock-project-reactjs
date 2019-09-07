import * as type from './constants';

export const initialState = { user: {} };

const detailsPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_USER:
      return { ...state };
    case type.FETCH_USER_SUCCESS:
      return { ...state, user: { ...action.user } };
    case type.EDIT_SUCCESS:
      return { ...state, userCst: { ...action.data }, isSave: true };
    default:
      return { ...state };
  }
};

export default detailsPageReducer;
