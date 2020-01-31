import moment from 'moment';
import 'moment-timezone';

export const FRONTEND_DATE_FORMAT = 'DD.MM.YYYY';
export const FRONTEND_LOCALE_DATE_TIME_FORMAT = 'YYYY-MM-DD';
export const EXCEL_NAME_DATE_FORMAT = 'YYYYMMDD';

export const formatDateForFrontend = input => {
  if (input) {
    let date = moment.isMoment(input) ? input : moment(input);
    if (date.isValid()) {
      return date.format(FRONTEND_DATE_FORMAT);
    }
  }
  return null;
};

// Converting LocaleDateTime for frontend
export const formatLocaleDateTime = (input, format) => {
  if (input) {
    let modifiedInput = [...input];
    modifiedInput[1] = modifiedInput[1] - 1;
    let date = moment.isMoment(modifiedInput)
      ? modifiedInput
      : moment.utc(modifiedInput);
    if (date.isValid()) {
      return date.tz('Europe/Berlin').format(format);
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

export const getReadableDate = date => {
  const minutes = date[4] > 9 ? date[4].toString() : `0${date[4]}`;
  return `${date[2]}.${date[1]}.${date[0]}, ${date[3]}:${minutes}`;
};

export const dateIsAfterTodayOrEqual = date => {
  const formattedDate = Date.parse(
    formatLocaleDateTime(date, FRONTEND_LOCALE_DATE_TIME_FORMAT)
  );
  const today = Date.parse(moment().format(FRONTEND_LOCALE_DATE_TIME_FORMAT));

  if (!date || formattedDate < today) {
    return false;
  } else if (formattedDate >= today) {
    return true;
  }
};
