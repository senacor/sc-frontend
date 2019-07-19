import * as dispatchTypes from '../helper/dispatchTypes';
import { default as fetch } from '../helper/customFetch';
import objectGet from 'object-get';

export const fetchFilteredPrsForHumanResource = filter => async dispatch => {
  dispatch({
    type: dispatchTypes.FETCH_PRS_HR_REQUEST
  });

  let query = '';
  if (filter) {
    let filterString = Object.keys(filter)
      .map(function(key) {
        return filter[key].searchString;
      })
      .join('&');
    query = filterString ? '?' + filterString : '';
  }
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/hr/prs${query}`
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

export const fetchFilteredPrs = (filter, role) => async dispatch => {
  dispatch({
    type: dispatchTypes.FETCH_OWN_PRS_REQUEST
  });

  let query = '';
  if (filter) {
    let filterString = Object.keys(filter)
      .map(function(key) {
        return filter[key].searchString;
      })
      .join('&');
    query = filterString ? '&' + filterString : '';
  }

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs?role=${role}${query}`
  );

  if (response.ok) {
    const result = await response.json();
    const responseList = objectGet(result, '_embedded.ownPrResponseList');
    let prTableEntries = responseList ? responseList : [];

    // if query contains '=&' or ends with '=', that means in some filter there is nothing selected
    // so table entries will be empty
    if (query.includes('=&') || query.endsWith('=')) {
      prTableEntries = [];
    }

    dispatch({
      type: dispatchTypes.FETCH_OWN_PRS_RESPONSE,
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
