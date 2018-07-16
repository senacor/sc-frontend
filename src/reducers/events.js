import { FETCHED_EVENTS } from '../helper/dispatchTypes';
import generateMapById from '../helper/generateMapById';
import cloneDeep from '../helper/cloneDeep';

export const events = (state = [], action) => {
  switch (action.type) {
    case FETCHED_EVENTS: {
      return cloneDeep(generateMapById(action.events.slice(0, 5)));
    }
    default:
      return state;
  }
};
