import React from 'react';
import { shallow } from 'enzyme';
import DateTimePicker from './DateTimePicker';

describe('DateTimePicker', () => {
  it('should match snapshot', () => {
    let component = shallow(
      <DateTimePicker
        date={'2018-09-01'}
        startTime={'09:00'}
        endTime={'10:00'}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should call appointmentsSearch upon picking a date', () => {
    const setDateTimeMock = jest.fn();
    const component = shallow(
      <DateTimePicker onDateTimeChange={setDateTimeMock} />
    ).dive();

    component.find('#date').simulate('change', {
      target: { name: 'date', value: '2018-03-08' }
    });

    expect(setDateTimeMock.mock.calls.length).toBe(1);
    expect(setDateTimeMock.mock.calls[0][0]).toBe('date');
    expect(setDateTimeMock.mock.calls[0][1]).toBe('2018-03-08');
  });
});
