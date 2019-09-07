import { createSelector } from 'reselect';
import initialState from './reducers';

const selectUser = state => state.detpage || initialState;

const makeSelectUser = () =>
  createSelector(
    selectUser,
    userState => userState.user,
  );
const selectUserCst = () =>
  createSelector(
    selectUser,
    userState => userState.userCst,
  );
const selectSave = () =>
  createSelector(
    selectUser,
    userState => userState.isSave,
  );
export { makeSelectUser, selectUserCst, selectSave };
