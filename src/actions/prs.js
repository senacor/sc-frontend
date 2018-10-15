import * as dispatchTypes from '../helper/dispatchTypes';
import { default as fetch } from '../helper/customFetch';
import objectGet from 'object-get';

export const fetchAllPrsForHumanResource = () => async dispatch => {
  dispatch({
    type: dispatchTypes.FETCH_PRS_HR_REQUEST
  });

  const response = await fetch(`${process.env.REACT_APP_API}/api/v1/hr/prs`);

  if (response.ok) {
    const result = await response.json();
    const responseList = objectGet(
      result,
      '_embedded.performanceReviewTableEntryResponseList'
    );
    const prTableEntries = responseList ? responseList : [];

    dispatch({
      type: dispatchTypes.FETCH_PRS_HR_RESPONSE,
      payload: {
        prTableEntries
      }
    });
  } else {
    return dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: response.status
    });
  }
};

export const fetchFilteredPrsForHumanResource = payload => async dispatch => {
  dispatch({
    type: dispatchTypes.FETCH_FILTERED_PRS_HR_REQUEST
  });
  dispatch({
    type: dispatchTypes.ADD_FILTER,
    payload
  });

  let filterString = '';
  Object.keys(payload.filter).map(key => {
    filterString += filterString === '' ? '?' : '&';
    filterString += payload.filter[key].searchString;
    return filterString;
  });

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/hr/prs${filterString}`
  );

  if (response.ok) {
    const result = await response.json();
    const responseList = objectGet(
      result,
      '_embedded.performanceReviewTableEntryResponseList'
    );
    const prTableEntries = responseList ? responseList : [];

    dispatch({
      type: dispatchTypes.FETCH_PRS_HR_RESPONSE,
      payload: {
        prTableEntries
      }
    });
  } else {
    return dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: response.status
    });
  }
};
