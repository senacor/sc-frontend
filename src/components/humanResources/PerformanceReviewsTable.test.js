import React from 'react';
import PerformanceReviewsTable from './PerformanceReviewsTable';
import { descInteger, descString, stableSort } from './PerformanceReviewsTable';
import { createShallow } from '@material-ui/core/test-utils';
import HR_ELEMENTS from './hrElements';
import { Link } from 'react-router-dom';
import PopperSearchMenu from './PopperSearchMenu';
import EmployeeFilter from './EmployeeFilter';
import { translateContent } from '../translate/Translate';
import FILTER_GROUPS from './filterGroups';
import getDisplayName from '../../helper/getDisplayName';
import { formatDateForFrontend } from '../../helper/date';
import DateFilter from './DateFilter';
import ListFilter from './ListFilter';

const rows = [
  {
    numeric: false,
    disablePadding: false,
    label: 'Mitarbeiter',
    sortValue: entry => getDisplayName(entry[HR_ELEMENTS.EMPLOYEE]),
    render: entry => {
      return (
        <Link to={`/prDetail/${entry.prId}`}>
          {getDisplayName(entry[HR_ELEMENTS.EMPLOYEE])}
        </Link>
      );
    },
    filter: (
      <PopperSearchMenu
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.EMPLOYEE}
      >
        <EmployeeFilter />
      </PopperSearchMenu>
    )
  },
  {
    numeric: true,
    disablePadding: true,
    label: 'Fälligkeit',
    sortValue: entry => entry[HR_ELEMENTS.DEADLINE],
    render: entry => formatDateForFrontend(entry[HR_ELEMENTS.DEADLINE]),
    filter: (
      <PopperSearchMenu
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.DEADLINE}
      >
        <DateFilter />
      </PopperSearchMenu>
    )
  },
  {
    numeric: false,
    disablePadding: false,
    label: 'Grund',
    sortValue: entry => translateContent(entry[HR_ELEMENTS.PR_OCCASION]),
    render: entry => translateContent(entry[HR_ELEMENTS.PR_OCCASION]),
    filter: (
      <PopperSearchMenu filterGroup={FILTER_GROUPS.HR} filterBy={'occasion'}>
        <ListFilter
          content={{
            [translateContent('ON_DEMAND')]: 'ON_DEMAND',
            [translateContent('END_PROBATION')]: 'END_PROBATION',
            [translateContent('YEARLY')]: 'YEARLY'
          }}
        />
      </PopperSearchMenu>
    )
  },
  {
    numeric: false,
    disablePadding: false,
    label: 'Projektkst',
    sortValue: entry => entry[HR_ELEMENTS.CST],
    render: entry => entry[HR_ELEMENTS.CST]
  },
  {
    numeric: false,
    disablePadding: true,
    label: 'Dev/Con',
    sortValue: entry =>
      translateContent(`COMPETENCE_${entry[HR_ELEMENTS.COMPETENCE]}`),
    render: entry =>
      translateContent(`COMPETENCE_${entry[HR_ELEMENTS.COMPETENCE]}`),
    filter: (
      <PopperSearchMenu
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.COMPETENCE}
      >
        <ListFilter
          content={{
            [translateContent('COMPETENCE_DEVELOPMENT')]: 'DEVELOPMENT',
            [translateContent('COMPETENCE_CONSULTING')]: 'CONSULTING'
          }}
        />
      </PopperSearchMenu>
    )
  },
  {
    numeric: true,
    disablePadding: true,
    label: 'level',
    sortValue: entry => entry[HR_ELEMENTS.LEVEL],
    render: entry => entry[HR_ELEMENTS.LEVEL],
    filter: (
      <PopperSearchMenu
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.LEVEL}
      >
        <ListFilter
          content={{
            1: 1,
            2: 2
          }}
        />
      </PopperSearchMenu>
    )
  },
  {
    numeric: false,
    disablePadding: true,
    label: 'Vorgesetzte/r',
    sortValue: entry => getDisplayName(entry[HR_ELEMENTS.SUPERVISOR]),
    render: entry => getDisplayName(entry[HR_ELEMENTS.SUPERVISOR]),
    filter: (
      <PopperSearchMenu
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.SUPERVISOR}
      >
        <EmployeeFilter />
      </PopperSearchMenu>
    )
  },
  {
    numeric: false,
    disablePadding: true,
    label: 'Bewerter',
    sortValue: entry => getDisplayName(entry[HR_ELEMENTS.REVIEWER]),
    render: entry => getDisplayName(entry[HR_ELEMENTS.REVIEWER]),
    filter: (
      <PopperSearchMenu
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.REVIEWER}
      >
        <EmployeeFilter />
      </PopperSearchMenu>
    )
  },
  {
    numeric: false,
    disablePadding: true,
    label: 'Bewertung',
    sortValue: entry => entry[HR_ELEMENTS.RESULT],
    render: entry => entry[HR_ELEMENTS.RESULT]
  },
  {
    numeric: false,
    disablePadding: true,
    label: 'MA ausgefüllt',
    sortValue: entry =>
      entry[HR_ELEMENTS.EMPLOYEE_PREPARATION_DONE] ? 'ja' : 'nein',
    render: entry =>
      entry[HR_ELEMENTS.EMPLOYEE_PREPARATION_DONE] ? 'ja' : 'nein',
    filter: (
      <PopperSearchMenu
        filterGroup={FILTER_GROUPS.HR}
        filterBy={'isEmployeePreparationDone'}
      >
        <ListFilter content={{ ja: true, nein: false }} />
      </PopperSearchMenu>
    )
  },
  {
    numeric: false,
    disablePadding: false,
    label: 'Beurteiler ausgefüllt',
    sortValue: entry =>
      entry[HR_ELEMENTS.REVIEWER_PREPARATION_DONE] ? 'ja' : 'nein',
    render: entry =>
      entry[HR_ELEMENTS.REVIEWER_PREPARATION_DONE] ? 'ja' : 'nein',
    filter: (
      <PopperSearchMenu
        filterGroup={FILTER_GROUPS.HR}
        filterBy={'isReviewerPreparationDone'}
      >
        <ListFilter content={{ ja: true, nein: false }} />
      </PopperSearchMenu>
    )
  },
  {
    key: HR_ELEMENTS.APPOINTMENT,
    numeric: false,
    disablePadding: true,
    label: 'Termin',
    sortValue: entry => entry[HR_ELEMENTS.APPOINTMENT],
    render: entry => entry[HR_ELEMENTS.APPOINTMENT]
  },
  {
    numeric: false,
    disablePadding: true,
    label: 'Finaler Status',
    sortValue: entry =>
      entry[HR_ELEMENTS.IN_PROGRESS] ? 'laufend' : 'abgeschlossen',
    render: entry =>
      entry[HR_ELEMENTS.IN_PROGRESS] ? 'laufend' : 'abgeschlossen',
    filter: (
      <PopperSearchMenu
        filterGroup={FILTER_GROUPS.HR}
        filterBy={'isInProgress'}
      >
        <ListFilter content={{ laufend: true, abgeschlossen: false }} />
      </PopperSearchMenu>
    )
  },
  {
    numeric: false,
    disablePadding: true,
    label: 'HR verarbeitet',
    sortValue: entry => (entry[HR_ELEMENTS.HR_PROCESSING_DONE] ? 'ja' : 'nein'),
    render: entry => (entry[HR_ELEMENTS.HR_PROCESSING_DONE] ? 'ja' : 'nein'),
    filter: (
      <PopperSearchMenu
        filterGroup={FILTER_GROUPS.HR}
        filterBy={'isHumanResourceProcessingDone'}
      >
        <ListFilter content={{ ja: true, nein: false }} />
      </PopperSearchMenu>
    )
  }
];

describe('PerformanceReviewsTable component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let prs = [
      getTestdataEntry(1, '2018-01-01', 'DEVELOPMENT', 'ON_DEMAND'),
      getTestdataEntry(2, '2018-02-01', 'CONSULTING', 'ON_DEMAND')
    ];

    let component = shallow(
      <PerformanceReviewsTable data={prs} columnDefinition={rows} orderBy={1} />
    );

    expect(component).toMatchSnapshot();
  });
});

describe('descInteger', () => {
  let prs = [
    getTestdataEntry(1, '2018-01-01', 'DEVELOPMENT', 'ON_DEMAND'),
    getTestdataEntry(2, '2018-01-01', 'CONSULTING', 'ON_DEMAND'),
    getTestdataEntry(3, '2018-02-10', 'CONSULTING', 'ON_DEMAND'),
    getTestdataEntry(4, '2018-01-11', 'CONSULTING', 'ON_DEMAND')
  ];

  it('should return 0: equal', () => {
    const result = descInteger(prs[0], prs[1], entity => entity['deadline']);
    expect(result).toEqual(0);
  });
  it('should return 1: asc', () => {
    const result = descInteger(prs[1], prs[2], entity => entity['deadline']);
    expect(result).toEqual(1);
  });
  it('should return -1: desc', () => {
    const result = descInteger(prs[2], prs[3], entity => entity['deadline']);
    expect(result).toEqual(-1);
  });
});

describe('descString', () => {
  let prs = [
    getTestdataEntry(1, '2018-01-01', 'CONSULTING', 'ON_DEMAND'),
    getTestdataEntry(2, '2018-01-01', 'CONSULTING', 'ON_DEMAND'),
    getTestdataEntry(3, '2018-02-10', 'DEVELOPMENT', 'ON_DEMAND'),
    getTestdataEntry(4, '2018-01-11', 'CONSULTING', 'ON_DEMAND')
  ];

  it('should return 0: equal', () => {
    const result = descString(prs[0], prs[1], entity => entity['competence']);
    expect(result).toBe(0);
  });
  it('should return 1: asc', () => {
    const result = descString(prs[1], prs[2], entity => entity['competence']);
    expect(result).toEqual(1);
  });
  it('should return -1: desc', () => {
    const result = descString(prs[2], prs[3], entity => entity['competence']);
    expect(result).toEqual(-1);
  });
});

describe('stableSort', () => {
  let prs = [
    getTestdataEntry(1, '2018-02-01', 'DEVELOPMENT', 'ON_DEMAND'),
    getTestdataEntry(2, '2018-01-11', 'CONSULTING', 'ON_DEMAND'),
    getTestdataEntry(3, '2018-02-10', 'CONSULTING', 'ON_DEMAND'),
    getTestdataEntry(4, '2019-01-01', 'CONSULTING', 'ON_DEMAND')
  ];

  it('should return a asc array', () => {
    const result = stableSort(prs, (a, b) =>
      descInteger(a, b, entry => entry['deadline'])
    );
    expect(result[0].prId).toEqual(4);
    expect(result[1].prId).toEqual(3);
    expect(result[2].prId).toEqual(1);
    expect(result[3].prId).toEqual(2);
  });

  it('should return a desc array', () => {
    const result = stableSort(
      prs,
      (a, b) => -descInteger(a, b, entry => entry['deadline'])
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
    reviewer: {
      id: 501,
      firstName: 'Volker',
      lastName: 'Vorgesetzter',
      login: 'test.pr.vorgesetzter',
      dateOfLastPr: null,
      correspondingEventResponses: null
    },
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
