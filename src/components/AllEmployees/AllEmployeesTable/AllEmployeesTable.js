import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import AllEmployeesTableHead from './AllEmployeesTableHead';
import {
  checkFilterValues,
  handleFilterActive
} from '../../../helper/filterFunctions';
import EmployeeTableRow from './EmployeeTableRow';

// Material UI
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import TablePagination from '@material-ui/core/TablePagination';

const styles = theme => ({
  ...theme.styledComponents,
  paper: {
    margin: 2 * theme.spacing.unit,
    overflow: 'auto'
  }
});

export const filterEmployees = (employees, filterInputs) => {
  return employees.filter(empl => {
    const employeeName = empl.firstName + ' ' + empl.lastName;
    return (
      checkFilterValues(filterInputs.searchEmployee, employeeName) &&
      checkFilterValues(filterInputs.position, empl.currentPosition) &&
      checkFilterValues(filterInputs.department, empl.department) &&
      checkFilterValues(filterInputs.scStatus, empl.scStatus) &&
      checkFilterValues(filterInputs.officeLocation, empl.officeLocation)
      // &&
      // checkFilterValues(filterInputs.year, empl.endDate[0]) &&
      // checkFilterValues(filterInputs.month, empl.endDate[1])
    );
  });
};

const AllEmployeesTable = ({
  classes,
  intl,
  filterInputs,
  employees,
  isLoading
}) => {
  const [filterActive, setFilterActive] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  useEffect(() => {
    handleFilterActive(filterInputs, setFilterActive);
  });

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const employeesData = employees
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(employee => {
      return <EmployeeTableRow key={employee.id} employee={employee} />;
    });

  const filteredEmployees = filterEmployees(employees, filterInputs);

  const filteredEmployeesData = filteredEmployees
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(employee => (
      <EmployeeTableRow key={employee.id} employee={employee} />
    ));

  if (isLoading) {
    return (
      <div className={classes.progressBarCentered}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Paper className={classes.paper}>
      <Table className={classes.table}>
        <AllEmployeesTableHead />
        <TableBody>
          {filterActive ? filteredEmployeesData : employeesData}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filterActive ? filteredEmployees.length : employees.length}
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

export default injectIntl(withStyles(styles)(AllEmployeesTable));
