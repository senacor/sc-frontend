import React from 'react';
import { withStyles } from '@material-ui/core';

// Material UI
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  searchField: {
    width: '10rem',
    margin: theme.spacing.unit
  }
});

const SearchFilter = ({ classes, placeholder, searchChange, searchValue }) => {
  return (
    <TextField
      id="search"
      name="search"
      type="search"
      className={classes.searchField}
      label={placeholder}
      onChange={searchChange}
      value={searchValue}
    />
  );
};

export default withStyles(styles)(SearchFilter);
