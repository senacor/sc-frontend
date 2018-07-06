import { FETCHED_EVENTS } from '../helper/dispatchTypes';

export const prEventsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCHED_EVENTS: {
      return getEventData(action.response);
    }
    default:
      return state;
  }
};

function getEventData(response) {
  if (
    response &&
    response._embedded &&
    response._embedded.eventableResponseList
  ) {
    return response._embedded.eventableResponseList.slice(0, 5);
  }

  return [];
}
