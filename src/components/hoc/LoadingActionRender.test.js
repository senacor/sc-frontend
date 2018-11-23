import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { LoadingActionRender } from './LoadingActionRender';

describe('LoadingActionRender Component', () => {
  it('should displays a loading symbol, when the loading prop is set', () => {
    let shallow = createShallow({ dive: true });

    const component = shallow(
      <LoadingActionRender isLoad={true}>
        <div> Text </div>
      </LoadingActionRender>
    );
    expect(component.find('CircularProgress')).toHaveLength(1);
    expect(component.find('div')).toHaveLength(0);
  });

  it('should displays the child Component, when the loading prop is not set', () => {
    let shallow = createShallow({ dive: false });

    const component = shallow(
      <LoadingActionRender isLoad={false}>
        <div> Text </div>
      </LoadingActionRender>
    );
    expect(component.find('CircularProgress')).toHaveLength(0);
    expect(component.containsMatchingElement(<div> Text </div>)).toBeTruthy();
  });
});
