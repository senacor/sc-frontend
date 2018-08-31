import React from 'react';
import { StyledComponent } from './MeetingCreatorForm';
import { createShallow } from '@material-ui/core/test-utils';

const fetchAppointmentsMock = jest.fn();

describe('MeetingCreatorForm', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let wrapper = shallow(
      <StyledComponent fetchAppointments={fetchAppointmentsMock} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should display the create appointment form when meeting does not exist', () => {
    let shallow = createShallow({ dive: true });
    let wrapper = shallow(
      <StyledComponent
        meeting={null}
        fetchAppointments={fetchAppointmentsMock}
      />
    );

    expect(wrapper.find('#createMeeting')).toHaveLength(1);
  });
});
