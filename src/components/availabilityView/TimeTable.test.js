import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent as TimeTable } from './TimeTable';
import moment from 'moment';

const props = {
  selectedDate: '2018-03-08'
};
const classes = {
  divider: {},
  appointmentDiv: {}
};

describe('createSingleAppointmentDiv', () => {
  it('should create an appointmentDiv with the correct height and position', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = '2018-03-08T09:45Z[UTC]';
    let endAppointment = '2018-03-08T15:15Z[UTC]';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    let singleAppointmentDiv = (
      <div
        key={'availabilityemployee1'} //if this test is run after the createAppointmentDivs test, which calls this function, the divId (1 here) has been already set to a higher value and this test will fail. If it is run separately, it never fails, since a new instance of the component is created and divIds are set to 0. A workaround to ignore the key would be for example to JSON.stringify the expected and the obtained div-result and then to compare.
        className={classes.appointmentDiv}
        style={{
          left: '15.5%',
          top: '25%',
          height: '50%'
        }}
      />
    );
    expect(
      component
        .instance()
        .createSingleAppointmentDiv('employee', appointment, classes)
    ).toEqual(singleAppointmentDiv);
  });
});

describe('createAppointmentDivs', () => {
  it('should create two appointmentDivs for two appointments', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = '2018-03-08T09:45Z[UTC]';
    let endAppointment = '2018-03-08T15:15Z[UTC]';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    let appointmentsEmployee = [];
    appointmentsEmployee.push(appointment);
    let appointmentsReviewer = [];
    appointmentsReviewer.push(appointment);
    let appointmentsSupervisor = [];
    expect(
      component
        .instance()
        .createAppointmentDivs(
          classes,
          appointmentsEmployee,
          appointmentsReviewer,
          appointmentsSupervisor
        )
    ).toHaveLength(2);
  });
});

describe('createHourLabels', () => {
  it('should create 23 hourLabels if the time window is from 8:00 to 19:00 and the minuteGranularity is 30', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    expect(component.instance().createHourLabels(classes)).toHaveLength(23);
  });
});

describe('createDividers', () => {
  it('should create 23 dividers if the time window is from 8:00 to 19:00 and the minuteGranularity is 30', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    expect(component.instance().createDividers(classes)).toHaveLength(23);
  });
});

describe('calculatePositionFor', () => {
  it('should return 25 if the appointment is in 25% of the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = moment.utc('2018-03-08T09:45Z[UTC]', 'YYYY-MM-DDTHH:mmZ');
    expect(
      component.instance().calculatePositionFor(startAppointment)
    ).toEqual(25);
  });
});

describe('transformAppointmentTimeToPercent', () => {
  it('should return 50 if the appointment is in the center of the time window in UTC', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = '2018-03-08T12:30Z[UTC]';
    expect(
      component.instance().transformAppointmentTimeToPercent(startAppointment)
    ).toEqual(50);
  });

  it('should return 100 if the appointment ends after the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let endAppointment = '2018-03-08T22:00Z[UTC]';

    expect(
      component.instance().transformAppointmentTimeToPercent(endAppointment)
    ).toEqual(100);
  });

  it('should return 0 if the appointment starts before the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = '2018-03-08T02:00Z[UTC]';

    expect(
      component.instance().transformAppointmentTimeToPercent(startAppointment)
    ).toEqual(0);
  });
});

describe('appointmentsFilter', () => {
  it('excludes appointments that are completely before or after the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = '2018-03-08T02:00Z[UTC]';
    let endAppointment = '2018-03-08T03:00Z[UTC]';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    let appointments = [];
    appointments.push(appointment);
    expect(component.instance().appointmentsFilter(appointments)).toEqual([]);
  });

  it('includes appointments that are inside the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = '2018-03-08T12:00Z[UTC]';
    let endAppointment = '2018-03-08T13:00Z[UTC]';
    let appointment = [ startAppointment, endAppointment ];
    let appointments = [ appointment ];
    expect(component.instance().appointmentsFilter(appointments)).toEqual(
      appointments
    );
  });

  it('includes appointments that are inside and outside the time window', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let startAppointment = '2018-03-08T00:00Z[UTC]';
    let endAppointment = '2018-03-08T13:00Z[UTC]';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    let appointments = [];
    appointments.push(appointment);
    expect(component.instance().appointmentsFilter(appointments)).toEqual(
      appointments
    );
  });
});

describe('TimeTable', () => {
  it('should match snapshot', () => {
    let component = shallow(<TimeTable />);

    expect(component).toMatchSnapshot();
  });
});
