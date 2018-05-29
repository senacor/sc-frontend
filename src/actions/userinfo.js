import { default as authorizedFetch } from '../helper/customFetch';

export const getUserInfo = () => async dispatch => {
  const response = await authorizedFetch(
    `${process.env.REACT_APP_API}/oauth2/userinfo`,
    {
      mode: 'cors'
    }
  );

  if (response.ok) {
    const userinfo = await response.json();

    dispatch({
      type: 'FETCHED_USERINFO',
      userinfo
    });
  }
};

export const getUserPhoto = () => async dispatch => {
  let response = await fetch(
    `${process.env.REACT_APP_API}/oauth2/userinfo/photo`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'image/jpeg'
      }
    }
  );

  if (response.ok) {
    let buffer = await response.arrayBuffer();

    let base64Flag = 'data:image/jpeg;base64,';
    let base64ImageString = arrayBufferToBase64(buffer);
    let imageString = base64Flag + base64ImageString;

    dispatch({
      type: 'FETCHED_USERPHOTO',
      imageString
    });
  }
};

function arrayBufferToBase64(buffer) {
  let binary = '';
  let bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach(b => (binary += String.fromCharCode(b)));

  return window.btoa(binary);
}
