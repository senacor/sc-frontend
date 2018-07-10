import React from 'react';
import EventList from './EventList';
import { createShallow } from '@material-ui/core/test-utils';

describe('Dashboard component', () => {
  let shallow = createShallow({ dive: true });

  const events = {
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
  };

  it('should match snapshot', () => {
    let cut = shallow(<EventList events={Object.values(events)} />);

    expect(cut).toMatchSnapshot();
  });
});
