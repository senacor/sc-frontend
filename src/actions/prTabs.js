import * as dispatchTypes from '../helper/dispatchTypes';

export const setPrTabs = tab => async dispatch => {
  dispatch({
    type: dispatchTypes.SET_PR_TAB,
    payload: tab
  });
};
