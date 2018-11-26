import { default as fetch } from '../helper/customFetch';
import { fetchPrById } from './index';
import * as dispatchTypes from '../helper/dispatchTypes';

export const addPrStatus = (prById, status) => async dispatch => {
  dispatch({
    type: dispatchTypes.ADD_PR_STATUS_REQUEST
  });
  const addResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v2/prs/${prById.id}/status`,
    {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify({
        status
      })
    }
  );

  if (addResponse.ok) {
    let response = await addResponse.json();
    dispatch({
      type: dispatchTypes.ADD_PR_STATUS_RESPONSE,
      payload: response
    });
    return fetchPrById(prById.id)(dispatch);
  } else {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: addResponse.status
    });
  }
};
