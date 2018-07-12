import { FETCH_APPOINTMENTS_RESPONSE } from '../helper/dispatchTypes';

export const appointmentsSearchResults = (state = [], action) => {
  switch (action.type) {
    case FETCH_APPOINTMENTS_RESPONSE:
      return action.appointments;
    default:
      return state;
  }
};
