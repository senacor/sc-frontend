import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { isLoading, isLoadingAction } from '../../reducers/selector';
import React from 'react';
import { connect } from 'react-redux';

export const LoadingActionRender = props => {
  if (props.isLoad) {
    return <CircularProgress />;
  }
  return props.children;
};

export default connect(
  (state, props) => ({
    isLoad:
      props.loadingAction === []
        ? isLoading(state)
        : isLoadingAction(state, props.loadingAction)
  }),
  {}
)(LoadingActionRender);
