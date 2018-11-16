import * as dispatchTypes from '../helper/dispatchTypes';

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
