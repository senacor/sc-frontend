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
    component.setProps(props);
    let startAppointment = '2018-03-08T07:00Z[UTC]';
    let endAppointment = '2018-03-08T08:00Z[UTC]';
    let appointment = [];
    appointment.push(startAppointment);
    appointment.push(endAppointment);
    let appointments = [];
    appointments.push(appointment);
    expect(component.instance().appointmentsFilter(appointments)).toEqual(appointments);
  });

  it('should match snapshot', () => {
    let component = shallow(<TimeTable />);

    expect(component).toMatchSnapshot();
  });
});
