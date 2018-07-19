import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent } from './DatePicker';
import { changeDate } from '../../actions/appointments';

describe('DatePicker', () => {
  /*The following attempt leads to a failing test saying:
  "TypeError: Cannot read property '_isMockFunction' of undefined"

  it('should call changeDate upon picking a date', () => {
    const handleTimeChange = () => {
      expect(mockChangeDate).toBeCalled();
    };
    const mockChangeDate = jest.spyOn(changeDate, 'dispatch');
    const props = {
      changeDate: changeDate()
    };
    const wrapper = shallow(
      <StyledComponent onChange={handleTimeChange} />
    ).dive();
    wrapper.setProps(props);
    console.log(wrapper.instance());
    wrapper.find('TextField').simulate('change', { target: '2018-03-08' });
    expect(mockChangeDate).toBeCalled();
  });*/

  it('should match snapshot', () => {
    let component = shallow(<StyledComponent />);

    expect(component).toMatchSnapshot();
  });
});
