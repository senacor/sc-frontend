import { events } from './events';
import { FETCHED_EVENTS } from '../helper/dispatchTypes';

describe('event reducer', () => {
  it('should set events on FETCHED_EVENTS', () => {
    const stateBefore = [];
    const action = {
      type: FETCHED_EVENTS,
      events: [
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

    expect(stateAfter).toEqual({
      '1': {
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
      '2': {
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
      '3': {
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
      '4': {
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
      '5': {
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
    });
  });
});
