import React, { Component } from 'react';
import PerformanceReviewsTable from './PerformanceReviewsTable';
import HR_ELEMENTS from './hrElements';
import { translateContent } from '../translate/Translate';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllPrsForTable, getFilter } from '../../reducers/selector';
import * as actions from '../../actions';
import withLoading from '../hoc/Loading';
import PopperSearchMenu from './PopperSearchMenu';
import EmployeeFilter from './EmployeeFilter';
import FILTER_GROUPS from './filterGroups';
import getDisplayName from '../../helper/getDisplayName';
import ListFilter from './ListFilter';
import DateFilter from './DateFilter';
import { formatDateForFrontend } from '../../helper/date';
import { getUserroles } from '../../reducers/selector';
import { isHr } from '../../helper/checkRole';

export class OverviewPerformanceReviews extends Component {
  getColumnDefinitions = () => {
    return [
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
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.HR}
            filterBy={'occasion'}
          >
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
        sortValue: entry =>
          entry[HR_ELEMENTS.HR_PROCESSING_DONE] ? 'ja' : 'nein',
        render: entry =>
          entry[HR_ELEMENTS.HR_PROCESSING_DONE] ? 'ja' : 'nein',
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
  };

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.props.fetchFilteredPrsForHumanResource(this.props.filter);
    }
  }

  render() {
    let columns = this.getColumnDefinitions();
    let isHrMember = isHr(this.props.userroles);
    return (
      <PerformanceReviewsTable
        columnDefinition={columns}
        orderBy={1}
        data={this.props.data}
        filter={this.props.filter}
        isHr={isHrMember}
      />
    );
  }
}

export default connect(
  state => ({
    data: getAllPrsForTable(state),
    filter: getFilter(FILTER_GROUPS.HR)(state),
    userroles: getUserroles(state)
  }),
  {
    fetchFilteredPrsForHumanResource: actions.fetchFilteredPrsForHumanResource
  }
)(
  withLoading(props => props.fetchFilteredPrsForHumanResource(props.filter))(
    OverviewPerformanceReviews
  )
);
