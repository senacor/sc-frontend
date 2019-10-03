import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, TablePagination } from '@material-ui/core';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';
import AllEmployeesTableHead from './AllEmployeesTableHead';
import {
  checkFilterValues,
  handleFilterActive
} from '../../../helper/filterFunctions';

// Material UI
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const styles = theme => ({
  paper: {
    margin: 2 * theme.spacing.unit,
    overflow: 'auto'
  },
  table: {}
});

const AllEmployeesTable = ({
  classes,
  intl,
  filterInputs,
  toggleSelected,
  selection,
  selected,
  employees,
  isLoading
}) => {
  const [filterActive, setFilterActive] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    handleFilterActive(filterInputs, setFilterActive);
  });

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

  console.log(sortDirection);
  const employeesData = employees
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(employee => {
      const employeeName = `${employee.firstName} ${employee.lastName}`;
      return (
        <TableRow key={employee.id}>
          <TableCell>{employeeName}</TableCell>
          <TableCell>{employee.currentPosition}</TableCell>
          <TableCell>{employee.currentCst}</TableCell>
          <TableCell>{employee.supervisorName}</TableCell>
          <TableCell>{employee.competenceCenter}</TableCell>
          <TableCell>{employee.officeLocation}</TableCell>
          <TableCell>
            {formatLocaleDateTime(employee.dateOfNextPr, FRONTEND_DATE_FORMAT)}
          </TableCell>
        </TableRow>
      );
    });

  const filteredEmployees = employees.filter(empl => {
    const employeeName = empl.firstName + ' ' + empl.lastName;
    return (
      checkFilterValues(filterInputs.searchEmployee, employeeName) &&
      checkFilterValues(filterInputs.position, empl.currentPosition) &&
      checkFilterValues(filterInputs.cc, empl.competenceCenter) &&
      checkFilterValues(filterInputs.cst, empl.currentCst) &&
      checkFilterValues(filterInputs.officeLocation, empl.officeLocation)
    );
  });

  const filteredEmployeesData = filteredEmployees
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(employee => (
      <TableRow key={employee.id}>
        <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
        <TableCell>{employee.currentPosition}</TableCell>
        <TableCell>{employee.currentCst}</TableCell>
        <TableCell>{employee.supervisorName}</TableCell>
        <TableCell>{employee.competenceCenter}</TableCell>
        <TableCell>{employee.officeLocation}</TableCell>
        <TableCell>
          {formatLocaleDateTime(employee.dateOfNextPr, FRONTEND_DATE_FORMAT)}
        </TableCell>
      </TableRow>
    ));

  return (
    <Paper className={classes.paper}>
      <Table className={classes.table}>
        <AllEmployeesTableHead
          handleSort={handleSort}
          sortDirection={sortDirection}
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

export default injectIntl(withStyles(styles)(AllEmployeesTable));
