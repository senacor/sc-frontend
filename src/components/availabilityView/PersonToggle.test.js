import React from 'react';
import { shallow } from 'enzyme';
import PersonToggle from './PersonToggle';

describe('PersonToggle', () => {
  it('should change state on toggle', () => {
    const handleToggle = state => {
      expect(state.showEmployee).toBe(true);
    };
    const component = shallow(<PersonToggle onChange={handleToggle} />).dive();
    component.find('WithStyles(Switch).employeeSwitch').simulate('change');
  });

  it('should match snapshot', () => {
    let component = shallow(<PersonToggle />);

    expect(component).toMatchSnapshot();
  });
});
