import { CHANGE_COLUMN_STATE } from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

const initState = {
  employee: {},
  reviewer: {},
  hr: {}
};

export const columnState = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_COLUMN_STATE:
      let newColumnState = Object.assign({}, state[action.group], action.state);

      return cloneDeep(
        Object.assign({}, state, {
          [action.group]: newColumnState
        })
      );
    default:
      return state;
  }
};
