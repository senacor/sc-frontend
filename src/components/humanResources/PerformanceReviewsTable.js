import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import withLoading from '../hoc/Loading';
import { getAllPrsForHumanResources } from '../../reducers/selector';
import Translate, { translateContent } from '../translate/Translate';
import { Link } from 'react-router-dom';
import HR_ELEMENTS from './hrElements';
import EnhancedTableHead from './EnhancedTableHead';

export function getDisplayName(employee) {
  if (employee) {
    return `${employee.firstName} ${employee.lastName}`;
  }
}

export function descInteger(a, b, orderBy, mapper) {
  if (mapper(b[orderBy]) < mapper(a[orderBy])) {
    return -1;
  }
  if (mapper(b[orderBy]) > mapper(a[orderBy])) {
    return 1;
  }
  return 0;
}

export function descString(a, b, orderBy, mapper) {
  return -mapper(a[orderBy]).localeCompare(mapper(b[orderBy]));
}

export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy, sortFunction, mapper) {
  return order === 'desc'
    ? (a, b) => sortFunction(a, b, orderBy, mapper)
    : (a, b) => -sortFunction(a, b, orderBy, mapper);
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

class EnhancedTable extends React.Component {
  state = {
    order: 'desc',
    orderBy: HR_ELEMENTS.DEADLINE,
    page: 0,
    rowsPerPage: 25,
    sortFunction: descInteger,
    mapper: variable => variable
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    var sortFunction = descString;
    var mapper = variable => variable;

    switch (orderBy) {
      case HR_ELEMENTS.EMPLOYEE:
        mapper = entry => getDisplayName(entry);
        break;
      case HR_ELEMENTS.SUPERVISOR:
        mapper = entry => getDisplayName(entry);
        break;
      case HR_ELEMENTS.REVIEWER:
        mapper = entry => getDisplayName(entry);
        break;
      case HR_ELEMENTS.EMPLOYEE_PREPARATION_DONE:
        mapper = entry => (entry ? 'ja' : 'nein');
        break;
      case HR_ELEMENTS.REVIEWER_PREPARATION_DONE:
        mapper = entry => (entry ? 'ja' : 'nein');
        break;
      case HR_ELEMENTS.HR_PROCESSING_DONE:
        mapper = entry => (entry ? 'ja' : 'nein');
        break;
      case HR_ELEMENTS.IN_PROGRESS:
        mapper = entry => (entry ? 'laufend' : 'abgeschlossen');
        break;

      case HR_ELEMENTS.PR_OCCASION:
        mapper = entry => translateContent(entry);
        break;
      case HR_ELEMENTS.CST:
        mapper = variable => variable;
        break;

      default:
        sortFunction = descInteger;
        mapper = variable => variable;
    }
    this.setState({ order, orderBy, sortFunction, mapper });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const {
      order,
      orderBy,
      sortFunction,
      mapper,
      rowsPerPage,
      page
    } = this.state;
    const data = this.props.prs;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {stableSort(
                data,
                getSorting(order, orderBy, sortFunction, mapper)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(entry => {
                  return (
                    <TableRow hover tabIndex={-1} key={entry.prId}>
                      <TableCell padding="default">
                        <Link to={`/prDetail/${entry.prId}`}>
                          {getDisplayName(entry.employee)}
                        </Link>
                      </TableCell>
                      <TableCell padding="none">{entry.deadline}</TableCell>
                      <TableCell padding="none">
                        <Translate content={entry.prOccasion} />
                      </TableCell>
                      <TableCell padding="none">{entry.projectCst}</TableCell>
                      <TableCell padding="none">
                        <Translate content={`COMPETENCE_${entry.competence}`} />
                      </TableCell>
                      <TableCell padding="none">{entry.level}</TableCell>
                      <TableCell padding="none">
                        {getDisplayName(entry.supervisor)}
                      </TableCell>
                      <TableCell padding="none">
                        {getDisplayName(entry.reviewer)}
                      </TableCell>
                      <TableCell padding="none">result</TableCell>
                      <TableCell padding="none">
                        {entry.employeePreparationDone ? 'ja' : 'nein'}
                      </TableCell>
                      <TableCell padding="none">
                        {entry.reviewerPreparationDone ? 'ja' : 'nein'}
                      </TableCell>
                      <TableCell padding="none">{entry.appointment}</TableCell>
                      <TableCell padding="none">
                        {entry.inProgress ? 'laufend' : 'abgeschlossen'}
                      </TableCell>
                      <TableCell padding="none">
                        {entry.humanResourceProcessingDone ? 'ja' : 'nein'}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export let StyledComponent = withStyles(styles)(EnhancedTable);
export default connect(
  state => ({
    prs: getAllPrsForHumanResources(state)
  }),
  {
    fetchAllPrsForHumanResource: actions.fetchAllPrsForHumanResource
  }
)(withLoading(props => props.fetchAllPrsForHumanResource())(StyledComponent));
