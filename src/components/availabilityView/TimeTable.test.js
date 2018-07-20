import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent as TimeTable } from './TimeTable';

const timeTableListHeight = 25;
const firstHourOfDay = 8;
const lastHourOfDay = 19;
const minuteGranularity = 30;
const timeTableHours = lastHourOfDay - firstHourOfDay;
const props = {
  selectedDate: '2018-03-08'
};
const classes = {
  divider: {},
  appointmentDiv: {}
};

describe('createSingleAppointmentDiv', () => {
  it('should create 23 hourLabels if the time window is from 8:00 to 19:00 and the minuteGranularity is 30', () => {
    const component = shallow(<TimeTable />).dive();
    component.setProps(props);
    let singleAppointmentDiv = (<div
      key={'availability' + 'employee1')}
      className={classes.appointmentDiv}
      style={{
        left: '15.5%',
        top: topPosition.toString() + '%',
        height: length.toString() + '%'
      }}
    />);
    expect(component.instance().createHourLabels(classes)).toHaveLength(23);
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
    let startAppointment = '2018-03-08T09:45Z[UTC]';
    expect(
      component.instance().transformAppointmentTimeToPercent(startAppointment)
    ).toEqual(25);
  });
});

describe('transformAppointmentTimeToPercent', () => {
  it('should return 50 if the appointment is in the center of the time window', () => {
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
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    let appointments = [];
    appointments.push(appointment);
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
