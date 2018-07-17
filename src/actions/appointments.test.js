import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { appointmentsSearch } from './appointments';
import {
  ERROR_RESPONSE,
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_RESPONSE
} from '../helper/dispatchTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('appointmentSearch redux action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch the appointments for the given date and users', async () => {
    fetchMock.getOnce('/api/v1/appointments?employees=1&date=2018-06-12', {
      _embedded: {
        exchangeOutlookResponseList: [
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
        ]
      }
    });
    const store = mockStore();

    await store.dispatch(appointmentsSearch('1', '2018-06-12'));

    expect(store.getActions()).toContainEqual({
      type: FETCH_APPOINTMENTS_RESPONSE,
      appointments: [
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
      ]
    });
  });
});
