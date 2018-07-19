import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent as TimeTable } from './TimeTable';

const timeTableListHeight = 25;
const firstHourOfDay = 8;
const lastHourOfDay = 19;
const minuteGranularity = 30;
const timeTableHours = lastHourOfDay - firstHourOfDay;

describe('DatePicker', () => {
  it('excludes appointments that are completely before or after the time window', () => {
    const props = {
      selectedDate: '2018-03-08'
    };
    const component = shallow(<TimeTable />).dive();
    console.log(component.instance());
    const appointmentsFilterMock = appointments => {
      return component.instance().appointmentsFilter(appointments);
    };
    let startAppointment = '2018-03-08T10:00Z[UTC]';
    let endAppointment = '2018-03-08T23:00Z[UTC]';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    console.log(appointment);
    let appointments = [];
    appointments.push(appointment);
    console.log(appointments);
    console.log(component.instance());
    expect(appointmentsFilterMock(appointments)).toEqual([]);
  });

  it('should match snapshot', () => {
    let component = shallow(<TimeTable />);

    expect(component).toMatchSnapshot();
  });
});
