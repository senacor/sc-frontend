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
import RequestPerformanceReview from './RequestPerformanceReview';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import TABLE_PRS_ELEMENTS from '../pr/tablePrsElements';
import PopperSearchMenu from '../humanResources/PopperSearchMenu';
import FILTER_GROUPS from '../humanResources/filterGroups';
import EmployeeFilter from '../humanResources/EmployeeFilter';
import DateFilter from '../humanResources/DateFilter';
import ListFilter from '../humanResources/ListFilter';

export class PrOverviewEmployee extends React.Component {
  getColumnDefinitions = () => {
    return [
      {
        numeric: false,
        disablePadding: false,
        label: 'Mitarbeiter',
        sortValue: entry => getDisplayName(entry[TABLE_PRS_ELEMENTS.EMPLOYEE]),
        render: entry => {
          return (
            <Link to={`/prDetail/${entry.prId}`}>
              {getDisplayName(entry[TABLE_PRS_ELEMENTS.EMPLOYEE])}
            </Link>
          );
        }
      },
      {
        numeric: true,
        disablePadding: true,
        label: 'Fälligkeit',
        sortValue: entry => entry[TABLE_PRS_ELEMENTS.DEADLINE],
        render: entry =>
          formatDateForFrontend(entry[TABLE_PRS_ELEMENTS.DEADLINE]),
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.EMPLOYEE}
            filterBy={TABLE_PRS_ELEMENTS.DEADLINE}
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
          translateContent(entry[TABLE_PRS_ELEMENTS.PR_OCCASION]),
        render: entry =>
          translateContent(entry[TABLE_PRS_ELEMENTS.PR_OCCASION]),
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.EMPLOYEE}
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
        sortValue: entry => entry[TABLE_PRS_ELEMENTS.CST],
        render: entry => entry[TABLE_PRS_ELEMENTS.CST]
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Dev/Con',
        sortValue: entry =>
          translateContent(
            `COMPETENCE_${entry[TABLE_PRS_ELEMENTS.COMPETENCE]}`
          ),
        render: entry =>
          translateContent(
            `COMPETENCE_${entry[TABLE_PRS_ELEMENTS.COMPETENCE]}`
          ),
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.EMPLOYEE}
            filterBy={TABLE_PRS_ELEMENTS.COMPETENCE}
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
        sortValue: entry => entry[TABLE_PRS_ELEMENTS.LEVEL],
        render: entry => entry[TABLE_PRS_ELEMENTS.LEVEL],
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.EMPLOYEE}
            filterBy={TABLE_PRS_ELEMENTS.LEVEL}
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
        sortValue: entry =>
          getDisplayName(entry[TABLE_PRS_ELEMENTS.SUPERVISOR]),
        render: entry => getDisplayName(entry[TABLE_PRS_ELEMENTS.SUPERVISOR]),
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.EMPLOYEE}
            filterBy={TABLE_PRS_ELEMENTS.SUPERVISOR}
          >
            <EmployeeFilter />
          </PopperSearchMenu>
        )
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Bewerter',
        sortValue: entry => getDisplayName(entry[TABLE_PRS_ELEMENTS.REVIEWER]),
        render: entry => getDisplayName(entry[TABLE_PRS_ELEMENTS.REVIEWER]),
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.EMPLOYEE}
            filterBy={TABLE_PRS_ELEMENTS.REVIEWER}
          >
            <EmployeeFilter />
          </PopperSearchMenu>
        )
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Bewertung',
        sortValue: entry => entry[TABLE_PRS_ELEMENTS.RESULT],
        render: entry => entry[TABLE_PRS_ELEMENTS.RESULT]
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'MA ausgefüllt',
        sortValue: entry =>
          entry[TABLE_PRS_ELEMENTS.EMPLOYEE_PREPARATION_DONE] ? 'ja' : 'nein',
        render: entry =>
          entry[TABLE_PRS_ELEMENTS.EMPLOYEE_PREPARATION_DONE] ? 'ja' : 'nein',
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.EMPLOYEE}
            filterBy={'isReviewerPreparationDone'}
          >
            <ListFilter content={{ ja: true, nein: false }} />
          </PopperSearchMenu>
        )
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Beurteiler ausgefüllt',
        sortValue: entry =>
          entry[TABLE_PRS_ELEMENTS.REVIEWER_PREPARATION_DONE] ? 'ja' : 'nein',
        render: entry =>
          entry[TABLE_PRS_ELEMENTS.REVIEWER_PREPARATION_DONE] ? 'ja' : 'nein',
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.EMPLOYEE}
            filterBy={'isReviewerPreparationDone'}
          >
            <ListFilter content={{ ja: true, nein: false }} />
          </PopperSearchMenu>
        )
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Termin',
        sortValue: entry => entry[TABLE_PRS_ELEMENTS.APPOINTMENT],
        render: entry =>
          formatDateForFrontend(entry[TABLE_PRS_ELEMENTS.APPOINTMENT])
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Finaler Status',
        sortValue: entry =>
          entry[TABLE_PRS_ELEMENTS.IN_PROGRESS] ? 'laufend' : 'abgeschlossen',
        render: entry =>
          entry[TABLE_PRS_ELEMENTS.IN_PROGRESS] ? 'laufend' : 'abgeschlossen',
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.EMPLOYEE}
            filterBy={'isInProgress'}
          >
            <ListFilter content={{ laufend: true, abgeschlossen: false }} />
          </PopperSearchMenu>
        )
      }
    ];
  };

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.props.fetchFilteredPrs(this.props.filter, FILTER_GROUPS.EMPLOYEE);
    }
  }

  render() {
    const columns = this.getColumnDefinitions();
    return (
      <List>
        <ListItem>
          <RequestPerformanceReview />
        </ListItem>
        <ListItem>
          <PerformanceReviewsTable
            columnDefinition={columns}
            orderBy={1}
            data={this.props.data}
          />
        </ListItem>
      </List>
    );
  }
}
export default connect(
  state => ({
    isLoading: state.isLoading,
    data: getAllPrsForTable(state),
    filter: getFilter(FILTER_GROUPS.EMPLOYEE)(state)
  }),
  {
    fetchFilteredPrs: actions.fetchFilteredPrs
  }
)(
  withLoading(props =>
    props.fetchFilteredPrs(props.filter, FILTER_GROUPS.EMPLOYEE)
  )(PrOverviewEmployee)
);
