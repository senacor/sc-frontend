import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper/Paper';

import getDisplayName from '../../helper/getDisplayName';
import Grid from '@material-ui/core/Grid';
import { formatDateForFrontend } from '../../helper/date';

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
  centered: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const InactivePrDetailInformation = ({
  classes,
  pr,
  allEmployeesData,
  intl
}) => {
  if (!pr || allEmployeesData.length === 0) {
    return null;
  }

  const employee = allEmployeesData.find(
    employee => employee.id === pr.employee.id
  );

  const subheader1 = `${intl.formatMessage({
    id: 'prdetailinformation.costcenter'
  })} ${employee.cst}, ${intl.formatMessage({
    id: 'prdetailinformation.position'
  })} ${employee.position}, ${intl.formatMessage({
    id: 'prdetailinformation.salarylevel'
  })} ${pr.employee.salaryLevel}, ${intl.formatMessage({
    id: 'prdetailinformation.cc'
  })} ${employee.competence}, ${intl.formatMessage({
    id: 'prdetailinformation.occasion'
  })} ${intl.formatMessage({
    id: `${pr.occasion}`
  })}, ${intl.formatMessage({
    id: 'prdetailinformation.exitdate'
  })} ${formatDateForFrontend(employee.endDate)}`;

  const subheader2 = `${intl.formatMessage({
    id: 'prdetailinformation.supervisor'
  })} ${employee.supervisor}`;

  return (
    <Paper className={classes.spacing}>
      <div className={classes.root}>
        <Grid container alignItems="center" justify="center">
          <Grid item md={1} xs={3} className={classes.centered}>
            <Avatar className={classes.avatar}>
              {`${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`}
            </Avatar>
          </Grid>
          <Grid item md={11} xs={9} className={classes.centered}>
            <div className={classes.heading}>
              <Typography variant={'body2'}>
                {getDisplayName(pr.employee)}
              </Typography>
              <Typography variant={'body2'} color={'textSecondary'}>
                {subheader1}
              </Typography>
              <Typography variant={'body2'} color={'textSecondary'}>
                {subheader2}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(InactivePrDetailInformation));
