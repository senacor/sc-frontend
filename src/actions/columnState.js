import * as dispatchTypes from '../helper/dispatchTypes';

export const changeColumnState = (group, state) => async dispatch => {
  dispatch({
    type: dispatchTypes.CHANGE_COLUMN_STATE,
    group,
    state
  });
};
