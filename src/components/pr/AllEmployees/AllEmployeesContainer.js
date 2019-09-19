import React, { useEffect, useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { ErrorContext } from '../../App';

// Calls
import { getAllEmployees } from '../../../actions/calls/employees';

// Components
import AllEmployeesFilter from './AllEmployeesFilter';
import EmployeeCard from './EmployeeCard';

// Material UI
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  container: {
    margin: 3 * theme.spacing.unit
  },
  gridContainer: {
    height: '77vh',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
});

const AllEmployeesContainer = ({ classes }) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');

  const errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    getAllEmployees(setEmployees, setIsLoading, errorContext);
  }, []);

  const handleSearchSubmit = event => {
    console.log('searchValue', searchEmployeesValue);
  };

  const filteredEmployees = employees.filter(employee => {
    return employee.lastName
      .toLowerCase()
      .includes(searchEmployeesValue.toLowerCase());
  });

  // All employees
  const employeesData = employees.map(employee => (
    <Grid item key={employee.id}>
      <EmployeeCard
        firstName={employee.firstName}
        lastName={employee.lastName}
      />
    </Grid>
  ));

  // Filtered employees
  const filteredEmployeesData = filteredEmployees.map(employee => (
    <Grid item key={employee.id}>
      <EmployeeCard
        firstName={employee.firstName}
        lastName={employee.lastName}
      />
    </Grid>
  ));

  return (
    <div className={classes.container}>
      <AllEmployeesFilter
        searchValue={searchEmployeesValue}
        searchSubmit={handleSearchSubmit}
      />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className={classes.gridContainer}>
          <Grid container spacing={24}>
            {searchEmployeesValue ? filteredEmployeesData : employeesData}
            {employeesData}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(AllEmployeesContainer));
