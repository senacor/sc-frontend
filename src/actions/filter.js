import * as dispatchTypes from '../helper/dispatchTypes';

export const addFilter = payload => async dispatch => {
  dispatch({
    type: dispatchTypes.ADD_SUBFILTER,
    payload
  });
};
