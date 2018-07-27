import { default as fetch } from '../helper/customFetch';
import { fetchPrById } from './index';
import * as dispatchTypes from '../helper/dispatchTypes';
import {
  changeVisibilityForEmployee,
  changeVisibilityForReviewer
} from './sheet';
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
        return changeVisibilityForReviewer(prById)(dispatch);
      case prStatusEnum.RELEASED_SHEET_REVIEWER:
        return changeVisibilityForEmployee(prById)(dispatch);
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
