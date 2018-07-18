import moment from 'moment';
import 'moment-timezone';

export const FRONTEND_DATE_FORMAT = 'DD.MM.YYYY';
export const FRONTEND_DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm';

export const formatDateForFrontend = input => {
  if (input) {
    let date = moment.isMoment(input) ? input : moment(input);
    if (date.isValid()) {
      return date.format(FRONTEND_DATE_FORMAT);
    }
  }
  return null;
};

export const formatDateTimeForFrontend = input => {
  if (input) {
    let date = moment.isMoment(input) ? input : moment.utc(input);
    if (date.isValid()) {
      return date.tz('Europe/Berlin').format(FRONTEND_DATE_TIME_FORMAT);
    }
  }
  return null;
};
