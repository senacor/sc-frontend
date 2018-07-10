import { default as fetch } from '../helper/customFetch';
import { FETCHED_EVENTS } from '../helper/dispatchTypes';
import * as dispatchTypes from '../helper/dispatchTypes';

export const getEvents = () => async dispatch => {
  const response = await fetch(`${process.env.REACT_APP_API}/api/v1/events`, {
    mode: 'cors'
  });

  if (response.ok) {
    const data = await response.json();
    const events = data._embedded ? data._embedded.eventResponseList : [];

    dispatch({
      type: FETCHED_EVENTS,
      events
    });
  } else {
    dispatch({
      type: dispatchTypes.ERROR_RESPONSE,
      httpCode: response.status
    });
  }
};
