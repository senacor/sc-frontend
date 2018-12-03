import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent as Attendee } from './Attendee';
import { createSingleAppointmentDiv } from './Attendee';
import moment from 'moment-timezone';
import Tooltip from '@material-ui/core/Tooltip';

const germanTimeFrom = dateTimeString =>
  moment
    .utc(dateTimeString, 'YYYY-MM-DDTHH:mmZ[UTC]')
    .tz('Europe/Berlin')
    .format('HH:mm');

const classes = {
  appointmentDiv: {
    color: '#AABBCC'
  }
};

const properties = {
  selectedDate: '2018-03-08',
  distanceFromLeft: 15.5,
  show: false,
  classes
};

describe('createSingleAppointmentDiv', () => {
  it('should create an appointmentDiv with the correct height and position.', () => {
    let startAppointment = '2018-03-08T09:45Z[UTC]';
    let endAppointment = '2018-03-08T15:15Z[UTC]';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    let name = 'Michaela Mitarbeiterin';
    let appointmentState = 'Busy';
    let singleAppointmentDiv = (
      <Tooltip
        key={`appointmentDiv15.5_${germanTimeFrom(
          startAppointment
        )}-${germanTimeFrom(endAppointment)}-1`}
        title={name + ': beschäftigt'}
      >
        <div
          key={`appointmentDiv15.5_${germanTimeFrom(
            startAppointment
          )}-${germanTimeFrom(endAppointment)}-1`} //not visible, but necessary for equality
          className={classes.appointmentDiv}
          id={`appointmentDiv15.5_${germanTimeFrom(
            startAppointment
          )}-${germanTimeFrom(endAppointment)}`}
          style={{
            left: '15.5%',
            top: '25%',
            height: '50%'
          }}
        />
      </Tooltip>
    );
    expect(
      createSingleAppointmentDiv(
        15.5,
        startAppointment,
        endAppointment,
        properties.selectedDate,
        classes.appointmentDiv,
        1,
        name,
        appointmentState
      )
    ).toEqual(singleAppointmentDiv);
  });
});

describe('createAppointmentDivs', () => {
  it('should create two appointmentDivs for two appointments.', () => {
    let startAppointment = '2018-03-08T09:45Z[UTC]';
    let endAppointment = '2018-03-08T15:15Z[UTC]';
    let appointmentStatus = 'Tentative';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    appointment.push(appointmentStatus);
    let appointmentsEmployee = [];
    appointmentsEmployee.push(appointment);
    appointmentsEmployee.push(appointment);
    const component = shallow(
      <Attendee
        appointments={appointmentsEmployee}
        selectedDate={properties.selectedDate}
        distanceFromLeft={properties.distanceFromLeft}
        show={false}
      />
    ).dive();
    component.setProps({ classes });

    expect(component.instance().createAppointmentDivs()).toHaveLength(2);
  });
});

describe('Attendee', () => {
  it('renders appointments if show is set to true.', () => {
    let startAppointment = '2018-03-08T09:45Z[UTC]';
    let endAppointment = '2018-03-08T15:15Z[UTC]';
    let appointmentStatus = 'Tentative';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    appointment.push(appointmentStatus);
    let appointmentsEmployee = [];
    appointmentsEmployee.push(appointment);
    appointmentsEmployee.push(appointment);
    let name = 'Michaela Mitarbeiterin';
    const component = shallow(
      <Attendee
        appointments={appointmentsEmployee}
        selectedDate={properties.selectedDate}
        distanceFromLeft={properties.distanceFromLeft}
        show={true}
      />
    ).dive();
    component.setProps({ classes, name });

    expect(component).toMatchSnapshot();
  });
});
