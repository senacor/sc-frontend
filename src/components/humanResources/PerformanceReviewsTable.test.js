import React from 'react';
import { StyledComponent as PerformanceReviewsTable } from './PerformanceReviewsTable';
import {
  getDisplayName,
  descInteger,
  descString,
  stableSort
} from './PerformanceReviewsTable';
import { createShallow } from '@material-ui/core/test-utils';
import HR_ELEMENTS from './hrElements';
import { Link } from 'react-router-dom';
import ExcelLikeSearchMenue from './ExcelLikeSearchMenue';
import EmployeeFilter from './EmployeeFilter';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import TextField from '@material-ui/core/TextField/TextField';
import { translateContent } from '../translate/Translate';
import Translate from '../translate/Translate';

const rows = [
  {
    id: HR_ELEMENTS.EMPLOYEE,
    numeric: false,
    disablePadding: false,
    label: 'Mitarbeiter',
    mapper: variable => getDisplayName(variable),
    show: entry => {
      return (
        <Link to={`/prDetail/${entry.prId}`}>
          {getDisplayName(entry[HR_ELEMENTS.EMPLOYEE])}
        </Link>
      );
    },
    filter: (
      <ExcelLikeSearchMenue
        content={<EmployeeFilter filterGroup={'hr'} filterBy={'employee'} />}
      />
    )
  },
  {
    id: HR_ELEMENTS.DEADLINE,
    numeric: true,
    disablePadding: true,
    label: 'Fälligkeit',
    mapper: variable => variable,
    show: entry => entry[HR_ELEMENTS.DEADLINE],
    filter: (
      <ExcelLikeSearchMenue
        content={
          <List>
            <ListItem>
              <TextField
                id="date"
                label="Fälligkeit von"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                id="date"
                label="Fälligkeit bis"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </ListItem>
          </List>
        }
      />
    )
  },
  {
    id: HR_ELEMENTS.PR_OCCASION,
    numeric: false,
    disablePadding: false,
    label: 'Grund',
    mapper: entry => translateContent(entry),
    show: entry => <Translate content={entry[HR_ELEMENTS.PR_OCCASION]} />
  },
  {
    id: HR_ELEMENTS.CST,
    numeric: false,
    disablePadding: false,
    label: 'Projektkst',
    mapper: variable => variable,
    show: entry => entry[HR_ELEMENTS.CST]
  },
  {
    id: HR_ELEMENTS.COMPETENCE,
    numeric: false,
    disablePadding: true,
    label: 'Dev/Con',
    mapper: variable => translateContent(`COMPETENCE_${variable}`),
    show: entry => (
      <Translate content={`COMPETENCE_${entry[HR_ELEMENTS.COMPETENCE]}`} />
    )
  },
  {
    id: HR_ELEMENTS.LEVEL,
    numeric: false,
    disablePadding: true,
    label: 'level',
    mapper: variable => variable,
    show: entry => entry[HR_ELEMENTS.LEVEL]
  },
  {
    id: HR_ELEMENTS.SUPERVISOR,
    numeric: false,
    disablePadding: true,
    label: 'Vorgesetzte/r',
    mapper: variable => getDisplayName(variable),
    show: entry => getDisplayName(entry[HR_ELEMENTS.SUPERVISOR]),
    filter: (
      <ExcelLikeSearchMenue
        content={<EmployeeFilter filterGroup={'hr'} filterBy={'supervisor'} />}
      />
    )
  },
  {
    id: HR_ELEMENTS.REVIEWER,
    numeric: false,
    disablePadding: true,
    label: 'Bewerter',
    mapper: variable => getDisplayName(variable),
    show: entry => getDisplayName(entry[HR_ELEMENTS.REVIEWER]),
    filter: (
      <ExcelLikeSearchMenue
        content={<EmployeeFilter filterGroup={'hr'} filterBy={'reviewer'} />}
      />
    )
  },
  {
    id: HR_ELEMENTS.RESULT,
    numeric: false,
    disablePadding: true,
    label: 'Bewertung',
    mapper: variable => variable,
    show: entry => entry[HR_ELEMENTS.RESULT]
  },
  {
    id: HR_ELEMENTS.EMPLOYEE_PREPARATION_DONE,
    numeric: false,
    disablePadding: true,
    label: 'MA ausgefüllt',
    mapper: entry => (entry ? 'ja' : 'nein'),
    show: entry =>
      entry[HR_ELEMENTS.EMPLOYEE_PREPARATION_DONE] ? 'ja' : 'nein'
  },
  {
    id: HR_ELEMENTS.REVIEWER_PREPARATION_DONE,
    numeric: false,
    disablePadding: false,
    label: 'Beurteiler ausgefüllt',
    mapper: entry => (entry ? 'ja' : 'nein'),
    show: entry =>
      entry[HR_ELEMENTS.REVIEWER_PREPARATION_DONE] ? 'ja' : 'nein'
  },
  {
    id: HR_ELEMENTS.APPOINTMENT,
    numeric: false,
    disablePadding: true,
    label: 'Termin',
    mapper: variable => variable,
    show: entry => entry[HR_ELEMENTS.APPOINTMENT]
  },
  {
    id: HR_ELEMENTS.IN_PROGRESS,
    numeric: false,
    disablePadding: true,
    label: 'Finaler Status',
    mapper: entry => (entry ? 'laufend' : 'abgeschlossen'),
    show: entry =>
      entry[HR_ELEMENTS.IN_PROGRESS] ? 'laufend' : 'abgeschlossen'
  },
  {
    id: HR_ELEMENTS.HR_PROCESSING_DONE,
    numeric: false,
    disablePadding: true,
    label: 'HR verarbeitet',
    mapper: entry => (entry ? 'ja' : 'nein'),
    show: entry => (entry[HR_ELEMENTS.HR_PROCESSING_DONE] ? 'ja' : 'nein')
  }
];

describe('PerformanceReviewsTable component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let prs = [
      getTestdataEntry(1, '2018-01-01', 'DEVELOPMENT', 'ON_DEMAND'),
      getTestdataEntry(2, '2018-02-01', 'CONSULTANT', 'ON_DEMAND')
    ];

    let component = shallow(
      <PerformanceReviewsTable data={prs} rows={rows} orderBy={rows[1]} />
    );

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
