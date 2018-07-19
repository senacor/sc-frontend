import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent } from './DatePicker';

describe('DatePicker', () => {
  /*The following attempt leads to a failing test saying:
  "TypeError: this.props.changeDate is not a function"

  it('should call changeDate upon picking a date', wait => {
    const handleTimeChange = props => {
      console.log(props.changeDate);
      expect(props.changeDate);
      wait();
    };
    const props = {
      changeDate: jest.fn()
    };
    const wrapper = shallow(
      <StyledComponent props={props} onChange={handleTimeChange} />
    ).dive();
    console.log(wrapper.debug());
    wrapper.find('TextField').simulate('change', { target: '2018-03-08' });
  });*/

  it('should match snapshot', () => {
    let component = shallow(<StyledComponent />);

    expect(component).toMatchSnapshot();
  });
});
