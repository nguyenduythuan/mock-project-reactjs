import { createSelector } from 'reselect';
import initialState from './reducers';

const selectData = state => state.load || initialState;

const selectShowLoading = () =>
  createSelector(
    selectData,
    classState => classState.showLoading,
  );

export { selectShowLoading };
