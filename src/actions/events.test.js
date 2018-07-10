import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { getEvents } from './events';
import { FETCHED_EVENTS } from '../helper/dispatchTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getEvents redux action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch all events', async () => {
    let data = {
      _embedded: {
        eventResponseList: [
          {
            id: 1,
            employee: {
              id: 3,
              firstName: 'Michaela',
              lastName: 'Mitarbeiterin',
              dateOfLastPr: '2019-08-30'
            },
            eventableEntityType: 'pr',
            eventableEntityId: 1,
            eventType: 'EMPLOYEE_RELEASED_PR',
            createdAt: '2018-07-09T14:54:25.675+0000',
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/events/1'
              }
            }
          },
          {
            id: 2,
            employee: {
              id: 3,
              firstName: 'Michaela',
              lastName: 'Mitarbeiterin',
              dateOfLastPr: '2019-08-30'
            },
            eventableEntityType: 'pr',
            eventableEntityId: 1,
            eventType: 'EMPLOYEE_RELEASED_PR',
            createdAt: '2018-07-09T14:54:25.675+0000',
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/events/1'
              }
            }
          }
        ]
      }
    };

    fetchMock.getOnce('/api/v1/events', {
      body: data
    });
    const store = mockStore();

    await store.dispatch(getEvents());

    expect(store.getActions()).toContainEqual({
      type: FETCHED_EVENTS,
      events: data._embedded.eventResponseList
    });
  });
});
