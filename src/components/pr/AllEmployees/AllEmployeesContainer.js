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
  }
});

const AllEmployeesContainer = ({ classes }) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    getAllEmployees(setEmployees, setIsLoading, errorContext);
  }, []);

  console.log('employees', employees);

  return (
    <div className={classes.container}>
      <AllEmployeesFilter />
      <Grid container spacing={24}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid item>
            <EmployeeCard />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default injectIntl(withStyles(styles)(AllEmployeesContainer));
