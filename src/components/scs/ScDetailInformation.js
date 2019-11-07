import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper/Paper';
import getDisplayName from '../../helper/getDisplayName';
import Grid from '@material-ui/core/Grid';
import { formatDateForFrontend } from '../../helper/date';
import { modifyString } from '../../helper/string';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  },
  root: {
    padding: 3 * theme.spacing.unit
  },
  avatar: {
    backgroundColor: theme.palette.primary[500]
  },
  heading: {
    flex: '1 1 auto'
  },
  names: {
    display: 'flex',
    '& p:not(:first-child)': {
      paddingLeft: theme.spacing.unit
    }
  }
});

const ScDetailInformation = ({ classes, sc, intl }) => {
  const { firstName, lastName } = sc.employee;

  const mainContent = `${intl.formatMessage({
    id: 'prdetailinformation.duedate'
  })} ${formatDateForFrontend(sc.createdDate)}, ${intl.formatMessage({
    id: 'scdetailinformation.department'
  })}: ${sc.department}, ${intl.formatMessage({
    id: 'prdetailinformation.position'
  })} ${modifyString(sc.position)}, ${intl.formatMessage({
    id: 'prdetailinformation.termin'
  })} ${formatDateForFrontend(sc.createdDate)}`; // sc.createdDate is only temporary, waiting for termin date

  const supervisorText = `${intl.formatMessage({
    id: 'prdetailinformation.supervisor'
  })} ${getDisplayName(sc.supervisor)},`;

  const reviewer1Text = `${
    sc.reviewer2
      ? intl.formatMessage({
          id: 'scdetailinformation.firstReviewer'
        })
      : intl.formatMessage({
          id: 'prdetailinformation.reviewer'
        })
  } ${getDisplayName(sc.reviewer1)},`;

  const reviewer2Text = `${intl.formatMessage({
    id: 'scdetailinformation.secondReviewer'
  })} ${getDisplayName(sc.reviewer2)}`;

  return (
    <Paper className={classes.spacing}>
      <div className={classes.root}>
        <Grid container alignItems="center" justify="center">
          <Grid item md={1} xs={3}>
            <Avatar className={classes.avatar}>
              {`${firstName.charAt(0)}${lastName.charAt(0)}`}
            </Avatar>
          </Grid>
          <Grid item md={9} xs={9}>
            <Typography variant="body2">
              {getDisplayName(sc.employee)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {mainContent}
            </Typography>
            <div className={classes.names}>
              <Typography variant="body2" color="textSecondary">
                {supervisorText}
              </Typography>
              {sc.reviewer1 && (
                <Typography variant="body2" color="textSecondary">
                  {reviewer1Text}
                </Typography>
              )}
              {sc.reviewer2 && (
                <Typography variant="body2" color="textSecondary">
                  {reviewer2Text}
                </Typography>
              )}
            </div>
          </Grid>
          <Grid item md={2} xs={12} />
        </Grid>
      </div>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(ScDetailInformation));
