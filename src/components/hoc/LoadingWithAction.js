import React, { Component } from 'react';
import LoadingActionRender from './LoadingActionRender';

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withLoadingAction = onComponentDidMount => (
  actions = []
) => WrappedComponent => {
  class WithLoadingAction extends Component {
    constructor(props) {
      super(props);
      if (onComponentDidMount) {
        onComponentDidMount(props);
      }
    }

    render() {
      return (
        <LoadingActionRender loadingAction={actions}>
          <WrappedComponent {...this.props} />
        </LoadingActionRender>
      );
    }
  }
  WithLoadingAction.displayName = `WithLoadingAction(${getDisplayName(
    WrappedComponent
  )})`;
  return WithLoadingAction;
};

export default withLoadingAction;
