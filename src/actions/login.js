import { default as fetch } from '../helper/customFetch';

import {
  LOGIN_REQUEST,
  LOGIN_UNAUTHORIZED,
  LOGIN_RESPONSE,
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

  if (response.status === 401) {
    dispatch({
      type: LOGIN_UNAUTHORIZED
    });
  } else {
    const data = await response.json();

    dispatch({
      type: LOGIN_RESPONSE,
      data
    });
  }
};

export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT
  });
};
