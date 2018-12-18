import store from '../store';
import { LOGIN_UNAUTHORIZED } from './dispatchTypes';
/**
 * supported usage:
 *   fetch('URL', configObj);
 *
 *   where configObj is something like:
 *   {
 *     method,
 *     headers,
 *     body
 *   }
 */
export default function customFetch(url, config = {}) {
  let access_token = localStorage.getItem('access_token');

  let authenticationConfig = Object.assign({}, config);
  authenticationConfig.headers = Object.assign({}, config.headers, {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  });
  return fetch(url, authenticationConfig).then(response => {
    if (response.status === 401) {
      store.dispatch({
        type: LOGIN_UNAUTHORIZED,
        payload: response.status
      });
    }

    return response;
  });
}

export function fileFetch(url, config = {}) {
  let access_token = localStorage.getItem('access_token');

  let authenticationConfig = Object.assign({}, config);
  authenticationConfig.headers = Object.assign({}, config.headers, {
    Authorization: `Bearer ${access_token}`
  });
  return fetch(url, authenticationConfig).then(response => {
    if (response.status === 401) {
      store.dispatch({
        type: LOGIN_UNAUTHORIZED,
        payload: response.status
      });
    }

    return response;
  });
}
