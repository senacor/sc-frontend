import { default as fetch } from '../helper/customFetch';
import moment from 'moment/moment';

export const appointmentsSearch = async (
  employeeIds,
  inputDay,
  room,
  error,
  setAppointmentResults
) => {
  let day = moment.utc(inputDay).format('YYYY-MM-DD');

  // Invalid format of date
  if (!moment(day, 'YYYY-MM-DD', true).isValid()) {
    error.showGeneral();
  }

  const response = await fetch(
    `${
      process.env.REACT_APP_API
    }/api/v1/scorecards/appointments?login=${employeeIds}&date=${day}&room=${room}`
  );
  if (response.ok) {
    const appointments = await response.json();
    setAppointmentResults(appointments);
    return appointments;
  } else {
    error.showGeneral();
  }
};
