import { getUserInfo } from './userinfo';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getUserInfo redux action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch FETCHED_USERINFO with givenName and surname', async () => {
    const testdata = {
      '@odata.context':
        'https://graph.microsoft.com/v1.0/$metadata#users/$entity',
      id: '1af6cb23-5219-4983-a769-97af912b8089',
      displayName: 'Michaela Müller',
      givenName: 'Michaela',
      surname: 'Müller',
      userPrincipalName: 'test.pr.mitarbeiter1@polaris.senacor.com'
    };
    fetchMock.getOnce('/oauth2/userinfo', {
      body: testdata
    });
    const store = mockStore();

    await store.dispatch(getUserInfo());

    expect(store.getActions()).toEqual([
      {
        type: 'FETCHED_USERINFO',
        userinfo: testdata
      }
    ]);
  });
});
