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
  return fetch(url, authenticationConfig);
}
