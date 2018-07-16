import { default as fetch } from '../helper/customFetch';
import moment from 'moment';

import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_RESPONSE,
  ERROR_RESPONSE,
  CHANGE_DATE_FOR_APPOINTMENT
} from '../helper/dispatchTypes';

export const appointmentsSearch = (employeeIds, day) => async dispatch => {
  //argument true makes sure that Moment doesn't try to parse the input if it doesn't _exactly_
  //conform the format provided:
  if (!moment(day, 'YYYY-MM-DD', true).isValid()) {
    dispatch({
      type: ERROR_RESPONSE,
      httpCode: 400
    });
  }

  dispatch({
    type: FETCH_APPOINTMENTS_REQUEST
  });

  const response = await fetch(
    `${
      process.env.REACT_APP_API
    }/api/v1/appointments?employees=${employeeIds}&date=${day}`
  );
  if (response.ok) {
    const data = await response.json();
    const appointments = data._embedded
      ? data._embedded.exchangeOutlookResponseList
      : [];
    dispatch({
      type: FETCH_APPOINTMENTS_RESPONSE,
      appointments
    });
  } else {
    dispatch({
      type: ERROR_RESPONSE,
      httpCode: response.status
    });
  }
};

export const changeDate = date => dispatch => {
  dispatch({
    type: CHANGE_DATE_FOR_APPOINTMENT,
    changedDate: date
  });
};
