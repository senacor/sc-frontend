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
export default function customFetch(
  url,
  config = {},
  contentType = { 'Content-Type': 'application/json' }
) {
  let access_token = localStorage.getItem('access_token');

  let authenticationConfig = Object.assign({}, config);
  let additionalHeaders = Object.assign(
    {},
    { Authorization: `Bearer ${access_token}` },
    contentType
  );
  authenticationConfig.headers = Object.assign(
    {},
    config.headers,
    additionalHeaders
  );
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
