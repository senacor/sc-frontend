import React from 'react';
import { withStyles } from '@material-ui/core';

// Material UI
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  ...theme.styledComponents,
  form: {
    paddingBottom: theme.spacing.unit,
    display: 'inline'
  },
  searchField: {
    width: '10rem'
  }
});

const SearchFilter = ({ classes, placeholder, searchChange, searchValue }) => {
  return (
    <form className={classes.form}>
      <TextField
        id="search"
        name="search"
        type="search"
        className={classes.searchField}
        label={placeholder}
        onChange={searchChange}
        value={searchValue}
      />
    </form>
  );
};

export default withStyles(styles)(SearchFilter);
