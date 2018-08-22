import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent as AppointmentPicker } from './AppointmentPicker';
import { changeDate } from '../../actions/appointments';

describe('AppointmentPicker', () => {
  const mockFetchAppointments = jest.fn();

  it('should call changeDate upon picking a date', () => {
    const mockChangeDate = jest.fn(changeDate);
    const component = shallow(
      <AppointmentPicker
        changeDate={mockChangeDate}
        onDateTimeChange={() => {}}
        fetchAppointments={mockFetchAppointments}
      />
    ).dive();

    component.find('#date').simulate('change', { target: '2018-03-08' });

    expect(mockChangeDate).toBeCalled();
  });

  it('should call appointmentsSearch upon picking a date', () => {
    const component = shallow(
      <AppointmentPicker
        changeDate={changeDate}
        onDateTimeChange={() => {}}
        fetchAppointments={mockFetchAppointments}
      />
    ).dive();

    component.find('#date').simulate('change', { target: '2018-03-08' });

    expect(mockFetchAppointments).toBeCalled();
  });

  it('should match snapshot', () => {
    let component = shallow(<AppointmentPicker />);

    expect(component).toMatchSnapshot();
  });
});
