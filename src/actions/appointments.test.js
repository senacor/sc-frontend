import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { appointmentsSearch } from './appointments';
import {
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
    let appointments = [
      {
        appointmentStartTime: '2018-06-12T22:00Z[UTC]',
        appointmentEndTime: '2018-06-13T22:00Z[UTC]',
        appointmentStatus: 'Free'
      }
    ];
    fetchMock.getOnce(
      '/api/v1/employees/appointments?login=test.pr.mitarbeiter1&date=2018-06-12',
      {
        content: {
          // eslint-disable-next-line no-useless-computed-key
          ['test.pr.mitarbeiter1']: {
            appointments
          }
        },
        _links: {
          self: {
            href:
              'http://localhost:8010/api/v1/employees/appointments?login=test.pr.mitarbeiter1&date=2018-06-12'
          }
        }
      }
    );
    const store = mockStore();

    await store.dispatch(
      appointmentsSearch('test.pr.mitarbeiter1', '2018-06-12')
    );

    expect(store.getActions()).toEqual([
      { type: FETCH_APPOINTMENTS_REQUEST },
      {
        type: FETCH_APPOINTMENTS_RESPONSE,
        appointments: {
          // eslint-disable-next-line no-useless-computed-key
          ['test.pr.mitarbeiter1']: {
            appointments
          }
        }
      }
    ]);
  });
});
