import React, { useState, useEffect, useContext } from 'react';
import { ErrorContext } from '../App';
import { injectIntl } from 'react-intl';
import { withStyles, CircularProgress } from '@material-ui/core';

// Material UI
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

// Icons
import ExpandIcon from '@material-ui/icons/ExpandMore';

// Calls
import { getAllEmployees } from '../../actions/calls/employees';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  }
});

const PrAllEmployeeOverview = ({ classes, intl }) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    getAllEmployees(setEmployees, setIsLoading, errorContext);
  }, []);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleSort = () => {
    if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortDirection('asc');
    }
  };

  console.log('employees', employees);
  console.log('loading', isLoading);

  const employeesData = employees
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(data => (
      <TableRow key={data.id}>
        <TableCell>{`${data.firstName} ${data.lastName}`}</TableCell>
        <TableCell style={{ borderTop: '1px solid lightgrey' }}>
          <ExpandIcon />
        </TableCell>
      </TableRow>
    ));
  return (
    <Paper className={classes.spacing}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={sortDirection}
                onClick={handleSort}
              >
                {`${intl.formatMessage({
                  id: 'userrolespanel.user'
                })}`}
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            employeesData
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={employees.length}
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
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(PrAllEmployeeOverview));
