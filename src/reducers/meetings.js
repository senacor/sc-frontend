import {
  ADD_MEETING_RESPONSE,
  FETCH_MEETING_RESPONSE
} from '../helper/dispatchTypes';

export const meeting = (state = null, action) => {
  switch (action.type) {
    case ADD_MEETING_RESPONSE:
    case FETCH_MEETING_RESPONSE:
      return action.meeting;
    default:
      return state;
  }
};
