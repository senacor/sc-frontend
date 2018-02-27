import React from 'react';
import Deadline from './Deadline';
import { shallow } from 'enzyme';

it('displays the deadline if specified', () => {
  const deadline = '2017-11-31';

  const component = shallow(<Deadline deadline={deadline} />);

  expect(component).toMatchSnapshot();
});

it('displays nothing if no deadline is specified', () => {
  const component = shallow(<Deadline />);

  expect(component).toMatchSnapshot();
});
