import { default as fetch } from '../helper/customFetch';
import moment from 'moment';

import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_RESPONSE,
  ERROR_RESPONSE,
  CHANGE_DATE_FOR_APPOINTMENT
} from '../helper/dispatchTypes';

export const appointmentsSearch = (employeeIds, inputDay) => async dispatch => {
  let day = moment.utc(inputDay).format('YYYY-MM-DD');
  //argument true makes sure that Moment doesn't try to parse the input if it doesn't _exactly_
  //conform the format provided:
  if (!moment(day, 'YYYY-MM-DD', true).isValid()) {
    dispatch({
      type: ERROR_RESPONSE,
      httpCode: 400
    });
  } else {
    dispatch({
      type: FETCH_APPOINTMENTS_REQUEST
    });

    const response = await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/employees/appointments?login=${employeeIds}&date=${day}`
    );
    if (response.ok) {
      const data = await response.json();
      const appointments = data.content;
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
  }
};

export const changeDate = date => dispatch => {
  dispatch({
    type: CHANGE_DATE_FOR_APPOINTMENT,
    changedDate: date
  });
};
