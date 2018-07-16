import React from 'react';
import { shallow } from 'enzyme';
import  { StyledComponent as AvailabilityView } from './AvailabilityView';

describe('DatePicker', () => {
  it('should match snapshot', () => {
    let cut = shallow(<AvailabilityView />);

    expect(cut).toMatchSnapshot();
  });
});
