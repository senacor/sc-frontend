import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { Link } from 'react-router-dom';
import {
  getAllPrsForTable,
  getFilter,
  getUserPrincipalName,
  getFilterPossibilities
} from '../../reducers/selector';
import getDisplayName from '../../helper/getDisplayName';
import { formatDateForFrontend } from '../../helper/date';
import PerformanceReviewsTable from '../humanResources/PerformanceReviewsTable';
import { translateContent } from '../translate/Translate';
import PrDelegate from './PrDelegate';
import TABLE_PRS_ELEMENTS from './tablePrsElements';
import FILTER_GROUPS from '../humanResources/filterGroups';
import PopperSearchMenu from '../humanResources/PopperSearchMenu';
import EmployeeFilter from '../humanResources/EmployeeFilter';
import DateFilter from '../humanResources/DateFilter';
import ListFilter from '../humanResources/ListFilter';
import { LoadingEvents } from '../../helper/loadingEvents';
import withLoadingAction from '../hoc/LoadingWithAction';

export class PrOverviewReviewer extends React.Component {
  getColumnDefinitions = () => {
    const { filterPossibilities } = this.props;
    return [
      {
        numeric: false,
        disablePadding: false,
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
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={TABLE_PRS_ELEMENTS.EMPLOYEE}
          >
            <EmployeeFilter />
          </PopperSearchMenu>
        )
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
            filterGroup={FILTER_GROUPS.REVIEWER}
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
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={'occasion'}
          >
            <ListFilter
              content={filterPossibilities.occasions.reduce((obj, item) => {
                obj[translateContent(`${item}`)] = item;
                return obj;
              }, {})}
            />
          </PopperSearchMenu>
        )
      },
      {
        numeric: false,
        disablePadding: false,
        label: 'Projektkst',
        sortValue: entry => entry[TABLE_PRS_ELEMENTS.CST],
        render: entry => entry[TABLE_PRS_ELEMENTS.CST],
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={TABLE_PRS_ELEMENTS.CST}
          >
            <ListFilter
              content={filterPossibilities.projectCsts.reduce((obj, item) => {
                obj[item] = item;
                return obj;
              }, {})}
            />
          </PopperSearchMenu>
        )
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
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={TABLE_PRS_ELEMENTS.COMPETENCE}
          >
            <ListFilter
              content={filterPossibilities.competences.reduce((obj, item) => {
                obj[translateContent(`COMPETENCE_${item}`)] = item;
                return obj;
              }, {})}
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
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={TABLE_PRS_ELEMENTS.LEVEL}
          >
            <ListFilter
              content={filterPossibilities.levels.reduce((obj, item) => {
                obj[item] = item;
                return obj;
              }, {})}
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
            filterGroup={FILTER_GROUPS.REVIEWER}
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
        render: entry => {
          const text = this.prAlreadyDelegated(entry)
            ? getDisplayName(entry.reviewer)
            : '';
          return this.prDelegable(entry) ? (
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
            filterGroup={FILTER_GROUPS.REVIEWER}
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
        render: entry => entry[TABLE_PRS_ELEMENTS.RESULT],
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={TABLE_PRS_ELEMENTS.RESULT}
          >
            <ListFilter
              content={filterPossibilities.overallAssessments.reduce(
                (obj, item) => {
                  obj[item] = item;
                  return obj;
                },
                {}
              )}
            />
          </PopperSearchMenu>
        )
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
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={TABLE_PRS_ELEMENTS.EMPLOYEE_PREPARATION_DONE}
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
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={TABLE_PRS_ELEMENTS.REVIEWER_PREPARATION_DONE}
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
            filterGroup={FILTER_GROUPS.REVIEWER}
            filterBy={TABLE_PRS_ELEMENTS.IN_PROGRESS}
          >
            <ListFilter content={{ laufend: true, abgeschlossen: false }} />
          </PopperSearchMenu>
        )
      }
    ];
  };

  prAlreadyDelegated = pr => {
    return pr.supervisor.login !== pr.reviewer.login;
  };

  prDelegable = pr => {
    return (
      pr.supervisor.login === this.props.username &&
      pr[TABLE_PRS_ELEMENTS.REVIEWER_PREPARATION_DONE] === false
    );
  };
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.props.fetchFilteredPrs(this.props.filter, FILTER_GROUPS.REVIEWER);
    }
  }
  render() {
    if (!this.props.filterPossibilities.levels) {
      return null;
    }
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

export default connect(
  state => ({
    data: getAllPrsForTable(state),
    username: getUserPrincipalName(state),
    filter: getFilter(FILTER_GROUPS.REVIEWER)(state),
    filterPossibilities: getFilterPossibilities(state)
  }),
  {
    fetchFilteredPrs: actions.fetchFilteredPrs,
    getFilterPossibilities: actions.getFilterPossibilities
  }
)(
  withLoadingAction(props => {
    props.getFilterPossibilities();
    props.fetchFilteredPrs(props.filter, FILTER_GROUPS.REVIEWER);
  })([LoadingEvents.FETCH_OWN_PRS, LoadingEvents.FILTER_POSSIBILITIES])(
    PrOverviewReviewer
  )
);
