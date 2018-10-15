import React from 'react';
import { StyledComponent as PerformanceReviewsTable } from './PerformanceReviewsTable';
import {
  getDisplayName,
  descInteger,
  descString,
  stableSort
} from './PerformanceReviewsTable';
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

describe('getDisplayName', () => {
  let employee = {
    firstName: 'Michaela',
    lastName: 'Mitarbeiterin'
  };

  it('should return the full Name', () => {
    let fullName = getDisplayName(employee);
    expect(fullName).toEqual('Michaela Mitarbeiterin');
  });
});

describe('descInteger', () => {
  let prs = [
    getTestdataEntry(1, '2018-01-01', 'DEVELOPMENT', 'ON_DEMAND'),
    getTestdataEntry(2, '2018-01-01', 'CONSULTANT', 'ON_DEMAND'),
    getTestdataEntry(3, '2018-02-10', 'CONSULTANT', 'ON_DEMAND'),
    getTestdataEntry(4, '2018-01-11', 'CONSULTANT', 'ON_DEMAND')
  ];

  it('should return 0: equal', () => {
    const result = descInteger(prs[0], prs[1], 'deadline', entity => entity);
    expect(result).toEqual(0);
  });
  it('should return 1: asc', () => {
    const result = descInteger(prs[1], prs[2], 'deadline', entity => entity);
    expect(result).toEqual(1);
  });
  it('should return -1: desc', () => {
    const result = descInteger(prs[2], prs[3], 'deadline', entity => entity);
    expect(result).toEqual(-1);
  });
});

describe('descString', () => {
  let prs = [
    getTestdataEntry(1, '2018-01-01', 'CONSULTANT', 'ON_DEMAND'),
    getTestdataEntry(2, '2018-01-01', 'CONSULTANT', 'ON_DEMAND'),
    getTestdataEntry(3, '2018-02-10', 'DEVELOPMENT', 'ON_DEMAND'),
    getTestdataEntry(4, '2018-01-11', 'CONSULTANT', 'ON_DEMAND')
  ];

  it('should return 0: equal', () => {
    const result = descString(prs[0], prs[1], 'competence', entity => entity);
    expect(result).toBe(0);
  });
  it('should return 1: asc', () => {
    const result = descString(prs[1], prs[2], 'competence', entity => entity);
    expect(result).toEqual(1);
  });
  it('should return -1: desc', () => {
    const result = descString(prs[2], prs[3], 'competence', entity => entity);
    expect(result).toEqual(-1);
  });
});

describe('stableSort', () => {
  let prs = [
    getTestdataEntry(1, '2018-02-01', 'DEVELOPMENT', 'ON_DEMAND'),
    getTestdataEntry(2, '2018-01-11', 'CONSULTANT', 'ON_DEMAND'),
    getTestdataEntry(3, '2018-02-10', 'CONSULTANT', 'ON_DEMAND'),
    getTestdataEntry(4, '2019-01-01', 'CONSULTANT', 'ON_DEMAND')
  ];

  it('should return a asc array', () => {
    const result = stableSort(prs, (a, b) =>
      descInteger(a, b, 'deadline', variable => variable)
    );
    expect(result[0].prId).toEqual(4);
    expect(result[1].prId).toEqual(3);
    expect(result[2].prId).toEqual(1);
    expect(result[3].prId).toEqual(2);
  });

  it('should return a desc array', () => {
    const result = stableSort(
      prs,
      (a, b) => -descInteger(a, b, 'deadline', variable => variable)
    );
    expect(result[0].prId).toEqual(2);
    expect(result[1].prId).toEqual(1);
    expect(result[2].prId).toEqual(3);
    expect(result[3].prId).toEqual(4);
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
