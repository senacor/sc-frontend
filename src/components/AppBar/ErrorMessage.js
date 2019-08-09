import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import { ErrorContext } from '../ErrorsProvider';

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

export const Error = ({ classes }) => {
  const errors = useContext(ErrorContext).errors;
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

export default withStyles(styles)(Error);
