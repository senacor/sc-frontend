import React, { useEffect, useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, CircularProgress } from '@material-ui/core';
import EmployeeCard from './EmployeeCard';
import { ErrorContext } from '../../App';

// Calls
import { getAllEmployees } from '../../../actions/calls/employees';

// Material UI
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  gridContainer: {
    height: '70vh',
    width: '100%',
    paddingTop: 2 * theme.spacing.unit,
    overflowY: 'auto',
    overflowX: 'hidden'
  }
});

const EmployeesGrid = ({ classes, searchEmployeesValue }) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    getAllEmployees(setEmployees, setIsLoading, errorContext);
  }, []);

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
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={40}>
          {searchEmployeesValue ? filteredEmployeesData : employeesData}
        </Grid>
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(EmployeesGrid));
