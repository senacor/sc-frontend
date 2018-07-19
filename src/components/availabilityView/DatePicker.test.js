import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent } from './DatePicker';
import { changeDate } from '../../actions/appointments';

describe('DatePicker', () => {
  it('should call changeDate upon picking a date', () => {
    const mockChangeDate = jest.fn(changeDate);
    const wrapper = shallow(
      <StyledComponent changeDate={mockChangeDate} />
    ).dive();
    wrapper.find('TextField').simulate('change', { target: '2018-03-08' });
    expect(mockChangeDate).toBeCalled();
  });

  it('should match snapshot', () => {
    let component = shallow(<StyledComponent />);

    expect(component).toMatchSnapshot();
  });
});
