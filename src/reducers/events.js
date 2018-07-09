import { FETCHED_EVENTS } from '../helper/dispatchTypes';

export const events = (state = [], action) => {
  switch (action.type) {
    case FETCHED_EVENTS: {
      return getEventData(action.prEvents);
    }
    default:
      return state;
  }
};

function getEventData(response) {
  return response.slice(0, 5);
}
