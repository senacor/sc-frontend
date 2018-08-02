import { appointmentsSearchResults, selectedDate } from './appointments';
import { FETCH_APPOINTMENTS_RESPONSE } from '../helper/dispatchTypes';
import { CHANGE_DATE_FOR_APPOINTMENT } from '../helper/dispatchTypes';

describe('appointments search reducer', () => {
  it('should fetch the appointments on FETCH_APPOINTMENTS_RESPONSE', () => {
    const stateBefore = [];
    let appointments = [
      {
        employeeId: '1',
        exchangeOutlookAppointmentResponse: [
          {
            appointmentStartTime: '2018-06-12T22:00Z[UTC]',
            appointmentEndTime: '2018-06-13T22:00Z[UTC]',
            appointmentStatus: 'Free'
          }
        ],
        _links: {
          self: {
            href:
              'http://localhost:8010/api/v1/appointments?employees=1&date=2018-06-12'
          }
        }
      }
    ];
    const action = {
      type: FETCH_APPOINTMENTS_RESPONSE,
      appointments
    };

    const stateAfter = appointmentsSearchResults(stateBefore, action);

    expect(stateAfter).toEqual(appointments);
  });
});

describe('selected date reducer', () => {
  it('should change the selected date on CHANGE_DATE_FOR_APPOINTMENT', () => {
    const stateBefore = '2018-06-14';
    const action = {
      type: CHANGE_DATE_FOR_APPOINTMENT,
      changedDate: '2018-06-15'
    };

    const stateAfter = selectedDate(stateBefore, action);

    expect(stateAfter).toEqual('2018-06-15');
  });
});
