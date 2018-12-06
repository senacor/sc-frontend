import React from 'react';
import { StyledComponent as Dashboard } from './Dashboard';
import { createShallow } from '@material-ui/core/test-utils';

describe('Dashboard component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let userinfo = {};
    let wrapper = shallow(<Dashboard userinfo={userinfo} />);
    expect(wrapper).toMatchSnapshot();
  });
});
