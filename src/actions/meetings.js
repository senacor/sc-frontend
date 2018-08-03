import { default as fetch } from '../helper/customFetch';
import moment from 'moment';

import * as dispatchTypes from '../helper/dispatchTypes';

export const addMeeting = meeting_details => async dispatch => {
  if (!moment(meeting_details.start, 'YYYY-MM-DDTHH:mmZ', true).isValid()) {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: 400
    });
  }

  if (!moment(meeting_details.end, 'YYYY-MM-DDTHH:mmZ', true).isValid()) {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: 400
    });
  }
  dispatch({
    type: dispatchTypes.ADD_MEETING_REQUEST
  });

  const response = await fetch(`${process.env.REACT_APP_API}/api/v1/meetings`, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({
      prId: meeting_details.prId,
      start: meeting_details.start,
      end: meeting_details.end,
      location: meeting_details.location,
      requiredAttendeeIds: meeting_details.requiredAttendeeIds,
      optionalAttendeeIds: meeting_details.optionalAttendeeIds
    })
  });

  if (response.ok) {
    const meeting = await response.json();
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
};

export const fetchMeeting = prId => async dispatch => {
  dispatch({
    type: dispatchTypes.FETCH_MEETING_REQUEST
  });

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v1/meetings?prId=${prId}`
  );
  if (response.ok) {
    const meeting = await response.json();
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
