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
import { downloadExcel } from '../../actions/calls/excelView';
import PrStatusActionButton from '../pr/prDetail/PrStatusActionButton';
import Typography from '@material-ui/core/Typography/Typography';
import { injectIntl } from 'react-intl';

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
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {},
  tableWrapper: {
    overflowX: 'auto'
  },
  emptyListMessage: {
    paddingLeft: '25px',
    paddingBottom: '5px'
  },
  downloadExcelButton: {
    paddingLeft: '25px',
    paddingBottom: '5px'
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

  render() {
    const { classes, columnDefinition, data, isHr, intl } = this.props;
    const {
      order,
      orderBy,
      sortFunction,
      sortMapper,
      rowsPerPage,
      page
    } = this.state;

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
              {stableSort(data, getSorting(order, sortFunction, sortMapper))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((line, lineIndex) => {
                  return (
                    <TableRow hover tabIndex={-1} key={lineIndex}>
                      {columnDefinition.map((column, columnIndex) => {
                        return (
                          <TableCell padding={'checkbox'} key={columnIndex}>
                            {column.render(line)}
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
        {data.length === 0 ? (
          <div className={classes.emptyListMessage}>
            <Typography variant={'body2'}>
              {` ${intl.formatMessage({
                id: 'performancereviewtable.noentry'
              })}`}
            </Typography>
          </div>
        ) : null}
        {isHr && data.length !== 0 ? (
          <div className={classes.downloadExcelButton}>
            <PrStatusActionButton
              label={intl.formatMessage({
                id: 'performancereviewtable.excel'
              })}
              releaseButtonClick={downloadExcel(this.props.filter)}
            />
          </div>
        ) : null}
      </Paper>
    );
  }
}

PerformanceReviewTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columnDefinition: PropTypes.array.isRequired
};

const StyledComponent = injectIntl(withStyles(styles)(PerformanceReviewTable));
export default StyledComponent;
