import { getUserInfo, getUserRoles } from './userinfo';
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

describe('getUserRoles redux action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch FETCHED_USERROLES with ad groups', async () => {
    const testdata = {
      '@odata.context':
        'https://graph.microsoft.com/v1.0/$metadata#directoryObjects',
      value: [
        {
          '@odata.type': '#microsoft.graph.group',
          id: 'bb8bebb8-17a1-41a7-ab53-cbcbc93f39dd',
          deletedDateTime: null,
          classification: null,
          createdDateTime: '2018-03-21T09:20:27Z',
          description: null,
          displayName: 'PR_CST_Leiter',
          groupTypes: [],
          mail: null,
          mailEnabled: false,
          mailNickname: 'PR_CST_Leiter',
          onPremisesLastSyncDateTime: '2018-03-21T09:20:28Z',
          onPremisesProvisioningErrors: [],
          onPremisesSecurityIdentifier:
            'S-1-5-21-3857671984-1479701259-3223158569-190012',
          onPremisesSyncEnabled: true,
          preferredDataLocation: null,
          proxyAddresses: [],
          renewedDateTime: '2018-03-21T09:20:27Z',
          resourceBehaviorOptions: [],
          resourceProvisioningOptions: [],
          securityEnabled: true,
          visibility: null
        }
      ]
    };
    fetchMock.getOnce('/oauth2/userinfo/groups', {
      body: testdata
    });
    const store = mockStore();

    await store.dispatch(getUserRoles());

    expect(store.getActions()).toContainEqual({
      type: 'FETCHED_USERROLES',
      roles: testdata
    });
  });
});
