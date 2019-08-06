import getDisplayName from '../../helper/getDisplayName';
import TABLE_PRS_ELEMENTS from '../pr/tablePrsElements';
import { Link } from 'react-router-dom';
import React from 'react';
import EmployeeFilter from './EmployeeFilter';
import PopperSearchMenu from './PopperSearchMenu';
import PrDelegate from '../pr/PrDelegate';
import { formatDateForFrontend } from '../../helper/date';
import DateFilter from './DateFilter';
import ListFilter from './ListFilter';
import HR_ELEMENTS from './hrElements';
import { mapRatingFullfilment } from '../../helper/mapRatingFullfilment';
import { FormattedMessage } from 'react-intl';

export default class PerformanceReviewTableService {
  constructor(filterGroup, filterPossibilities) {
    this.filterGroup = filterGroup;
    this.filterPossibilities = filterPossibilities;
  }
  employee(withFilter = true) {
    let columnDefinition = {
      numeric: false,
      label: <FormattedMessage id="performancereviewtableservice.employee" />,
      sortValue: entry => getDisplayName(entry[TABLE_PRS_ELEMENTS.EMPLOYEE]),
      render: entry => {
        return (
          <Link to={`/prDetail/${entry.id}`}>
            {getDisplayName(entry[TABLE_PRS_ELEMENTS.EMPLOYEE])}
          </Link>
        );
      }
    };
    let returnValue;
    if (withFilter) {
      returnValue = Object.assign({}, columnDefinition, {
        filter: (
          <PopperSearchMenu
            filterGroup={this.filterGroup}
            filterBy={TABLE_PRS_ELEMENTS.EMPLOYEE}
          >
            <EmployeeFilter />
          </PopperSearchMenu>
        )
      });
    } else {
      returnValue = columnDefinition;
    }
    return returnValue;
  }

  supervisor() {
    return {
      numeric: false,
      label: <FormattedMessage id="performancereviewtableservice.supervisor" />,
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
      label: <FormattedMessage id="performancereviewtableservice.reviewer" />,
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
      label: <FormattedMessage id="performancereviewtableservice.duedate" />,
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

  occasion(intl) {
    let filterContent = {};
    this.filterPossibilities.occasions.forEach(item => {
      filterContent[
        intl.formatMessage({
          id: `${item}`
        })
      ] = item;
    });

    return {
      numeric: false,
      label: <FormattedMessage id="performancereviewtableservice.reason" />,
      sortValue: entry => (
        <FormattedMessage id={`${entry[TABLE_PRS_ELEMENTS.PR_OCCASION]}`} />
      ),
      render: entry => (
        <FormattedMessage id={`${entry[TABLE_PRS_ELEMENTS.PR_OCCASION]}`} />
      ),
      filter: (
        <PopperSearchMenu filterGroup={this.filterGroup} filterBy={'occasion'}>
          <ListFilter content={filterContent} />
        </PopperSearchMenu>
      )
    };
  }

  projectCst() {
    let filterContent = {};
    this.filterPossibilities.projectCsts.forEach(item => {
      filterContent[item] = item;
    });
    return {
      numeric: false,
      label: <FormattedMessage id="performancereviewtableservice.projectcst" />,
      sortValue: entry => entry[TABLE_PRS_ELEMENTS.CST],
      render: entry => entry[TABLE_PRS_ELEMENTS.CST],
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.CST}
        >
          <ListFilter content={filterContent} />
        </PopperSearchMenu>
      )
    };
  }

  competence(intl) {
    let filterContent = {};
    this.filterPossibilities.competences.forEach(item => {
      filterContent[
        intl.formatMessage({
          id: `COMPETENCE_${item}`
        })
      ] = item;
    });

    return {
      numeric: false,
      label: <FormattedMessage id="performancereviewtableservice.devcon" />,
      sortValue: entry => (
        <FormattedMessage
          id={`COMPETENCE_${entry[TABLE_PRS_ELEMENTS.COMPETENCE]}`}
        />
      ),
      render: entry => (
        <FormattedMessage
          id={`COMPETENCE_${entry[TABLE_PRS_ELEMENTS.COMPETENCE]}`}
        />
      ),
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.COMPETENCE}
        >
          <ListFilter content={filterContent} />
        </PopperSearchMenu>
      )
    };
  }

  level() {
    let filterContent = {};
    this.filterPossibilities.levels.forEach(item => {
      filterContent[item] = item;
    });

    return {
      numeric: true,
      label: <FormattedMessage id="performancereviewtableservice.level" />,
      sortValue: entry => entry[TABLE_PRS_ELEMENTS.LEVEL],
      render: entry => entry[TABLE_PRS_ELEMENTS.LEVEL],
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.LEVEL}
        >
          <ListFilter content={filterContent} />
        </PopperSearchMenu>
      )
    };
  }

  result() {
    let filterContent = {};
    this.filterPossibilities.overallAssessments.forEach(item => {
      filterContent[mapRatingFullfilment(parseInt(item, 10))] = item;
    });

    return {
      numeric: true,
      label: <FormattedMessage id="performancereviewtableservice.rating" />,
      sortValue: entry => entry[TABLE_PRS_ELEMENTS.RESULT],
      render: entry => mapRatingFullfilment(entry[TABLE_PRS_ELEMENTS.RESULT]),
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.RESULT}
        >
          <ListFilter content={filterContent} />
        </PopperSearchMenu>
      )
    };
  }

  employeePreparation() {
    return {
      numeric: false,
      label: (
        <FormattedMessage id="performancereviewtableservice.employeefilled" />
      ),
      sortValue: entry =>
        entry[TABLE_PRS_ELEMENTS.EMPLOYEE_PREPARATION_DONE] ? 'ja' : 'nein',
      render: entry =>
        entry[TABLE_PRS_ELEMENTS.EMPLOYEE_PREPARATION_DONE] ? (
          <FormattedMessage id="performancereviewtableservice.yes" />
        ) : (
          <FormattedMessage id="performancereviewtableservice.no" />
        ),
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
      label: (
        <FormattedMessage id="performancereviewtableservice.reviewerfilled" />
      ),
      sortValue: entry =>
        entry[TABLE_PRS_ELEMENTS.REVIEWER_PREPARATION_DONE] ? 'ja' : 'nein',
      render: entry =>
        entry[TABLE_PRS_ELEMENTS.REVIEWER_PREPARATION_DONE] ? (
          <FormattedMessage id="performancereviewtableservice.yes" />
        ) : (
          <FormattedMessage id="performancereviewtableservice.no" />
        ),
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
      label: <FormattedMessage id="performancereviewtableservice.termin" />,
      sortValue: entry => entry[TABLE_PRS_ELEMENTS.APPOINTMENT],
      render: entry =>
        formatDateForFrontend(entry[TABLE_PRS_ELEMENTS.APPOINTMENT])
    };
  }

  finalState() {
    return {
      numeric: false,
      label: <FormattedMessage id="performancereviewtableservice.final" />,
      sortValue: entry =>
        entry[TABLE_PRS_ELEMENTS.IN_PROGRESS] ? 'laufend' : 'beendet',
      render: entry =>
        entry[TABLE_PRS_ELEMENTS.IN_PROGRESS] ? (
          <FormattedMessage id="performancereviewtableservice.inprogress" />
        ) : (
          <FormattedMessage id="performancereviewtableservice.ended" />
        ),
      filter: (
        <PopperSearchMenu
          filterGroup={this.filterGroup}
          filterBy={TABLE_PRS_ELEMENTS.IN_PROGRESS}
        >
          <ListFilter content={{ laufend: true, beendet: false }} />
        </PopperSearchMenu>
      )
    };
  }

  hrDone() {
    return {
      numeric: false,
      label: (
        <FormattedMessage id="performancereviewtableservice.hrverarbeitet" />
      ),
      sortValue: entry =>
        entry[HR_ELEMENTS.HR_PROCESSING_DONE] ? 'ja' : 'nein',
      render: entry =>
        entry[HR_ELEMENTS.HR_PROCESSING_DONE] ? (
          <FormattedMessage id="performancereviewtableservice.yes" />
        ) : (
          <FormattedMessage id="performancereviewtableservice.no" />
        ),
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
