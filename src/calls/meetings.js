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

export const fetchMeeting = async (pr, setMeeting, errorContext) => {
  let id = pr ? pr.id : 0;

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/prs/${id}/meetings`
  );

  if (response.ok) {
    const meeting = await response.json();
    setMeeting(meeting);
    //TODO: update pr.meeting as well: pr.meeting = meeting
    return;
  }

  if (response.status === 404) {
    return setMeeting(null);
  }

  errorContext.setValue({
    hasErrors: true,
    messageId: 'message.error'
  });
};

export const addMeeting = async (meeting_details, setMeeting, errorContext) => {
  if (!validateDateTimeInput(meeting_details.start, meeting_details.end)) {
    errorContext.setErrors({
      hasErrors: true,
      messageId: 'message.error'
    });
  } else {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/prs/${
        meeting_details.prById.id
      }/meetings`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({
          start: meeting_details.start,
          end: meeting_details.end,
          location: meeting_details.location,
          room: meeting_details.room,
          requiredAttendees: meeting_details.requiredAttendees,
          optionalAttendees: meeting_details.optionalAttendees
        })
      }
    );

    if (response.ok) {
      const meeting = await response.json();
      setMeeting(meeting);
      return;
      //TODO: pr status was updated, REQUEST_DATE added... Reload?
    }

    if (response.status === 404) {
      setMeeting(null);
    }
    errorContext.setErrors({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const appointmentsSearch = async (
  employeeIds,
  inputDay,
  room,
  errorContext,
  setAppointmentResults
) => {
  let day = moment.utc(inputDay).format('YYYY-MM-DD');

  // Invalid format of date
  if (!moment(day, 'YYYY-MM-DD', true).isValid()) {
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }

  const response = await fetch(
    `${
      process.env.REACT_APP_API
    }/api/v3/appointments?login=${employeeIds}&date=${day}&room=${room}`
  );
  if (response.ok) {
    const appointments = await response.json();
    setAppointmentResults(appointments);
    return appointments;
  } else {
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};
