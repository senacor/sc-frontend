import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  error: {
    color: '#D8000C',
    backgroundColor: '#FFBABA',
    flexDirection: 'row',
    marginBottom: theme.spacing.unit
  },
  icon: {
    padding: theme.spacing.unit
  },
  message: {
    display: 'inline-block',
    padding: theme.spacing.unit
  }
});

export const Error = ({ errors, classes }) => {
  return (
    <Paper
      style={{ display: errors.hasErrors ? 'flex' : 'none' }}
      className={classes.error}
      elevation={8}
    >
      <ErrorIcon className={classes.icon} />
      <Typography component="span" className={classes.message}>
        {errors.message}
      </Typography>
    </Paper>
  );
};

export default connect(state => ({
  errors: state.errors
}))(withStyles(styles)(Error));
