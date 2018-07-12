import { default as fetch } from '../helper/customFetch';
import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_RESPONSE,
  ERROR_RESPONSE
} from '../helper/dispatchTypes';

export const appointmentsSearch = (employeeIds, day) => async dispatch => {
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
