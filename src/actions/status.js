import { default as fetch } from '../helper/customFetch';
import { fetchPrById } from './index';
import * as dispatchTypes from '../helper/dispatchTypes';
import * as visibilityTypes from '../helper/prVisibility';
import { setVisibilityById } from './sheet';
import { prStatusEnum } from '../components/pr/PrState';

export const addPrStatus = (prById, status) => async dispatch => {
  dispatch({
    type: dispatchTypes.ADD_PR_STATUS_REQUEST
  });
  const addResponse = await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs/${prById.id}/status`,
    {
      method: 'put',
      mode: 'cors',
      body: JSON.stringify({
        status
      })
    }
  );

  if (addResponse.ok) {
    switch (status) {
      case prStatusEnum.RELEASED_SHEET_EMPLOYEE:
        return setVisibilityById(
          prById,
          prById.prVisibilityEntry.visibilityToEmployee ===
            visibilityTypes.VISIBLE,
          true
        )(dispatch);
      case prStatusEnum.RELEASED_SHEET_REVIEWER:
        return setVisibilityById(
          prById,
          true,
          prById.prVisibilityEntry.visibilityToReviewer ===
            visibilityTypes.VISIBLE
        )(dispatch);
      default:
        return fetchPrById(prById.id)(dispatch);
    }
  } else {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: addResponse.status
    });
  }
};
