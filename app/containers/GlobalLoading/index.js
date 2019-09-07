import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import PropsTypes from 'prop-types';

import LoadingIcon from './loading.gif';
import Img from './Img';
import Div from './Div';
// import { showLoading } from './actions';
import reducer from './reducers';
import { selectShowLoading } from './selectors';

const key = 'load';

function Loading(props) {
  useInjectReducer({ key, reducer });
  const { show } = props;
  function showLoad() {
    if (show) {
      return (
        <Div>
          <Img src={LoadingIcon} alt="loading" />
        </Div>
      );
    }
    return null;
  }
  return showLoad();
}

const mapStateToProps = createStructuredSelector({
  show: selectShowLoading(),
});
const withConnect = connect(
  mapStateToProps,
  null,
);
Loading.propTypes = {
  show: PropsTypes.bool,
  onShowLoading: PropsTypes.func,
};

export default compose(
  withConnect,
  memo,
)(Loading);
