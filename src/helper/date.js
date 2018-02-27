import moment from 'moment';

export const FRONTEND_DATE_FORMAT = 'DD.MM.YYYY';

export const formatMomentForFrontend = momentObject => {
  if (momentObject) {
    return moment(momentObject).format(FRONTEND_DATE_FORMAT);
  }
  return null;
};
