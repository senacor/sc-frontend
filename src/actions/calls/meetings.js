import { default as fetch } from '../../helper/customFetch';
import momentTimeZone from 'moment-timezone';
import moment from 'moment';

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
    message: 'Es ist ein technischer Fehler aufgetreten.=='
  });
};

export const addMeeting = async (meeting_details, setMeeting, errorContext) => {
  if (!validateDateTimeInput(meeting_details.start, meeting_details.end)) {
    errorContext.setErrors({
      hasErrors: true,
      message: 'Es wurde Fehler aufgetreten: 400'
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
          requiredAttendees: meeting_details.requiredAttendees,
          optionalAttendees: meeting_details.optionalAttendees
        })
      }
    );

    if (response.ok) {
      const meeting = await response.json();
      setMeeting(meeting);
      return;
      //TODO: continue here, send request to change status
      // return addPrStatus(meeting_details.prById, prStatusEnum.REQUESTED_DATE)(
      //   dispatch
      // );
    } else if (response.status === 404) {
      setMeeting(null);
    }
    errorContext.setErrors({
      hasErrors: true,
      message: 'Es wurde Fehler aufgetreten: ' + response.status
    });
  }
};

export const appointmentsSearch = async (
  employeeIds,
  inputDay,
  errorContext,
  setAppointmentResults
) => {
  let day = await moment.utc(inputDay).format('YYYY-MM-DD');

  // Invalid format of date
  if (!moment(day, 'YYYY-MM-DD', true).isValid()) {
    errorContext.setValue({
      hasErrors: true,
      message: 'Invalid date.'
    });
  }

  // TODO: waiting for backend
  const response = await fetch(
    `${
      process.env.REACT_APP_API
    }/api/v1/employees/appointments?login=${employeeIds}&date=${day}`
  );

  // MOCKING response - put in <YOUR LOGIN> your credentials

  // const response = {
  //   ok: true,
  //   json: () => {
  //     return {
  //       <YOUR LOGIN>: [
  //         {
  //           appointmentStartTime: '2018-06-12T22:00Z[UTC]',
  //           appointmentEndTime: '2018-06-13T22:00Z[UTC]',
  //           appointmentStatus: 'Free'
  //         }
  //       ]
  //     };
  //   }
  // };
  if (response.ok) {
    const data = await response.json();
    const appointments = await data.content;
    setAppointmentResults(appointments);
    return appointments;
  } else {
    errorContext.setValue({
      hasErrors: true,
      message: 'Es ist ein technischer Fehler aufgetreten.'
    });
  }
};
