import React, { Component } from 'react';
import PerformanceReviewsTable from './PerformanceReviewsTable';
import HR_ELEMENTS from './hrElements';
import { translateContent } from '../translate/Translate';
import { Link } from 'react-router-dom';
import Translate from '../translate/Translate';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAllPrsForHumanResources } from '../../reducers/selector';
import * as actions from '../../actions';
import withLoading from '../hoc/Loading';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ExcelLikeSearchMenue from './ExcelLikeSearchMenue';
import TextField from '@material-ui/core/TextField/TextField';
import List from '@material-ui/core/List/List';
import EmployeeFilter from './EmployeeFilter';

export function getDisplayName(employee) {
  if (employee) {
    return `${employee.firstName} ${employee.lastName}`;
  }
}

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
  render() {
    return (
      <div>
        <ListItem>
          <PerformanceReviewsTable
            rows={rows}
            orderBy={rows[1]}
            data={this.props.data}
          />
        </ListItem>
      </div>
    );
  }
}

export let StyledComponent = withStyles(styles)(OverviewPerformanceReviews);
export default connect(
  state => ({
    data: getAllPrsForHumanResources(state)
  }),
  {
    fetchAllPrsForHumanResource: actions.fetchAllPrsForHumanResource
  }
)(withLoading(props => props.fetchAllPrsForHumanResource())(StyledComponent));
