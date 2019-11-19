import { default as fetch } from '../helper/customFetch';
import momentTimeZone from 'moment-timezone';
import moment from 'moment/moment';

let validateDateTimeInput = (start, end) => {
  if (!momentTimeZone(start, 'YYYY-MM-DDTHH:mmZ', true).isValid()) {
    return false;
  }
  if (!momentTimeZone(end, 'YYYY-MM-DDTHH:mmZ', true).isValid()) {
    return false;
  }
  return !momentTimeZone(end).isBefore(momentTimeZone(start));
};

export const fetchMeeting = async (sc, setMeeting, error) => {
  let id = sc ? sc.id : 0;

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/sc/${id}/meetings`
  );

  if (response.ok) {
    const meeting = await response.json();
    setMeeting(meeting);
    //TODO: update sc.meeting as well: sc.meeting = meeting
    return;
  }

  if (response.status === 404) {
    return setMeeting(null);
  }

  error.showGeneral();
};

export const addMeeting = async (meeting, setMeeting, error) => {
  if (!validateDateTimeInput(meeting.start, meeting.end)) {
    error.showGeneral();
    return;
  }

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/sc/${meeting.scById.id}/meetings`,
    {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        start: meeting.start,
        end: meeting.end,
        location: meeting.location,
        room: meeting.room,
        requiredAttendees: meeting.requiredAttendees,
        optionalAttendees: meeting.optionalAttendees
      })
    }
  );

  if (response.ok) {
    const meeting = await response.json();
    setMeeting(meeting);
    return;
    //TODO: sc status was updated, REQUEST_DATE added... Reload?
  }

  if (response.status === 404) {
    setMeeting(null);
  }
  error.showGeneral();
};

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
    }/api/v1/appointments?login=${employeeIds}&date=${day}&room=${room}`
  );
  if (response.ok) {
    const appointments = await response.json();
    setAppointmentResults(appointments);
    return appointments;
  } else {
    error.showGeneral();
  }
};
