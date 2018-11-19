import React from 'react';
import { StyledComponent } from './Dashboard';
import { createShallow } from '@material-ui/core/test-utils';

describe('Dashboard component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let wrapper = shallow(<StyledComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
