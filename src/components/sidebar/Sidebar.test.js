import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import Sidebar from './Sidebar';

describe('Sidebar', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    const element = shallow(<Sidebar />);

    expect(element).toMatchSnapshot();
  });

  it('should contain composition number', () => {
    const element = shallow(<Sidebar />);

    expect(element.find('WithStyles(CompositionNumber)')).toHaveLength(1);
  });
});
