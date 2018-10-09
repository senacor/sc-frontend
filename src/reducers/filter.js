import { ADD_FILTER } from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const filter = (state = [], action) => {
  switch (action.type) {
    case ADD_FILTER: {
      let newFilterGroup = Object.assign(
        {},
        state[action.payload.filterGroup],
        action.payload.filter
      );

      return cloneDeep(
        Object.assign({}, state, {
          [action.payload.filterGroup]: newFilterGroup
        })
      );
    }
    default:
      return state;
  }
};
