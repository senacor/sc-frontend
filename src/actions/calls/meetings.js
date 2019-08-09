import { default as fetch } from '../../helper/customFetch';
import moment from 'moment-timezone';

let validateDateTimeInput = (start, end) => {
  if (!moment(start, 'YYYY-MM-DDTHH:mmZ', true).isValid()) {
    return false;
  }
  if (!moment(end, 'YYYY-MM-DDTHH:mmZ', true).isValid()) {
    return false;
  }
  return !moment(end).isBefore(moment(start));
};

export const fetchMeeting = async (pr, setMeeting, errorContext) => {
  let id = pr ? pr.id : 0;

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/prs/${id}/meetings`
  );

  if (response.ok) {
    const meeting = await response.json();
    setMeeting(meeting);
    return;
  }

  if (response.status === 404) {
    return setMeeting(null);
  }

  errorContext.setErrors({
    hasErrors: true,
    message: 'Es ist ein technischer Fehler aufgetreten.=='
  });
};

//TODO: not used yet, continue here
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
