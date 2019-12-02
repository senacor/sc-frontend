import React from 'react';
import { withStyles, Paper, Typography } from '@material-ui/core';
import { injectIntl } from 'react-intl';

// Icons
import TimeIcon from '@material-ui/icons/AccessTime';

const styles = theme => ({
  ...theme.styledComponents,
  paper: {
    backgroundColor: theme.palette.secondary.white,
    margin: 3 * theme.spacing.unit
  },
  scTypeNotSelected: {
    padding: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& p': {
      paddingLeft: theme.spacing.unit
    }
  }
});

const EmployeeWaitForScText = ({ intl, classes }) => {
  return (
    <Paper className={`${classes.paper} ${classes.scTypeNotSelected}`}>
      <TimeIcon />
      <Typography variant="body2">
        {intl.formatMessage({ id: 'scsheet.scTypeNotChosen' })}
      </Typography>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(EmployeeWaitForScText));
