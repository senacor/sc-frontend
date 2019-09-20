import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';

// Material UI
import Grid from '@material-ui/core/Grid';

import EmployeeCard from './EmployeeCard';

const styles = theme => ({
  gridContainer: {
    height: '70vh',
    width: '100%',
    padding: 2 * theme.spacing.unit,
    overflowY: 'auto',
    overflowX: 'hidden'
  }
});

const EmployeesGrid = ({ classes, searchEmployeesValue, employees }) => {
  const filteredEmployees = employees.filter(employee => {
    return employee.lastName
      .toLowerCase()
      .includes(searchEmployeesValue.toLowerCase());
  });

  // All employees
  const employeesData = employees.map(employee => (
    <Grid item key={employee.id}>
      <EmployeeCard employee={employee} />
    </Grid>
  ));

  // Filtered employees
  const filteredEmployeesData = filteredEmployees.map(employee => (
    <Grid item key={employee.id}>
      <EmployeeCard employee={employee} />
    </Grid>
  ));

  return (
    <div className={classes.gridContainer}>
      <Grid container spacing={40}>
        {searchEmployeesValue ? filteredEmployeesData : employeesData}
      </Grid>
    </div>
  );
};

export default injectIntl(withStyles(styles)(EmployeesGrid));
