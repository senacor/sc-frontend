import { prEventsReducer } from './events';
import { FETCHED_EVENTS } from '../helper/dispatchTypes';

describe('event reducer', () => {
  it('should set events on FETCHED_EVENTS', () => {
    const stateBefore = [];
    const action = {
      type: FETCHED_EVENTS,
      response: {
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
              eventableEntityId: 8,
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
              eventableEntityId: 9,
              eventableEntityType: 'pr',
              event: {
                type: 'PR_RELEASED_REVIEWER',
                text: ' hat seine Bewertung abgegeben.',
                employee: 'Volker Vorgesetzter'
              },
              datetime: '2017-05-04T11:28:56.816'
            },
            {
              id: 4,
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
              id: 5,
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
              id: 6,
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
      }
    };

    const stateAfter = prEventsReducer(stateBefore, action);

    expect(stateAfter).toEqual([
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
        eventableEntityId: 8,
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
        eventableEntityId: 9,
        eventableEntityType: 'pr',
        event: {
          type: 'PR_RELEASED_REVIEWER',
          text: ' hat seine Bewertung abgegeben.',
          employee: 'Volker Vorgesetzter'
        },
        datetime: '2017-05-04T11:28:56.816'
      },
      {
        id: 4,
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
        id: 5,
        employeeId: 502,
        eventableEntityId: 9,
        eventableEntityType: 'pr',
        event: {
          type: 'PR_RELEASED_EMPLOYEE',
          text: ' hat ein PR freigegeben.',
          employee: 'Martin Mitarbeiter'
        },
        datetime: '2017-05-04T11:28:56.816'
      }
    ]);
  });

  // it('should return empty array if no user was found', () => {
  //   const stateBefore = [];
  //   const action = {
  //     type: FETCHED_EVENTS,
  //     cstMembers: {
  //       link: {
  //         href: 'something'
  //       }
  //     }
  //   };
  //
  //   const stateAfter = cstMembers(stateBefore, action);
  //
  //   expect(stateAfter).toEqual([]);
  // });
});
