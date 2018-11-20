import { default as fetch } from '../helper/customFetch';
import moment from 'moment-timezone';

import * as dispatchTypes from '../helper/dispatchTypes';

import { addPrStatus } from './status';
import { prStatusEnum } from '../helper/prStatus';
import { dateFixed } from '../service/requiredAttendeesCounterService';

let validateDateTimeInput = (start, end) => {
  if (!moment(start, 'YYYY-MM-DDTHH:mmZ', true).isValid()) {
    return false;
  }
  if (!moment(end, 'YYYY-MM-DDTHH:mmZ', true).isValid()) {
    return false;
  }
  return !moment(end).isBefore(moment(start));
};

export const addMeeting = meeting_details => async dispatch => {
  if (!validateDateTimeInput(meeting_details.start, meeting_details.end)) {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: 400
    });
  } else {
    dispatch({
      type: dispatchTypes.ADD_MEETING_REQUEST
    });

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/prs/${
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

    let meeting = null;

    if (response.ok) {
      meeting = await response.json();
      dispatch({
        type: dispatchTypes.ADD_MEETING_RESPONSE,
        meeting
      });
      return addPrStatus(meeting_details.prById, prStatusEnum.REQUESTED_DATE)(
        dispatch
      );
    } else if (response.status === 404) {
      dispatch({
        type: dispatchTypes.ADD_MEETING_RESPONSE,
        meeting
      });
    } else {
      dispatch({
        type: dispatchTypes.ERROR_RESPONSE,
        httpCode: response.status
      });
    }
  }
};

export const fetchMeeting = pr => async dispatch => {
  dispatch({
    type: dispatchTypes.FETCH_MEETING_REQUEST
  });

  let id = pr ? pr.id : 0;

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/prs/${id}/meetings`
  );

  let meeting = null;

  if (response.ok) {
    meeting = await response.json();
    dispatch({
      type: dispatchTypes.FETCH_MEETING_RESPONSE,
      meeting
    });

    if (dateFixed(meeting.requiredAttendees, pr)) {
      return addPrStatus(pr, prStatusEnum.FIXED_DATE)(dispatch);
    }
  } else if (response.status === 404) {
    dispatch({
      type: dispatchTypes.FETCH_MEETING_RESPONSE,
      meeting
    });
  } else {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: response.status
    });
  }
};
