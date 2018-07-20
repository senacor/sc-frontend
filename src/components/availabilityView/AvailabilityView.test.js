import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { StyledComponent as AvailabilityView } from './AvailabilityView';

describe('AvailabilityView', () => {
  it('should match snapshot', () => {
    let component = shallow(<AvailabilityView />);

    expect(component).toMatchSnapshot();
  });
});
