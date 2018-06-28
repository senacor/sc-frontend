import { isUnauthorized, isLoggedIn } from './login';
import {
  LOGIN_RESPONSE,
  LOGOUT,
  LOGIN_UNAUTHORIZED
} from '../helper/dispatchTypes';

describe('login reducer', () => {
  describe('for isLoggedIn', () => {
    it('should return true for action LOGIN_RESPONSE', () => {
      let action = {
        type: LOGIN_RESPONSE,
        data: {
          access_token: 'staticAccessToken',
          refresh_token: 'staticRefreshToken'
        }
      };

      let result = isLoggedIn(false, action);

      expect(result).toBe(true);
    });

    it('should set access_token and refresh_token in localStorage for action LOGIN_RESPONSE', () => {
      let action = {
        type: LOGIN_RESPONSE,
        data: {
          access_token: 'staticAccessToken',
          refresh_token: 'staticRefreshToken'
        }
      };

      isLoggedIn(false, action);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'access_token',
        'staticAccessToken'
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'refresh_token',
        'staticRefreshToken'
      );
    });

    [LOGOUT, LOGIN_UNAUTHORIZED].forEach(type => {
      it(`should return false for action ${type}`, () => {
        let action = {
          type: type
        };

        let result = isLoggedIn(false, action);

        expect(result).toBe(false);
      });
    });

    it('should remove access_token and refresh_token in localStorage for action LOGOUT', () => {
      let action = {
        type: LOGOUT
      };

      isLoggedIn(false, action);

      expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('refresh_token');
    });
  });

  describe('for isUnauthorized', () => {
    it('should return true for action LOGIN_UNAUTHORIZED', () => {
      let action = {
        type: LOGIN_UNAUTHORIZED
      };

      let result = isUnauthorized(false, action);

      expect(result).toBe(true);
    });

    [LOGOUT, LOGIN_RESPONSE, LOGIN_RESPONSE].forEach(type => {
      it(`should return false for action ${type}`, () => {
        let action = {
          type: type
        };

        let result = isUnauthorized(false, action);

        expect(result).toBe(false);
      });
    });
  });
});
