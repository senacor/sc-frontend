import React, { Component } from 'react';
import PerformanceReviewsTable from './PerformanceReviewsTable';
import HR_ELEMENTS from './hrElements';
import { translateContent } from '../translate/Translate';
import { Link } from 'react-router-dom';
import Translate from '../translate/Translate';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAllPrsForHumanResources, getFilter } from '../../reducers/selector';
import * as actions from '../../actions';
import withLoading from '../hoc/Loading';
import ListItem from '@material-ui/core/ListItem/ListItem';
import PopperSearchMenu from './PopperSearchMenu';
import TextField from '@material-ui/core/TextField/TextField';
import List from '@material-ui/core/List/List';
import EmployeeFilter from './EmployeeFilter';
import FILTER_GROUPS from './filterGroups';

export function getDisplayName(employee) {
  if (employee) {
    return `${employee.firstName} ${employee.lastName}`;
  }
}

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
          <PopperSearchMenu>
            <EmployeeFilter
              filterGroup={FILTER_GROUPS.HR}
              filterBy={HR_ELEMENTS.EMPLOYEE}
            />
          </PopperSearchMenu>
        )
      },
      {
        key: HR_ELEMENTS.DEADLINE,
        numeric: true,
        disablePadding: true,
        label: 'Fälligkeit',
        mapper: variable => variable,
        show: entry => entry[HR_ELEMENTS.DEADLINE],
        filter: (
          <PopperSearchMenu>
            <List>
              <ListItem>
                <TextField
                  id="startDate"
                  label="Fälligkeit von"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  id="endDate"
                  label="Fälligkeit bis"
                  type="date"
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </ListItem>
            </List>
          </PopperSearchMenu>
        )
      },
      {
        key: HR_ELEMENTS.PR_OCCASION,
        numeric: false,
        disablePadding: false,
        label: 'Grund',
        mapper: entry => translateContent(entry),
        show: entry => <Translate content={entry[HR_ELEMENTS.PR_OCCASION]} />
      },
      {
        key: HR_ELEMENTS.CST,
        numeric: false,
        disablePadding: false,
        label: 'Projektkst',
        mapper: variable => variable,
        show: entry => entry[HR_ELEMENTS.CST]
      },
      {
        key: HR_ELEMENTS.COMPETENCE,
        numeric: false,
        disablePadding: true,
        label: 'Dev/Con',
        mapper: variable => translateContent(`COMPETENCE_${variable}`),
        show: entry => (
          <Translate content={`COMPETENCE_${entry[HR_ELEMENTS.COMPETENCE]}`} />
        )
      },
      {
        key: HR_ELEMENTS.LEVEL,
        numeric: false,
        disablePadding: true,
        label: 'level',
        mapper: variable => variable,
        show: entry => entry[HR_ELEMENTS.LEVEL]
      },
      {
        key: HR_ELEMENTS.SUPERVISOR,
        numeric: false,
        disablePadding: true,
        label: 'Vorgesetzte/r',
        mapper: variable => getDisplayName(variable),
        show: entry => getDisplayName(entry[HR_ELEMENTS.SUPERVISOR]),
        filter: (
          <PopperSearchMenu>
            <EmployeeFilter
              filterGroup={FILTER_GROUPS.HR}
              filterBy={HR_ELEMENTS.SUPERVISOR}
            />
          </PopperSearchMenu>
        )
      },
      {
        key: HR_ELEMENTS.REVIEWER,
        numeric: false,
        disablePadding: true,
        label: 'Bewerter',
        mapper: variable => getDisplayName(variable),
        show: entry => getDisplayName(entry[HR_ELEMENTS.REVIEWER]),
        filter: (
          <PopperSearchMenu>
            <EmployeeFilter
              filterGroup={FILTER_GROUPS.HR}
              filterBy={HR_ELEMENTS.REVIEWER}
            />
          </PopperSearchMenu>
        )
      },
      {
        key: HR_ELEMENTS.RESULT,
        numeric: false,
        disablePadding: true,
        label: 'Bewertung',
        mapper: variable => variable,
        show: entry => entry[HR_ELEMENTS.RESULT]
      },
      {
        key: HR_ELEMENTS.EMPLOYEE_PREPARATION_DONE,
        numeric: false,
        disablePadding: true,
        label: 'MA ausgefüllt',
        mapper: entry => (entry ? 'ja' : 'nein'),
        show: entry =>
          entry[HR_ELEMENTS.EMPLOYEE_PREPARATION_DONE] ? 'ja' : 'nein'
      },
      {
        key: HR_ELEMENTS.REVIEWER_PREPARATION_DONE,
        numeric: false,
        disablePadding: false,
        label: 'Beurteiler ausgefüllt',
        mapper: entry => (entry ? 'ja' : 'nein'),
        show: entry =>
          entry[HR_ELEMENTS.REVIEWER_PREPARATION_DONE] ? 'ja' : 'nein'
      },
      {
        key: HR_ELEMENTS.APPOINTMENT,
        numeric: false,
        disablePadding: true,
        label: 'Termin',
        mapper: variable => variable,
        show: entry => entry[HR_ELEMENTS.APPOINTMENT]
      },
      {
        key: HR_ELEMENTS.IN_PROGRESS,
        numeric: false,
        disablePadding: true,
        label: 'Finaler Status',
        mapper: entry => (entry ? 'laufend' : 'abgeschlossen'),
        show: entry =>
          entry[HR_ELEMENTS.IN_PROGRESS] ? 'laufend' : 'abgeschlossen'
      },
      {
        key: HR_ELEMENTS.HR_PROCESSING_DONE,
        numeric: false,
        disablePadding: true,
        label: 'HR verarbeitet',
        mapper: entry => (entry ? 'ja' : 'nein'),
        show: entry => (entry[HR_ELEMENTS.HR_PROCESSING_DONE] ? 'ja' : 'nein')
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
    fetchAllPrsForHumanResource: actions.fetchAllPrsForHumanResource,
    fetchFilteredPrsForHumanResource: actions.fetchFilteredPrsForHumanResource
  }
)(withLoading(props => props.fetchAllPrsForHumanResource())(StyledComponent));
