import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import { CircularProgress } from '@material-ui/core';
import EnhancedTableHead from './EnhancedTableHead';
import { downloadExcel } from '../../calls/excelView';
import PrStatusActionButton from '../pr/prDetail/PrStatusActionButton';

export function descInteger(a, b, mapper) {
  if (mapper(b) < mapper(a)) {
    return -1;
  }
  if (mapper(b) > mapper(a)) {
    return 1;
  }
  return 0;
}

export function descString(a, b, mapper) {
  return -mapper(a).localeCompare(mapper(b));
}

export function stableSort(array, compare) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = compare(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return b[0].id - a[0].id;
  });

  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, sortFunction, mapper) {
  return order === 'desc'
    ? (a, b) => sortFunction(a, b, mapper)
    : (a, b) => -sortFunction(a, b, mapper);
}

const styles = theme => ({
  cell: {
    textAlign: 'center'
  },
  root: {
    width: '100%'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  emptyListMessage: {
    paddingLeft: 2 * theme.spacing.unit
  }
});

class PerformanceReviewTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'desc',
      orderBy: this.props.orderBy,
      page: 0,
      rowsPerPage: 25,
      sortFunction: this.props.columnDefinition[this.props.orderBy].numeric
        ? descInteger
        : descString,
      sortMapper: this.getSortMapper(
        this.props.columnDefinition[this.props.orderBy]
      )
    };
  }

  getSortMapper = column => entry =>
    column.sortValue(entry) ? column.sortValue(entry) : '';

  handleRequestSort = (event, index) => {
    const orderBy = index;
    const column = this.props.columnDefinition[index];

    const sortMapper = this.getSortMapper(column);
    let order = 'desc';

    if (this.state.orderBy === index && this.state.order === 'desc') {
      order = 'asc';
    }
    let sortFunction = descString;
    if (column.numeric === true) {
      sortFunction = descInteger;
    }

    this.setState({ order, orderBy, sortFunction, sortMapper });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  filterCompletedPrs = data => {
    if (this.props.completed) {
      let result = [];
      data.forEach(entry => {
        if (!entry.inProgress) {
          result.push(entry);
        }
      });
      return result;
    } else {
      return data;
    }
  };

  render() {
    const {
      classes,
      columnDefinition,
      data,
      isPersonalDev,
      intl,
      isLoading
    } = this.props;
    const {
      order,
      orderBy,
      sortFunction,
      sortMapper,
      rowsPerPage,
      page
    } = this.state;

    let filteredData = this.filterCompletedPrs(data);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              columnDefinition={columnDefinition}
            />
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                stableSort(
                  filteredData,
                  getSorting(order, sortFunction, sortMapper)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((line, lineIndex) => {
                    return (
                      <TableRow hover tabIndex={-1} key={lineIndex}>
                        {columnDefinition.map((column, columnIndex) => {
                          return (
                            <TableCell
                              className={classes.cell}
                              padding={'none'}
                              key={columnIndex}
                            >
                              {column.render(line)}
                            </TableCell>
                          );
                        }, this)}
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </div>
        <Grid container alignItems={'center'}>
          <Grid item md={4}>
            {filteredData.length === 0 ? (
              <div className={classes.emptyListMessage}>
                <Typography variant={'body2'}>
                  {` ${intl.formatMessage({
                    id: 'performancereviewtable.noentry'
                  })}`}
                </Typography>
              </div>
            ) : null}
            {isPersonalDev && filteredData.length !== 0 ? (
              <PrStatusActionButton
                label={intl.formatMessage({
                  id: 'performancereviewtable.excel'
                })}
                releaseButtonClick={downloadExcel(this.props.filter)}
              />
            ) : null}
          </Grid>
          <Grid item md={3} />
          <Grid item xs={12} md={5}>
            <TablePagination
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': `${intl.formatMessage({
                  id: 'performancereviewtable.previouspage'
                })}`
              }}
              nextIconButtonProps={{
                'aria-label': `${intl.formatMessage({
                  id: 'performancereviewtable.nextpage'
                })}`
              }}
              labelRowsPerPage={intl.formatMessage({
                id: 'performancereviewtable.rowsperpage'
              })}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${intl.formatMessage({
                  id: 'performancereviewtable.from'
                })} ${count}`
              }
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

PerformanceReviewTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columnDefinition: PropTypes.array.isRequired
};

export default injectIntl(withStyles(styles)(PerformanceReviewTable));
