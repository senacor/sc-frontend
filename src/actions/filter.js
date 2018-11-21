import * as dispatchTypes from '../helper/dispatchTypes';
import { default as fetch } from '../helper/customFetch';

export const addFilter = payload => async dispatch => {
  dispatch({
    type: dispatchTypes.ADD_SUBFILTER,
    payload
  });
};

export const deleteFilter = payload => async dispatch => {
  dispatch({
    type: dispatchTypes.DELETE_SUBFILTER,
    payload
  });
};

export const resetFilterGroup = filterGroup => async dispatch => {
  dispatch({
    type: dispatchTypes.RESET_FILTERGROUP,
    payload: { filterGroup: filterGroup }
  });
};

export const getFilterPossibilities = () => async dispatch => {
  dispatch({
    type: dispatchTypes.FILTER_POSSIBILITIES_REQUEST
  });

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs/filter`
  );

  if (response.ok) {
    const possibilities = await response.json();

    dispatch({
      type: dispatchTypes.FILTER_POSSIBILITIES_RESPONSE,
      payload: possibilities
    });
  } else {
    return dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: response.status
    });
  }
};
