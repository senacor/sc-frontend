import React from 'react';
import { withStyles } from '@material-ui/core';

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  ...theme.styledComponents,
  form: {
    paddingBottom: theme.spacing.unit
  },
  searchField: {
    width: '13rem',
    margin: '0 3rem'
  }
});

const AllEmployeesFilter = ({ classes, searchValue, searchSubmit }) => {
  return (
    <form className={classes.form}>
      <TextField
        id="search"
        name="search"
        type="search"
        className={classes.searchField}
        label="Search employee"
        defaultValue={searchValue}
      />
      <Button onClick={searchSubmit}>Search</Button>
    </form>
  );
};

export default withStyles(styles)(AllEmployeesFilter);
