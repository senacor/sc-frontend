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
import RequestPerformanceReview from './RequestPerformanceReview';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import TABLE_PRS_ELEMENTS from '../pr/tablePrsElements';
import PopperSearchMenu from '../humanResources/PopperSearchMenu';
import FILTER_GROUPS from '../humanResources/filterGroups';
import EmployeeFilter from '../humanResources/EmployeeFilter';
import DateFilter from '../humanResources/DateFilter';
import ListFilter from '../humanResources/ListFilter';
import PrOverviewReviewerDelegate from '../pr/PrOverviewReviewerDelegate';

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

export class PrOverviewEmployee extends React.Component {
  getColumnDefinitions = () => {
    return [
      {
        key: TABLE_PRS_ELEMENTS.DEADLINE,
        numeric: true,
        disablePadding: true,
        label: 'Fälligkeit',
        show: entry => (
          <Link to={`/prDetail/${entry.prId}`}>
            {formatDateForFrontend(entry[TABLE_PRS_ELEMENTS.DEADLINE])}
          </Link>
        ),
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
        key: TABLE_PRS_ELEMENTS.PR_OCCASION,
        numeric: false,
        disablePadding: false,
        label: 'Grund',
        mapper: entry => translateContent(entry),
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
        key: TABLE_PRS_ELEMENTS.CST,
        numeric: false,
        disablePadding: false,
        label: 'Projektkst'
      },
      {
        key: TABLE_PRS_ELEMENTS.COMPETENCE,
        numeric: false,
        disablePadding: true,
        label: 'Dev/Con',
        mapper: variable => translateContent(`COMPETENCE_${variable}`),
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
        key: TABLE_PRS_ELEMENTS.LEVEL,
        numeric: true,
        disablePadding: true,
        label: 'level',
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
        key: TABLE_PRS_ELEMENTS.SUPERVISOR,
        numeric: false,
        disablePadding: true,
        label: 'Vorgesetzte/r',
        mapper: variable => getDisplayName(variable),
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
        key: TABLE_PRS_ELEMENTS.REVIEWER,
        numeric: false,
        disablePadding: true,
        label: 'Bewerter',
        mapper: variable => getDisplayName(variable),
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
        key: TABLE_PRS_ELEMENTS.RESULT,
        numeric: false,
        disablePadding: true,
        label: 'Bewertung'
      },
      {
        key: TABLE_PRS_ELEMENTS.REVIEWER_PREPARATION_DONE,
        numeric: false,
        disablePadding: true,
        label: 'Beurteiler ausgefüllt',
        mapper: entry => (entry ? 'ja' : 'nein'),
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
        key: TABLE_PRS_ELEMENTS.APPOINTMENT,
        numeric: false,
        disablePadding: true,
        label: 'Termin'
      },
      {
        key: TABLE_PRS_ELEMENTS.IN_PROGRESS,
        numeric: false,
        disablePadding: true,
        label: 'Finaler Status',
        mapper: entry => (entry ? 'laufend' : 'abgeschlossen'),
        filter: (
          <PopperSearchMenu
            filterGroup={FILTER_GROUPS.EMPLOYEE}
            filterBy={'isInProgress'}
          >
            <ListFilter content={{ laufend: true, abgeschlossen: false }} />
          </PopperSearchMenu>
        )
      },
      {
        key: 'delegieren',
        storeVariable: TABLE_PRS_ELEMENTS.SUPERVISOR,
        numeric: false,
        disablePadding: true,
        label: 'Delegieren',
        mapper: entry =>
          entry.login === this.props.username ? 'Delegieren' : '',
        show: entry => {
          return entry.supervisor.login === this.props.username ? (
            <PrOverviewReviewerDelegate prId={entry.id} />
          ) : null;
        }
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
            orderBy={columns[0]}
            data={this.props.data}
          />
        </ListItem>
      </List>
    );
  }
}

export const StyledComponent = withStyles(styles)(PrOverviewEmployee);
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
  )(StyledComponent)
);
