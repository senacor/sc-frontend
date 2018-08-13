import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent as DatePicker } from './DatePicker';
import { changeDate } from '../../actions/appointments';

describe('DatePicker', () => {
  it('should call changeDate upon picking a date', () => {
    const mockChangeDate = jest.fn(changeDate);
    const component = shallow(
      <DatePicker changeDate={mockChangeDate} />
    ).dive();
    component.find('TextField').simulate('change', { target: '2018-03-08' });
    expect(mockChangeDate).toBeCalled();
  });

  it('should match snapshot', () => {
    let component = shallow(<DatePicker />);

    expect(component).toMatchSnapshot();
  });
});
