import React from 'react';
import { shallow } from 'enzyme';
import PersonToggle from './PersonToggle';

describe('DatePicker', () => {
  it('should match snapshot', () => {
    let cut = shallow(<PersonToggle />);

    expect(cut).toMatchSnapshot();
  });
});
