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
}
