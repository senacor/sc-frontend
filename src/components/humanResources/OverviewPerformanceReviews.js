import React, { Component } from 'react';
import PerformanceReviewsTable from './PerformanceReviewsTable';
import HR_ELEMENTS from './hrElements';
import { translateContent } from '../translate/Translate';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAllPrsForHumanResources, getFilter } from '../../reducers/selector';
import * as actions from '../../actions';
import withLoading from '../hoc/Loading';
import PopperSearchMenu from './PopperSearchMenu';
import EmployeeFilter from './EmployeeFilter';
import FILTER_GROUPS from './filterGroups';
import getDisplayName from '../../helper/getDisplayName';
import ListFilter from './ListFilter';
import DateFilter from './DateFilter';
import { formatDateForFrontend } from '../../helper/date';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

class OverviewPerformanceReviews extends Component {
  getColumnDefinitions = () => {
    return [
      {
        key: HR_ELEMENTS.EMPLOYEE,
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
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.HR}
            filterBy={HR_ELEMENTS.EMPLOYEE}
          >
            <EmployeeFilter />
          </PopperSearchMenu>
        )
      },
      {
        key: HR_ELEMENTS.DEADLINE,
        numeric: true,
        disablePadding: true,
        label: 'Fälligkeit',
        show: entry => formatDateForFrontend(entry[HR_ELEMENTS.DEADLINE]),
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
        key: HR_ELEMENTS.PR_OCCASION,
        numeric: false,
        disablePadding: false,
        label: 'Grund',
        mapper: entry => translateContent(entry),
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
        key: HR_ELEMENTS.CST,
        numeric: false,
        disablePadding: false,
        label: 'Projektkst'
      },
      {
        key: HR_ELEMENTS.COMPETENCE,
        numeric: false,
        disablePadding: true,
        label: 'Dev/Con',
        mapper: variable => translateContent(`COMPETENCE_${variable}`),
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
        key: HR_ELEMENTS.LEVEL,
        numeric: true,
        disablePadding: true,
        label: 'level',
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
        key: HR_ELEMENTS.SUPERVISOR,
        numeric: false,
        disablePadding: true,
        label: 'Vorgesetzte/r',
        mapper: variable => getDisplayName(variable),
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
        key: HR_ELEMENTS.REVIEWER,
        numeric: false,
        disablePadding: true,
        label: 'Bewerter',
        mapper: variable => getDisplayName(variable),
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
        key: HR_ELEMENTS.RESULT,
        numeric: false,
        disablePadding: true,
        label: 'Bewertung'
      },
      {
        key: HR_ELEMENTS.EMPLOYEE_PREPARATION_DONE,
        numeric: false,
        disablePadding: true,
        label: 'MA ausgefüllt',
        mapper: entry => (entry ? 'ja' : 'nein'),
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
        key: HR_ELEMENTS.REVIEWER_PREPARATION_DONE,
        numeric: false,
        disablePadding: false,
        label: 'Beurteiler ausgefüllt',
        mapper: entry => (entry ? 'ja' : 'nein'),
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
        label: 'Termin'
      },
      {
        key: HR_ELEMENTS.IN_PROGRESS,
        numeric: false,
        disablePadding: true,
        label: 'Finaler Status',
        mapper: entry => (entry ? 'laufend' : 'abgeschlossen'),
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
        key: HR_ELEMENTS.HR_PROCESSING_DONE,
        numeric: false,
        disablePadding: true,
        label: 'HR verarbeitet',
        mapper: entry => (entry ? 'ja' : 'nein'),
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
    return (
      <PerformanceReviewsTable
        columnDefinition={columns}
        orderBy={columns[1]}
        data={this.props.data}
      />
    );
  }
}

export const StyledComponent = withStyles(styles)(OverviewPerformanceReviews);
export default connect(
  (state, props) => ({
    data: getAllPrsForHumanResources(state),
    filter: getFilter(FILTER_GROUPS.HR)(state)
  }),
  {
    fetchFilteredPrsForHumanResource: actions.fetchFilteredPrsForHumanResource
  }
)(
  withLoading(props => props.fetchFilteredPrsForHumanResource(props.filter))(
    StyledComponent
  )
);
