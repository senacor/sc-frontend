import React from 'react';
import { shallow } from 'enzyme';
import AppBar from './AppBar';

it('displays the appbar', () => {
  const component = shallow(<AppBar />);

  expect(component).toMatchSnapshot();
});
