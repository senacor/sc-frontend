import React from 'react';
import { shallow } from 'enzyme';

import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('should match snapshot', () => {
    const element = shallow(<Sidebar />);

    expect(element).toMatchSnapshot();
  });
});
