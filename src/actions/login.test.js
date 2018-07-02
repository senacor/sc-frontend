import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { login, logout } from './login';
import {
  LOGIN_REQUEST,
  LOGIN_UNAUTHORIZED,
  LOGIN_RESPONSE,
  LOGOUT
} from '../helper/dispatchTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login redux action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch LOGIN_RESPONSE on valid response', async () => {
    let data = {
      access_token: 'staticAccessToken',
      refreseh_token: 'staticRefreshToken'
    };
    let credentials = {
      username: 'testuser',
      password: 'testpassword'
    };
    fetchMock.postOnce('/oauth2/token', data);
    const store = mockStore();

    await store.dispatch(login(credentials));

    expect(store.getActions()).toEqual([
      {
        type: LOGIN_REQUEST
      },
      {
        type: LOGIN_RESPONSE,
        data
      }
    ]);
  });

  it('should dispatch LOGIN_UNAUTHORIZED on invalid credentials', async () => {
    let data = {
      access_token: 'staticAccessToken',
      refreseh_token: 'staticRefreshToken'
    };
    let credentials = {
      username: 'testuser',
      password: 'testpassword'
    };
    fetchMock.postOnce('/oauth2/token', {
      status: 401,
      body: data
    });
    const store = mockStore();

    await store.dispatch(login(credentials));

    expect(store.getActions()).toContainEqual({
      type: LOGIN_UNAUTHORIZED
    });

    expect(store.getActions()).not.toContainEqual({
      type: LOGIN_RESPONSE
    });
  });

  [
    {
      username: '',
      password: 'testpassword'
    },
    {
      username: 'testuser',
      password: ''
    },
    {
      username: '',
      password: ''
    }
  ].forEach(credentials => {
    it(`should dispatch nothing on username: '${
      credentials.username
    }' and password: '${credentials.password}'`, async () => {
      let data = {
        access_token: 'staticAccessToken',
        refreseh_token: 'staticRefreshToken'
      };

      fetchMock.postOnce('/oauth2/token', data);
      const store = mockStore();

      await store.dispatch(login(credentials));

      expect(store.getActions()).toHaveLength(0);
    });
  });
});

describe('logout redux action', () => {
  it('should dispatch LOGOUT', async () => {
    const store = mockStore();
    await store.dispatch(logout());

    expect(store.getActions()).toEqual([
      {
        type: LOGOUT
      }
    ]);
  });
});
