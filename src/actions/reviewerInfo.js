import * as dispatchTypes from '../helper/dispatchTypes';
import { default as fetch } from '../helper/customFetch';

export const fetchReviewerInfo = () => {
  return async dispatch => {
    dispatch({
      type: dispatchTypes.REVIEWER_INFO_REQUEST
    });

    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/user`);

    if (response.ok) {
      const result = await response.json();
      const reviewerInfo = result ? result : [];

      dispatch({
        type: dispatchTypes.REVIEWER_INFO_RESPONSE,
        payload: {
          reviewerInfo
        }
      });
    } else {
      return dispatch({
        type: dispatchTypes.ERROR_RESPONSE,
        httpCode: response.status
      });
    }
  };
};
