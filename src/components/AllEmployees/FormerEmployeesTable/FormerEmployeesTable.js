import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, TablePagination } from '@material-ui/core';
import FormerEmployeesTableHead from './FormerEmployeesTableHead';
import {
  checkFilterValues,
  handleFilterActive
} from '../../../helper/filterFunctions';

// Material UI
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import FormerEmployeeTableRow from './FormerEmployeeTableRow';

const styles = theme => ({
  paper: {
    margin: 2 * theme.spacing.unit,
    overflow: 'auto'
  },
  table: {}
});

export const filterEmployees = (employees, filterInputs) => {
  return employees.filter(empl => {
    const employeeName = empl.firstName + ' ' + empl.lastName;
    return (
      checkFilterValues(filterInputs.searchEmployee, employeeName) &&
      checkFilterValues(filterInputs.position, empl.position) &&
      checkFilterValues(filterInputs.cc, empl.competence) &&
      checkFilterValues(filterInputs.cst, empl.cst) &&
      checkFilterValues(filterInputs.officeLocation, empl.officeLocation) &&
      checkFilterValues(filterInputs.year, empl.endDate[0]) &&
      checkFilterValues(filterInputs.month, empl.endDate[1])
    );
  });
};

const FormerEmployeesTable = ({
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
      return <FormerEmployeeTableRow key={employee.id} employee={employee} />;
    });

  const filteredEmployees = filterEmployees(employees, filterInputs);

  const filteredEmployeesData = filteredEmployees
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(employee => (
      <FormerEmployeeTableRow key={employee.id} employee={employee} />
    ));

  return (
    <Paper className={classes.paper}>
      <Table className={classes.table}>
        <FormerEmployeesTableHead />
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

export default injectIntl(withStyles(styles)(FormerEmployeesTable));
