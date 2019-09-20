import React, { useEffect, useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { ErrorContext } from '../../App';

// Calls
import { getAllEmployees } from '../../../actions/calls/employees';

// Components
import AllEmployeesFilter from './AllEmployeesFilter';

// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import EmployeesGrid from './AllEmployeesGrid';

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

  const handleSearchChange = event => {
    setSearchEmployeesValue(event.target.value);
  };

  return (
    <div className={classes.container}>
      <AllEmployeesFilter
        searchValue={searchEmployeesValue}
        searchChange={handleSearchChange}
      />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <EmployeesGrid
          employees={employees}
          searchEmployeesValue={searchEmployeesValue}
        />
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(AllEmployeesContainer));
