import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLog = state => state.login || initialState;

// const makeSelectErr = () =>
//   createSelector(
//     selectLog,
//     loginState => loginState.err,
//   );
const makeSelectLogged = () =>
  createSelector(
    selectLog,
    loginState => loginState.isLoggedIn,
  );
export { selectLog, makeSelectLogged };
