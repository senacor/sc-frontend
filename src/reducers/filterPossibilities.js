import { FILTER_POSSIBILITIES_RESPONSE } from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const filterPossibilities = (state = {}, action) => {
  switch (action.type) {
    case FILTER_POSSIBILITIES_RESPONSE:
      return cloneDeep(action.payload);
    default:
      return state;
  }
};
