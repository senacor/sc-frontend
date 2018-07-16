import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from './DatePicker';

describe('DatePicker', () => {
  it('should match snapshot', () => {
    let cut = shallow(<DatePicker />);

    expect(cut).toMatchSnapshot();
  });
});
