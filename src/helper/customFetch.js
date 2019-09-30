import { logout } from '../calls/login';
import ROUTES from './routes';

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
      logout();
      window.location.pathname = ROUTES.LOGIN;
    }
    return response;
  });
}
