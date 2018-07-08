import moment from 'moment';

export const FRONTEND_DATE_FORMAT = 'DD.MM.YYYY';

export const formatDateForFrontend = input => {
  if (input) {
    let date = moment.isMoment(input) ? input : moment(input);
    if (date.isValid()) {
      return date.format(FRONTEND_DATE_FORMAT);
    }
  }
  return null;
};
