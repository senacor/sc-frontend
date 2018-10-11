import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import withLoading from '../hoc/Loading';
import { getAllPrsForHumanResources } from '../../reducers/selector';
import Translate from '../translate/Translate';
import { Link } from 'react-router-dom';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: 'employee',
    numeric: false,
    disablePadding: false,
    label: 'Mitarbeiter'
  },
  {
    id: 'deadline',
    numeric: false,
    disablePadding: true,
    label: 'Fälligkeit'
  },
  { id: 'reason', numeric: false, disablePadding: false, label: 'Grund' },
  { id: 'cst', numeric: false, disablePadding: false, label: 'Projektkst' },
  { id: 'competence', numeric: false, disablePadding: true, label: 'Dev/Con' },
  {
    id: 'level',
    numeric: false,
    disablePadding: true,
    label: 'level'
  },
  {
    id: 'supervisor',
    numeric: false,
    disablePadding: true,
    label: 'Vorgesetzte/r'
  },
  { id: 'reviewer', numeric: false, disablePadding: true, label: 'Bewerter' },
  {
    id: 'result',
    numeric: false,
    disablePadding: true,
    label: 'Bewertung'
  },
  {
    id: 'employee_filled',
    numeric: false,
    disablePadding: true,
    label: 'MA ausgefüllt'
  },
  {
    id: 'reviewer_filled',
    numeric: false,
    disablePadding: false,
    label: 'Beurteiler ausgefüllt'
  },
  { id: 'appointment', numeric: false, disablePadding: true, label: 'Termin' },
  {
    id: 'finalstate',
    numeric: false,
    disablePadding: true,
    label: 'Finaler Status'
  },
  {
    id: 'HR verarbeitet',
    numeric: false,
    disablePadding: true,
    label: 'HR verarbeitet'
  }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={this.createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

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
    orderBy: 'deadline',
    page: 0,
    rowsPerPage: 25
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  getDisplayName = employee => {
    if (employee) {
      return `${employee.firstName} ${employee.lastName}`;
    }
  };

  render() {
    const { classes } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const data = this.props.prs;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow hover tabIndex={-1} key={n.prId}>
                      <TableCell padding="default">
                        <Link to={`/prDetail/${n.prId}`}>
                          {this.getDisplayName(n.employee)}
                        </Link>
                      </TableCell>
                      <TableCell padding="none">{n.deadline}</TableCell>
                      <TableCell padding="none">
                        <Translate content={n.prOccasion} />
                      </TableCell>
                      <TableCell padding="none">{n.projectCst}</TableCell>
                      <TableCell padding="none">
                        <Translate content={`COMPETENCE_${n.competence}`} />
                      </TableCell>
                      <TableCell padding="none">{n.level}</TableCell>
                      <TableCell padding="none">
                        {this.getDisplayName(n.supervisor)}
                      </TableCell>
                      <TableCell padding="none">
                        {this.getDisplayName(n.reviewer)}
                      </TableCell>
                      <TableCell padding="none">result</TableCell>
                      <TableCell padding="none">
                        {n.employeePreparationDone ? 'ja' : 'nein'}
                      </TableCell>
                      <TableCell padding="none">
                        {n.reviewerPreparationDone ? 'ja' : 'nein'}
                      </TableCell>
                      <TableCell padding="none">{n.appointment}</TableCell>
                      <TableCell padding="none">
                        {n.inProgress ? 'laufend' : 'abgeschlossen'}
                      </TableCell>
                      <TableCell padding="none">
                        {n.humanResourceProcessingDone ? 'ja' : 'nein'}
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
