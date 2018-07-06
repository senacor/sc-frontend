import { default as fetch } from '../helper/customFetch';
import { FETCHED_EVENTS } from '../helper/dispatchTypes';

export const getPrEvents = () => async dispatch => {
  // const response = await fetch(
  //   `${process.env.REACT_APP_API}/api/v1/events/pr`,
  //   {
  //     mode: 'cors'
  //   }
  // );
  //
  // if (response.ok) {
  //   const prEvents = await response.json();
  //
  //   dispatch({
  //     type: FETCHED_EVENTS,
  //     prEvents
  //   });
  // } else {
  let prEventsActions = {
    _embedded: {
      eventableResponseList: [
        {
          id: 1,
          employeeId: 501,
          eventableEntityId: 8,
          eventableEntityType: 'pr',
          event: {
            type: 'PR_CREATED_EMPLOYEE',
            text: ' hat ein PR beantragt.',
            employee: 'Michaela Mitarbeiterin'
          },
          datetime: '2017-05-04T11:28:56.816'
        },
        {
          id: 2,
          employeeId: 502,
          eventableEntityId: 9,
          eventableEntityType: 'pr',
          event: {
            type: 'PR_RELEASED_EMPLOYEE',
            text: ' hat ein PR freigegeben.',
            employee: 'Martin Mitarbeiter'
          },
          datetime: '2017-05-04T11:28:56.816'
        },
        {
          id: 3,
          employeeId: 500,
          eventableEntityId: 8,
          eventableEntityType: 'pr',
          event: {
            type: 'PR_RELEASED_REVIEWER',
            text: ' hat seine Bewertung abgegeben.',
            employee: 'Volker Vorgesetzter'
          },
          datetime: '2017-05-04T11:28:56.816'
        }
      ]
    }
  };

  dispatch({
    type: FETCHED_EVENTS,
    response: prEventsActions
  });
  //  }
};
