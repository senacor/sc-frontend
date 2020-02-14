import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import EmployeesTableHead from './EmployeesTableHead';
import {
  checkFilterValues,
  handleFilterActive,
  sortEmployeeBySortActive
} from '../../../helper/filterFunctions';
import EmployeeTableRow from './EmployeeTableRow';
// Material UI
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import TablePagination from '@material-ui/core/TablePagination';
import { convertToStatusEnum } from '../../../helper/filterData';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../../helper/contextHooks';

const styles = theme => ({
  ...theme.styledComponents,
  paper: {
    margin: 2 * theme.spacing.unit,
    overflow: 'auto'
  }
});

const ActiveEmployeesTable = ({
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
    scStatus: false,
    supervisorName: false,
    department: false,
    officeLocation: false,
    endDate: false,
    entryDate: false
  });

  const user = useUserinfoContext();
  const info = useInfoContext();
  const error = useErrorContext();

  useEffect(() => {
    setFilterActive(handleFilterActive(filterInputs));
  });

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const statusEnums = convertToStatusEnum(filterInputs.scStatus);

  const filterEmployees = (employees, filterInputs) => {
    return employees.filter(empl => {
      if (!empl.entryDate) {
        return false;
      }
      const employeeName = empl.firstName + ' ' + empl.lastName;
      return (
        checkFilterValues(filterInputs.searchEmployee, employeeName) &&
        checkFilterValues(filterInputs.searchSupervisor, empl.supervisorName) &&
        checkFilterValues(filterInputs.position, empl.position) &&
        checkFilterValues(filterInputs.department, empl.department) &&
        checkFilterValues(statusEnums, empl.scStatus) &&
        checkFilterValues(filterInputs.officeLocation, empl.officeLocation) &&
        checkFilterValues(filterInputs.year, empl.entryDate[0]) &&
        checkFilterValues(filterInputs.month, empl.entryDate[1])
      );
    });
  };

  employees = sortEmployeeBySortActive(employees, sortActive, sortDirection);

  const employeesData = employees
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(employee => {
      return (
        <EmployeeTableRow
          key={employee.id}
          employee={employee}
          user={user}
          info={info}
          error={error}
          currentSupervisors={currentSupervisors}
          setSelectedEmployee={setSelectedEmployee}
        />
      );
    });

  let filteredEmployees = filterEmployees(employees, filterInputs);

  const currentSupervisors = employees.filter(
    employee => employee.hasSupervisorRole
  );

  const filteredEmployeesData = filteredEmployees
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(employee => {
      return (
        <EmployeeTableRow
          key={employee.id}
          employee={employee}
          user={user}
          info={info}
          error={error}
          currentSupervisors={currentSupervisors}
          setSelectedEmployee={setSelectedEmployee}
        />
      );
    });

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
        <EmployeesTableHead
          sortActive={sortActive}
          setSortActive={setSortActive}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
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

export default injectIntl(withStyles(styles)(ActiveEmployeesTable));
