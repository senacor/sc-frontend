import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent } from './AppointmentPicker';

describe('AppointmentPicker', () => {
  it('should match snapshot', () => {
    let cut = shallow(<StyledComponent />);

    expect(cut).toMatchSnapshot();
  });
});
