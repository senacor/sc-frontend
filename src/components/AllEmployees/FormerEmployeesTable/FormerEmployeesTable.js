import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import {
  checkFilterValues,
  handleFilterActive
} from '../../../helper/filterFunctions';
import { sortBySortActive } from '../../../helper/sorting';
import EmployeeTableRow from '../EmployeesTable/EmployeeTableRow';
import EmployeesTableHead from '../EmployeesTable/EmployeesTableHead';

// Material UI
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { JSS } from '../../../styles/jsStyles';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  ...theme.styledComponents,
  paper: {
    margin: 2 * theme.spacing.unit,
    overflow: 'auto'
  },
  dummyRow: {
    height: 56
  }
});

const FormerEmployeesTable = ({
  classes,
  intl,
  filterInputs,
  employees,
  isLoading,
  setSelectedEmployee
}) => {
  const [filterActive, setFilterActive] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  const [sortDirection, setSortDirection] = useState('asc');
  const [sortActive, setSortActive] = useState({
    lastName: true,
    position: false,
    department: false,
    officeLocation: false,
    endDate: false
  });

  useEffect(() => {
    handleFilterActive(filterInputs, setFilterActive);
  });

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const filterEmployees = (employees, filterInputs) => {
    return employees.filter(empl => {
      const employeeName = empl.firstName + ' ' + empl.lastName;
      return (
        checkFilterValues(filterInputs.searchEmployee, employeeName) &&
        checkFilterValues(filterInputs.position, empl.position) &&
        checkFilterValues(filterInputs.department, empl.department) &&
        checkFilterValues(filterInputs.officeLocation, empl.officeLocation) &&
        checkFilterValues(
          filterInputs.year,
          empl.endDate ? empl.endDate[0] : null
        ) &&
        checkFilterValues(
          filterInputs.month,
          empl.endDate ? empl.endDate[1] : null
        )
      );
    });
  };

  employees = sortBySortActive(employees, sortActive, sortDirection);

  const employeesData = employees
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(employee => (
      <EmployeeTableRow
        key={employee.id}
        employee={employee}
        setSelectedEmployee={setSelectedEmployee}
        formerEmployee
      />
    ));

  let filteredEmployees = filterEmployees(employees, filterInputs);

  const filteredEmployeesData = filteredEmployees
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(employee => (
      <EmployeeTableRow
        key={employee.id}
        employee={employee}
        setSelectedEmployee={setSelectedEmployee}
        formerEmployee
      />
    ));

  if (isLoading) {
    return (
      <div className={classes.progressBarCentered}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Paper className={classes.paper} id={JSS.CONTENT_ID}>
      <Table className={classes.table}>
        <EmployeesTableHead
          formerEmployee
          sortActive={sortActive}
          setSortActive={setSortActive}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
        <TableBody>
          <TableRow className={classes.dummyRow} />
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

export default injectIntl(withStyles(styles)(FormerEmployeesTable));
