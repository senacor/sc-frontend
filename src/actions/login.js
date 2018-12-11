import { default as fetch } from '../helper/customFetch';

import {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGIN_UNAUTHORIZED,
  LOGOUT
} from '../helper/dispatchTypes';

export const login = credentials => async dispatch => {
  if (credentials.username === '' || credentials.password === '') {
    return;
  }

  dispatch({
    type: LOGIN_REQUEST
  });

  const response = await fetch(`${process.env.REACT_APP_API}/oauth2/token`, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify(credentials)
  });

  if (response.ok) {
    const data = await response.json();

    dispatch({
      type: LOGIN_RESPONSE,
      data
    });
  } else {
    dispatch({
      type: LOGIN_UNAUTHORIZED,
      payload: response.status
    });
  }
};

export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT
  });
};
