import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import withLoading from '../hoc/Loading';
import { Link } from 'react-router-dom';
import { getAllPrsForTable, getFilter } from '../../reducers/selector';
import getDisplayName from '../../helper/getDisplayName';
import { formatDateForFrontend } from '../../helper/date';
import PerformanceReviewsTable from '../humanResources/PerformanceReviewsTable';
import { translateContent } from '../translate/Translate';
import { withStyles } from '@material-ui/core';
import PrOverviewReviewerDelegate from './PrOverviewReviewerDelegate';
import REVIEWER_ELEMENTS from './tablePrsElements';
import FILTER_GROUPS from '../humanResources/filterGroups';
import PopperSearchMenu from '../humanResources/PopperSearchMenu';
import EmployeeFilter from '../humanResources/EmployeeFilter';
import DateFilter from '../humanResources/DateFilter';
import ListFilter from '../humanResources/ListFilter';

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

export class PrOverviewReviewer extends React.Component {
  getColumnDefinitions = () => {
    return [
      {
        numeric: false,
        disablePadding: false,
        label: 'Mitarbeiter',
        sortValue: entry => getDisplayName(entry[REVIEWER_ELEMENTS.EMPLOYEE]),
        render: entry => {
          return (
            <Link to={`/prDetail/${entry.prId}`}>
              {getDisplayName(entry[REVIEWER_ELEMENTS.EMPLOYEE])}
            </Link>
          );
        },
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={REVIEWER_ELEMENTS.EMPLOYEE}
          >
            <EmployeeFilter />
          </PopperSearchMenu>
        )
      },
      {
        numeric: true,
        disablePadding: true,
        label: 'Fälligkeit',
        sortValue: entry => entry[REVIEWER_ELEMENTS.DEADLINE],
        render: entry =>
          formatDateForFrontend(entry[REVIEWER_ELEMENTS.DEADLINE]),
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={REVIEWER_ELEMENTS.DEADLINE}
          >
            <DateFilter />
          </PopperSearchMenu>
        )
      },
      {
        numeric: false,
        disablePadding: false,
        label: 'Grund',
        sortValue: entry =>
          translateContent(entry[REVIEWER_ELEMENTS.PR_OCCASION]),
        render: entry => translateContent(entry[REVIEWER_ELEMENTS.PR_OCCASION]),
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.REVIEWER}
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
        sortValue: entry => entry[REVIEWER_ELEMENTS.CST],
        render: entry => entry[REVIEWER_ELEMENTS.CST]
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Dev/Con',
        sortValue: entry =>
          translateContent(`COMPETENCE_${entry[REVIEWER_ELEMENTS.COMPETENCE]}`),
        render: entry =>
          translateContent(`COMPETENCE_${entry[REVIEWER_ELEMENTS.COMPETENCE]}`),
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={REVIEWER_ELEMENTS.COMPETENCE}
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
        sortValue: entry => entry[REVIEWER_ELEMENTS.LEVEL],
        render: entry => entry[REVIEWER_ELEMENTS.LEVEL],
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={REVIEWER_ELEMENTS.LEVEL}
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
        sortValue: entry => getDisplayName(entry[REVIEWER_ELEMENTS.SUPERVISOR]),
        render: entry => getDisplayName(entry[REVIEWER_ELEMENTS.SUPERVISOR]),
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={REVIEWER_ELEMENTS.SUPERVISOR}
          >
            <EmployeeFilter />
          </PopperSearchMenu>
        )
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Bewerter',
        sortValue: entry => getDisplayName(entry[REVIEWER_ELEMENTS.REVIEWER]),
        render: entry => getDisplayName(entry[REVIEWER_ELEMENTS.REVIEWER]),
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={REVIEWER_ELEMENTS.REVIEWER}
          >
            <EmployeeFilter />
          </PopperSearchMenu>
        )
      },
      {
        key: REVIEWER_ELEMENTS.RESULT,
        numeric: false,
        disablePadding: true,
        label: 'Bewertung',
        sortValue: entry => entry[REVIEWER_ELEMENTS.RESULT],
        render: entry => entry[REVIEWER_ELEMENTS.RESULT]
      },
      {
        key: REVIEWER_ELEMENTS.REVIEWER_PREPARATION_DONE,
        numeric: false,
        disablePadding: true,
        label: 'Beurteiler ausgefüllt',
        sortValue: entry =>
          entry[REVIEWER_ELEMENTS.REVIEWER_PREPARATION_DONE] ? 'ja' : 'nein',
        render: entry =>
          entry[REVIEWER_ELEMENTS.REVIEWER_PREPARATION_DONE] ? 'ja' : 'nein',
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={REVIEWER_ELEMENTS.REVIEWER_PREPARATION_DONE}
          >
            <ListFilter content={{ ja: true, nein: false }} />
          </PopperSearchMenu>
        )
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Termin',
        sortValue: entry => entry[REVIEWER_ELEMENTS.APPOINTMENT],
        render: entry =>
          formatDateForFrontend(entry[REVIEWER_ELEMENTS.APPOINTMENT])
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Finaler Status',
        sortValue: entry =>
          entry[REVIEWER_ELEMENTS.IN_PROGRESS] ? 'laufend' : 'abgeschlossen',
        render: entry =>
          entry[REVIEWER_ELEMENTS.IN_PROGRESS] ? 'laufend' : 'abgeschlossen',
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={REVIEWER_ELEMENTS.IN_PROGRESS}
          >
            <ListFilter content={{ laufend: true, abgeschlossen: false }} />
          </PopperSearchMenu>
        )
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Delegieren',
        sortValue: entry =>
          entry[REVIEWER_ELEMENTS.SUPERVISOR].login === this.props.username
            ? 'Delegieren'
            : '',
        render: entry => {
          return entry[REVIEWER_ELEMENTS.SUPERVISOR].login ===
            this.props.username ? (
            <PrOverviewReviewerDelegate prId={entry.id} />
          ) : null;
        }
      }
    ];
  };

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.props.fetchFilteredPrs(this.props.filter, FILTER_GROUPS.REVIEWER);
    }
  }

  render() {
    const columns = this.getColumnDefinitions();
    return (
      <PerformanceReviewsTable
        columnDefinition={columns}
        orderBy={1}
        data={this.props.data}
      />
    );
  }
}

export const StyledComponent = withStyles(styles)(PrOverviewReviewer);
export default connect(
  state => ({
    data: getAllPrsForTable(state),
    isLoading: state.isLoading,
    username: state.userinfo.userPrincipalName,
    filter: getFilter(FILTER_GROUPS.REVIEWER)(state)
  }),
  {
    fetchFilteredPrs: actions.fetchFilteredPrs
  }
)(
  withLoading(props =>
    props.fetchFilteredPrs(props.filter, FILTER_GROUPS.REVIEWER)
  )(StyledComponent)
);
