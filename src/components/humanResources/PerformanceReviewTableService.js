import getDisplayName from '../../helper/getDisplayName';
import TABLE_PRS_ELEMENTS from '../pr/tablePrsElements';
import { Link } from 'react-router-dom';
import React from 'react';
import EmployeeFilter from './EmployeeFilter';
import PopperSearchMenu from './PopperSearchMenu';
import PrDelegate from '../pr/PrDelegate';
import { formatDateForFrontend } from '../../helper/date';
import DateFilter from './DateFilter';
import { translateContent } from '../translate/Translate';
import ListFilter from './ListFilter';
import HR_ELEMENTS from './hrElements';
import { mapRatingFullfilment } from '../../helper/mapRatingFullfilment';

export default class PerformanceReviewTableService {
  constructor(filterGroup, filterPossibilities) {
    this.filterGroup = filterGroup;
    this.filterPossibilities = filterPossibilities;
  }
  employee() {
    return {
      numeric: false,
      label: 'Mitarbeiter',
      sortValue: entry => getDisplayName(entry[TABLE_PRS_ELEMENTS.EMPLOYEE]),
      render: entry => {
        return (
          <Link to={`/prDetail/${entry.id}`}>
            {getDisplayName(entry[TABLE_PRS_ELEMENTS.EMPLOYEE])}
          </Link>
        );
      },
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.EMPLOYEE}
        >
          <EmployeeFilter />
        </PopperSearchMenu>
      )
    };
  }

  supervisor() {
    return {
      numeric: false,
      label: 'Vorgesetzte/r',
      sortValue: entry => getDisplayName(entry[TABLE_PRS_ELEMENTS.SUPERVISOR]),
      render: entry => getDisplayName(entry[TABLE_PRS_ELEMENTS.SUPERVISOR]),
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.SUPERVISOR}
        >
          <EmployeeFilter />
        </PopperSearchMenu>
      )
    };
  }

  reviewer(username) {
    return {
      numeric: false,
      label: 'Bewerter',
      sortValue: entry => getDisplayName(entry[TABLE_PRS_ELEMENTS.REVIEWER]),
      render: entry => {
        const text = this.prAlreadyDelegated(entry)
          ? getDisplayName(entry.reviewer)
          : '';
        return this.prDelegable(entry, username) ? (
          <PrDelegate
            pr={entry}
            startValue={text}
            defaultText={'Nicht übergeben'}
            isDelegated={this.prAlreadyDelegated(entry)}
          />
        ) : (
          getDisplayName(entry[TABLE_PRS_ELEMENTS.REVIEWER])
        );
      },
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.REVIEWER}
        >
          <EmployeeFilter />
        </PopperSearchMenu>
      )
    };
  }

  deadline() {
    return {
      numeric: true,
      label: 'Fälligkeit',
      sortValue: entry => entry[TABLE_PRS_ELEMENTS.DEADLINE],
      render: entry =>
        formatDateForFrontend(entry[TABLE_PRS_ELEMENTS.DEADLINE]),
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.DEADLINE}
        >
          <DateFilter />
        </PopperSearchMenu>
      )
    };
  }

  occasion() {
    return {
      numeric: false,
      label: 'Grund',
      sortValue: entry =>
        translateContent(entry[TABLE_PRS_ELEMENTS.PR_OCCASION]),
      render: entry => translateContent(entry[TABLE_PRS_ELEMENTS.PR_OCCASION]),
      filter: (
        <PopperSearchMenu filterGroup={this.filterGroup} filterBy={'occasion'}>
          <ListFilter
            content={this.filterPossibilities.occasions.reduce((obj, item) => {
              obj[translateContent(`${item}`)] = item;
              return obj;
            }, {})}
          />
        </PopperSearchMenu>
      )
    };
  }

  projectCst() {
    return {
      numeric: false,
      label: 'Projektkst',
      sortValue: entry => entry[TABLE_PRS_ELEMENTS.CST],
      render: entry => entry[TABLE_PRS_ELEMENTS.CST],
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.CST}
        >
          <ListFilter
            content={this.filterPossibilities.projectCsts.reduce(
              (obj, item) => {
                obj[item] = item;
                return obj;
              },
              {}
            )}
          />
        </PopperSearchMenu>
      )
    };
  }

  competence() {
    return {
      numeric: false,
      label: 'Dev/Con',
      sortValue: entry =>
        translateContent(`COMPETENCE_${entry[TABLE_PRS_ELEMENTS.COMPETENCE]}`),
      render: entry =>
        translateContent(`COMPETENCE_${entry[TABLE_PRS_ELEMENTS.COMPETENCE]}`),
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.COMPETENCE}
        >
          <ListFilter
            content={this.filterPossibilities.competences.reduce(
              (obj, item) => {
                obj[translateContent(`COMPETENCE_${item}`)] = item;
                return obj;
              },
              {}
            )}
          />
        </PopperSearchMenu>
      )
    };
  }

  level() {
    return {
      numeric: true,
      label: 'level',
      sortValue: entry => entry[TABLE_PRS_ELEMENTS.LEVEL],
      render: entry => entry[TABLE_PRS_ELEMENTS.LEVEL],
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.LEVEL}
        >
          <ListFilter
            content={this.filterPossibilities.levels.reduce((obj, item) => {
              obj[item] = item;
              return obj;
            }, {})}
          />
        </PopperSearchMenu>
      )
    };
  }

  result() {
    return {
      numeric: false,
      label: 'Bewertung',
      sortValue: entry => entry[TABLE_PRS_ELEMENTS.RESULT],
      render: entry => mapRatingFullfilment(entry[TABLE_PRS_ELEMENTS.RESULT]),
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.RESULT}
        >
          <ListFilter
            content={this.filterPossibilities.overallAssessments.reduce(
              (obj, item) => {
                obj[item] = item;
                return obj;
              },
              {}
            )}
          />
        </PopperSearchMenu>
      )
    };
  }

  employeePreparation() {
    return {
      numeric: false,
      label: 'MA ausgefüllt',
      sortValue: entry =>
        entry[TABLE_PRS_ELEMENTS.EMPLOYEE_PREPARATION_DONE] ? 'ja' : 'nein',
      render: entry =>
        entry[TABLE_PRS_ELEMENTS.EMPLOYEE_PREPARATION_DONE] ? 'ja' : 'nein',
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.EMPLOYEE_PREPARATION_DONE}
        >
          <ListFilter content={{ ja: true, nein: false }} />
        </PopperSearchMenu>
      )
    };
  }

  reviewerPreparation() {
    return {
      numeric: false,
      label: 'Beurteiler ausgefüllt',
      sortValue: entry =>
        entry[TABLE_PRS_ELEMENTS.REVIEWER_PREPARATION_DONE] ? 'ja' : 'nein',
      render: entry =>
        entry[TABLE_PRS_ELEMENTS.REVIEWER_PREPARATION_DONE] ? 'ja' : 'nein',
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.REVIEWER_PREPARATION_DONE}
        >
          <ListFilter content={{ ja: true, nein: false }} />
        </PopperSearchMenu>
      )
    };
  }
  meeting() {
    return {
      numeric: false,
      label: 'Termin',
      sortValue: entry => entry[TABLE_PRS_ELEMENTS.APPOINTMENT],
      render: entry =>
        formatDateForFrontend(entry[TABLE_PRS_ELEMENTS.APPOINTMENT])
    };
  }

  finalState() {
    return {
      numeric: false,
      label: 'Finaler Status',
      sortValue: entry =>
        entry[TABLE_PRS_ELEMENTS.IN_PROGRESS] ? 'laufend' : 'abgeschlossen',
      render: entry =>
        entry[TABLE_PRS_ELEMENTS.IN_PROGRESS] ? 'laufend' : 'abgeschlossen',
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.IN_PROGRESS}
        >
          <ListFilter content={{ laufend: true, abgeschlossen: false }} />
        </PopperSearchMenu>
      )
    };
  }

  hrDone() {
    return {
      numeric: false,
      label: 'HR verarbeitet',
      sortValue: entry =>
        entry[HR_ELEMENTS.HR_PROCESSING_DONE] ? 'ja' : 'nein',
      render: entry => (entry[HR_ELEMENTS.HR_PROCESSING_DONE] ? 'ja' : 'nein'),
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={HR_ELEMENTS.HR_PROCESSING_DONE}
        >
          <ListFilter content={{ ja: true, nein: false }} />
        </PopperSearchMenu>
      )
    };
  }

  prAlreadyDelegated = pr => {
    return pr.supervisor.login !== pr.reviewer.login;
  };

  prDelegable = (pr, username) => {
    return (
      pr.supervisor.login === username &&
      pr[TABLE_PRS_ELEMENTS.REVIEWER_PREPARATION_DONE] === false
    );
  };
}
