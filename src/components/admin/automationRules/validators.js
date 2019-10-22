import { FRONTEND_LOCALE_DATE_TIME_FORMAT } from '../../../helper/date';
import moment from 'moment';

export const validProcess = obj => {
  if (obj.regulationCriterion === 'ENTRY_DATE' && obj.chronology === 'BEFORE') {
    return false;
  } else return true;
};

export const validPriority = (obj, rules) => {
  if (
    obj.regulationCriterion === rules[0].regulationCriterion &&
    obj.priority === rules[0].priority
  ) {
    return false;
  } else return true;
};

export const validChronology = (obj, rules) => {
  if (
    obj.chronology === rules[0].chronology &&
    obj.regulationCriterion === rules[0].regulationCriterion
  ) {
    return false;
  } else return true;
};

export const dateIsBeforeTodayOrEqual = date => {
  const formattedDate = Date.parse(date, FRONTEND_LOCALE_DATE_TIME_FORMAT);
  const today = Date.parse(moment().format(FRONTEND_LOCALE_DATE_TIME_FORMAT));

  if (formattedDate <= today) {
    return true;
  } else if (formattedDate > today) {
    return false;
  }
};

export const timeIsPositive = value => {
  if (value > 0) {
    return true;
  } else return false;
};

export const inputsEmpty = obj => {
  const newObj = { ...obj };
  delete newObj.expirationDate;
  for (let key in newObj) {
    if (!newObj[key]) {
      return true;
    }
  }
  return false;
};
