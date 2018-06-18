import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { getCstMembers } from './cstMembers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getCstmembers redux action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch all cst members', async () => {
    let data = {
      _embedded: {
        employeeResponseList: [
          {
            id: 2,
            firstName: 'Saskia',
            lastName: 'Kunze',
            dateOfLastPr: '2018-03-14',
            _links: {
              self: {
                href: 'http://localhost:3000/api/v1/cstmembers'
              }
            }
          }
        ]
      }
    };

    fetchMock.getOnce('/api/v1/cstmembers', {
      body: data
    });
    const store = mockStore();

    await store.dispatch(getCstMembers());

    expect(store.getActions()).toContainEqual({
      type: 'FETCHED_CSTMEMBERS',
      cstMembers: data
    });
  });
});
