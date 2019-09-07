import { createSelector } from 'reselect';
import initialState from './reducers';

const selectData = state => state.info || initialState;

const makeSelectData = () =>
  createSelector(
    selectData,
    classState => classState.data,
  );
export { makeSelectData };
