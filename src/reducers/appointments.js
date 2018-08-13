import { FETCH_APPOINTMENTS_RESPONSE } from '../helper/dispatchTypes';
import { CHANGE_DATE_FOR_APPOINTMENT } from '../helper/dispatchTypes';
import moment from 'moment-timezone';

export const appointmentsSearchResults = (state = [], action) => {
  switch (action.type) {
    case FETCH_APPOINTMENTS_RESPONSE:
      return action.appointments;
    default:
      return state;
  }
};

export const selectedDate = (
  //TODO Thorsten fragen warum hier tz Angabe gemacht wird.
  state = moment.tz('Europe/Berlin').format('YYYY-MM-DDTHH:mmZ'),
  action
) => {
  switch (action.type) {
    case CHANGE_DATE_FOR_APPOINTMENT:
      return action.changedDate;
    default:
      return state;
  }
};
