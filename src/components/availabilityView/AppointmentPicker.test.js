import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent as AppointmentPicker } from './AppointmentPicker';
import { appointmentsSearch, changeDate } from '../../actions/appointments';

describe('AppointmentPicker', () => {
  it('should call changeDate upon picking a date', () => {
    const mockChangeDate = jest.fn(changeDate);
    const component = shallow(
      <AppointmentPicker
        changeDate={mockChangeDate}
        onDateTimeChange={() => {}}
        appointmentsSearch={appointmentsSearch}
      />
    ).dive();

    component.find('#date').simulate('change', { target: '2018-03-08' });

    expect(mockChangeDate).toBeCalled();
  });

  it('should call appointmentsSearch upon picking a date', () => {
    const mockAppointmentsSearch = jest.fn(appointmentsSearch);
    const component = shallow(
      <AppointmentPicker
        changeDate={changeDate}
        onDateTimeChange={() => {}}
        appointmentsSearch={mockAppointmentsSearch}
      />
    ).dive();

    component.find('#date').simulate('change', { target: '2018-03-08' });

    expect(mockAppointmentsSearch).toBeCalled();
  });

  it('should match snapshot', () => {
    let component = shallow(<AppointmentPicker />);

    expect(component).toMatchSnapshot();
  });
});
