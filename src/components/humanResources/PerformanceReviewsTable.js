import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from './EnhancedTableHead';

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

export function stableSort(array, compare) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = compare(a[0], b[0]);
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

class PerformanceReviewsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'desc',
      orderBy: this.props.orderBy.key,
      page: 0,
      rowsPerPage: 25,
      sortFunction: this.props.orderBy.numeric ? descInteger : descString,
      mapper: this.getMapper(this.props.orderBy)
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property.key;

    const mapper = this.getMapper(property);
    let order = 'desc';

    if (this.state.orderBy === orderBy && this.state.order === 'desc') {
      order = 'asc';
    }
    let sortFunction = descString;
    if (property.numeric === true) {
      sortFunction = descInteger;
    }

    this.setState({ order, orderBy, sortFunction, mapper });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  getMapper = column => (column.mapper ? column.mapper : this.defaultMapper);
  defaultMapper = variable => (variable ? variable : '');

  show = (column, line) => {
    if (column.show) {
      return column.show(line);
    } else {
      if (column.storeVariable) {
        return this.getMapper(column)(line[column.storeVariable]);
      } else {
        return this.getMapper(column)(line[column.key]);
      }
    }
  };

  render() {
    const { classes, columnDefinition } = this.props;
    const {
      order,
      orderBy,
      sortFunction,
      mapper,
      rowsPerPage,
      page
    } = this.state;
    const data = this.props.data;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              columnDefinition={columnDefinition}
            />
            <TableBody>
              {stableSort(
                data,
                getSorting(order, orderBy, sortFunction, mapper)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((line, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      {columnDefinition.map(column => {
                        return (
                          <TableCell
                            padding={column.disablePadding ? 'none' : 'default'}
                            key={column.key}
                          >
                            {this.show(column, line)}
                          </TableCell>
                        );
                      }, this)}
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

PerformanceReviewsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columnDefinition: PropTypes.array.isRequired
};

const StyledComponent = withStyles(styles)(PerformanceReviewsTable);
export default StyledComponent;
