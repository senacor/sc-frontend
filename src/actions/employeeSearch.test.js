import fetchMock from 'fetch-mock';
import { prSearch } from './employeeSearch';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('employeeSearch', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch FETCH_EMPLOYEES_RESPONSE with results', async () => {
    fetchMock.getOnce('/api/v1/employees?query=lionel', {
      _embedded: {
        personSearchResponseList: [
          {
            id: 1,
            login: 'lschäfer',
            firstName: 'Lionel',
            lastName: 'Schäfer',
            title: 'DR',
            email: 'lionel.schäfer@senacor.com',
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/employees/1'
              }
            }
          }
        ]
      }
    });

    const store = mockStore();

    await store.dispatch(prSearch('lionel'));

    expect(store.getActions()).toEqual([
      {
        type: 'FETCH_EMPLOYEES_REQUEST'
      },
      {
        type: 'ERROR_GONE'
      },
      {
        type: 'FETCH_EMPLOYEES_RESPONSE',
        employees: [
          {
            id: 1,
            login: 'lschäfer',
            firstName: 'Lionel',
            lastName: 'Schäfer',
            title: 'DR',
            email: 'lionel.schäfer@senacor.com',
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/employees/1'
              }
            }
          }
        ]
      }
    ]);
  });
});
