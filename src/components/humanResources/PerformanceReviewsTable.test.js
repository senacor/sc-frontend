import React from 'react';
import { StyledComponent as PerformanceReviewsTable } from './PerformanceReviewsTable';
import { createShallow } from '@material-ui/core/test-utils';

describe('PerformanceReviewsTable component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let prs = [
      getTestdataEntry(1, '2018-01-01', 'DEVELOPMENT', 'ON_DEMAND'),
      getTestdataEntry(2, '2018-02-01', 'CONSULTANT', 'ON_DEMAND')
    ];

    let component = shallow(<PerformanceReviewsTable prs={prs} />);

    expect(component).toMatchSnapshot();
  });
});

function getTestdataEntry(id, deadline, competence, occasion) {
  return {
    prId: id,
    employee: {
      id: 502,
      firstName: 'Michaela',
      lastName: 'Mitarbeiterin',
      login: 'test.pr.mitarbeiter1',
      dateOfLastPr: null,
      correspondingEventResponses: null
    },
    deadline: deadline,
    prOccasion: occasion,
    projectCst: null,
    competence: competence,
    level: 1,
    supervisor: {
      id: 501,
      firstName: 'Volker',
      lastName: 'Vorgesetzter',
      login: 'test.pr.vorgesetzter',
      dateOfLastPr: null,
      correspondingEventResponses: null
    },
    reviewer: null,
    appointment: null,
    employeePreparationDone: true,
    reviewerPreparationDone: false,
    humanResourceProcessingDone: false,
    inProgress: false,
    _links: {
      self: {
        href: 'http://localhost:8010/api/v1/prs/4'
      }
    }
  };
}
