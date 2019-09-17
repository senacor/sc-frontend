import moment from 'moment';
import 'moment-timezone';

export const FRONTEND_DATE_FORMAT = 'DD.MM.YYYY';
export const FRONTEND_DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm';
export const FRONTEND_LOCALE_DATE_TIME_FORMAT = 'YYYY-MM-DD';

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

export const dateString = () => {
  return moment().format('YYYY-MM-DD');
};

export const dateStringFormat = offset => {
  return moment()
    .add(offset, 'months')
    .format('YYYY-MM-DD');
};

// Converting LocaleDateTime for frontend
export const formatLocaleDateTime = input => {
  if (input) {
    let date = moment.isMoment(input) ? input : moment.utc(input);
    if (date.isValid()) {
      return date.tz('Europe/Berlin').format(FRONTEND_LOCALE_DATE_TIME_FORMAT);
    }
  }
  return null;
};

// Converting date to LocaleDateTime for backend
export const convertLocalDateTime = date => {
  const convertedDate = moment
    .tz(`${date.target.value}`, 'Europe/Berlin')
    .utc()
    .format('YYYY-MM-DDTHH:mm');
  if (convertedDate === 'Invalid date') {
    return null;
  } else return convertedDate;
};

export const isValidDate = date => {
  const isValidDate = moment(
    date,
    FRONTEND_LOCALE_DATE_TIME_FORMAT,
    true
  ).isValid();
  return isValidDate;
};
