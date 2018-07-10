import { FETCHED_EVENTS } from '../helper/dispatchTypes';

export const events = (state = [], action) => {
  switch (action.type) {
    case FETCHED_EVENTS: {
      return getRecentEvents(action.events);
    }
    default:
      return state;
  }
};

function getRecentEvents(response) {
  return generateMap(response.slice(0, 5));
}

function generateMap(events) {
  const result = {};
  events.forEach(event => {
    result[event.id] = event;
  });

  return result;
}
