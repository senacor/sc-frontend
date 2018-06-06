import React from 'react';
import Dashboard from './Dashboard';
import { createShallow } from '@material-ui/core/test-utils';

describe('Dashboard component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let cut = shallow(<Dashboard />);

    expect(cut).toMatchSnapshot();
  });
});
