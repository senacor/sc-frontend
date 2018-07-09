import { events } from './events';
import { FETCHED_EVENTS } from '../helper/dispatchTypes';

describe('event reducer', () => {
  it('should set events on FETCHED_EVENTS', () => {
    const stateBefore = [];
    const action = {
      type: FETCHED_EVENTS,
      prEvents: [
        {
          id: 1,
          employee: {
            id: 3,
            firstName: 'Michaela',
            lastName: 'Mitarbeiterin',
            dateOfLastPr: '2019-08-30'
          },
          eventableEntityType: 'pr',
          eventableEntityId: 1,
          eventType: 'EMPLOYEE_RELEASED_PR',
          createdAt: '2018-07-09T14:54:25.675+0000',
          _links: {
            self: {
              href: 'http://localhost:8010/api/v1/events/1'
            }
          }
        },
        {
          id: 2,
          employee: {
            id: 3,
            firstName: 'Michaela',
            lastName: 'Mitarbeiterin',
            dateOfLastPr: '2019-08-30'
          },
          eventableEntityType: 'pr',
          eventableEntityId: 1,
          eventType: 'EMPLOYEE_RELEASED_PR',
          createdAt: '2018-07-09T14:54:25.675+0000',
          _links: {
            self: {
              href: 'http://localhost:8010/api/v1/events/1'
            }
          }
        },
        {
          id: 3,
          employee: {
            id: 3,
            firstName: 'Michaela',
            lastName: 'Mitarbeiterin',
            dateOfLastPr: '2019-08-30'
          },
          eventableEntityType: 'pr',
          eventableEntityId: 1,
          eventType: 'EMPLOYEE_RELEASED_PR',
          createdAt: '2018-07-09T14:54:25.675+0000',
          _links: {
            self: {
              href: 'http://localhost:8010/api/v1/events/1'
            }
          }
        },
        {
          id: 4,
          employee: {
            id: 3,
            firstName: 'Michaela',
            lastName: 'Mitarbeiterin',
            dateOfLastPr: '2019-08-30'
          },
          eventableEntityType: 'pr',
          eventableEntityId: 1,
          eventType: 'EMPLOYEE_RELEASED_PR',
          createdAt: '2018-07-09T14:54:25.675+0000',
          _links: {
            self: {
              href: 'http://localhost:8010/api/v1/events/1'
            }
          }
        },
        {
          id: 5,
          employee: {
            id: 3,
            firstName: 'Michaela',
            lastName: 'Mitarbeiterin',
            dateOfLastPr: '2019-08-30'
          },
          eventableEntityType: 'pr',
          eventableEntityId: 1,
          eventType: 'EMPLOYEE_RELEASED_PR',
          createdAt: '2018-07-09T14:54:25.675+0000',
          _links: {
            self: {
              href: 'http://localhost:8010/api/v1/events/1'
            }
          }
        },
        {
          id: 6,
          employee: {
            id: 3,
            firstName: 'Michaela',
            lastName: 'Mitarbeiterin',
            dateOfLastPr: '2019-08-30'
          },
          eventableEntityType: 'pr',
          eventableEntityId: 1,
          eventType: 'EMPLOYEE_RELEASED_PR',
          createdAt: '2018-07-09T14:54:25.675+0000',
          _links: {
            self: {
              href: 'http://localhost:8010/api/v1/events/1'
            }
          }
        }
      ]
    };

    const stateAfter = events(stateBefore, action);

    expect(stateAfter).toEqual([
      {
        id: 1,
        employee: {
          id: 3,
          firstName: 'Michaela',
          lastName: 'Mitarbeiterin',
          dateOfLastPr: '2019-08-30'
        },
        eventableEntityType: 'pr',
        eventableEntityId: 1,
        eventType: 'EMPLOYEE_RELEASED_PR',
        createdAt: '2018-07-09T14:54:25.675+0000',
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/events/1'
          }
        }
      },
      {
        id: 2,
        employee: {
          id: 3,
          firstName: 'Michaela',
          lastName: 'Mitarbeiterin',
          dateOfLastPr: '2019-08-30'
        },
        eventableEntityType: 'pr',
        eventableEntityId: 1,
        eventType: 'EMPLOYEE_RELEASED_PR',
        createdAt: '2018-07-09T14:54:25.675+0000',
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/events/1'
          }
        }
      },
      {
        id: 3,
        employee: {
          id: 3,
          firstName: 'Michaela',
          lastName: 'Mitarbeiterin',
          dateOfLastPr: '2019-08-30'
        },
        eventableEntityType: 'pr',
        eventableEntityId: 1,
        eventType: 'EMPLOYEE_RELEASED_PR',
        createdAt: '2018-07-09T14:54:25.675+0000',
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/events/1'
          }
        }
      },
      {
        id: 4,
        employee: {
          id: 3,
          firstName: 'Michaela',
          lastName: 'Mitarbeiterin',
          dateOfLastPr: '2019-08-30'
        },
        eventableEntityType: 'pr',
        eventableEntityId: 1,
        eventType: 'EMPLOYEE_RELEASED_PR',
        createdAt: '2018-07-09T14:54:25.675+0000',
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/events/1'
          }
        }
      },
      {
        id: 5,
        employee: {
          id: 3,
          firstName: 'Michaela',
          lastName: 'Mitarbeiterin',
          dateOfLastPr: '2019-08-30'
        },
        eventableEntityType: 'pr',
        eventableEntityId: 1,
        eventType: 'EMPLOYEE_RELEASED_PR',
        createdAt: '2018-07-09T14:54:25.675+0000',
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/events/1'
          }
        }
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
