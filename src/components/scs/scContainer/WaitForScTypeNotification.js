import React from 'react';
import { withStyles, Paper, Typography } from '@material-ui/core';
import { injectIntl } from 'react-intl';

// Icons
import TimeIcon from '@material-ui/icons/AccessTime';

const styles = theme => ({
  ...theme.styledComponents,
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

const WaitForScTypeNotification = ({ intl, classes }) => {
  return (
    <Paper className={`${classes.paper} ${classes.scTypeNotSelected}`}>
      <TimeIcon />
      <Typography variant="body2">
        {intl.formatMessage({ id: 'scsheet.scTypeNotChosen' })}
      </Typography>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(WaitForScTypeNotification));
