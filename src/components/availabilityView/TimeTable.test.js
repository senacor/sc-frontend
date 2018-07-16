import React from 'react';
import { shallow } from 'enzyme';
import {StyledComponent as TimeTable } from './TimeTable';

describe('DatePicker', () => {
  it('should match snapshot', () => {
    let cut = shallow(<TimeTable />);

    expect(cut).toMatchSnapshot();
  });
});
