import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withLoading = onComponentDidMount => WrappedComponent => {
  class WithLoading extends Component {
    constructor(props) {
      super(props);
      if (onComponentDidMount) {
        onComponentDidMount(props);
      }
    }

    render() {
      if (this.props.isLoading) {
        return <CircularProgress />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }
  WithLoading.displayName = `WithLoading(${getDisplayName(WrappedComponent)})`;
  return WithLoading;
};

export default withLoading;
