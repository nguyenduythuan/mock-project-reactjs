import { createSelector } from 'reselect';
import initialState from './reducers';

const selectData = state => state.form || initialState;

const makeSelectData = () =>
  createSelector(
    selectData,
    datalState => datalState.data,
  );
const makeUsers = () =>
  createSelector(
    selectData,
    datalState => datalState.users,
  );
// export { makeSelectData, makeSelectKey, makeSelec };
export { makeSelectData, makeUsers };
