import { createSelector } from 'reselect';
import initialState from './reducers';

const selectData = state => state.class || initialState;

const makeSelectClass = () =>
  createSelector(
    selectData,
    classState => classState.data,
  );
// const makeDay = () =>
//   createSelector(
//     selectData,
//     classState => classState.day,
//   );

export { makeSelectClass };
