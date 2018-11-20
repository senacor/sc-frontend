import React from 'react';
import { shallow } from 'enzyme';
import StyledComponent from './PersonToggle';
import { PersonToggle } from './PersonToggle';

describe('PersonToggle', () => {
  it('should change state on toggle', () => {
    const classes = {
      colorSwitchBaseReviewer: {
        color: '#004953'
      },
      colorSwitchBaseEmployee: {
        color: '#3D8E99'
      },
      colorSwitchBaseSupervisor: {
        color: '#00FF90'
      }
    };
    const callbackMock = jest.fn();

    const component = shallow(
      <PersonToggle
        onChange={callbackMock}
        showAttendee={false}
        displayName="Mitarbeiter1"
        displayRole="Mitarbeiter"
        classes={classes}
      />
    );
    component.find('WithStyles(Switch).employeeSwitch').simulate('change');

    expect(callbackMock).toHaveBeenCalledTimes(1);
    expect(component.state('showAttendee')).toBe(true);
  });

  it('should match snapshot', () => {
    let component = shallow(
      <StyledComponent
        displayName="Michaela Mitarbeiterin"
        displayRole="Mitarbeiter"
      />
    );

    expect(component).toMatchSnapshot();
  });
});
