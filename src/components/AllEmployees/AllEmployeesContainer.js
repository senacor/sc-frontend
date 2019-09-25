import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';

// Components
import AllEmployeesFilter from './AllEmployeesFilter';

// Material UI
import EmployeesGrid from './AllEmployeesGrid';

const styles = theme => ({
  container: {
    margin: 3 * theme.spacing.unit
  }
});

const AllEmployeesContainer = ({ classes }) => {
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');

  const handleSearchChange = event => {
    setSearchEmployeesValue(event.target.value);
  };

  return (
    <div className={classes.container}>
      <AllEmployeesFilter
        searchValue={searchEmployeesValue}
        searchChange={handleSearchChange}
      />
      <EmployeesGrid searchEmployeesValue={searchEmployeesValue} />
    </div>
  );
};

export default injectIntl(withStyles(styles)(AllEmployeesContainer));
