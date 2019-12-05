import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper/Paper';
import getDisplayName from '../../helper/getDisplayName';
import Grid from '@material-ui/core/Grid';
import { formatLocaleDateTime, FRONTEND_DATE_FORMAT } from '../../helper/date';
import { modifyString } from '../../helper/string';
import { getAllEmployees } from '../../calls/employees';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../helper/contextHooks';
import ScDelegationMenu from './ScSheet/ScDelegationMenu';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  },
  saveBtn: {
    margin: 2 * theme.spacing.unit
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
  const error = useErrorContext();
  const info = useInfoContext();
  const user = useUserinfoContext();
  const [employees, setEmployees] = useState([]);

  const { firstName, lastName } = sc.employee;

  useEffect(() => {
    getAllEmployees(setEmployees, () => {}, error);
  }, []);

  const mainContent = `${intl.formatMessage({
    id: 'scdetailinformation.duedate'
  })} ${formatLocaleDateTime(
    sc.createdDate,
    FRONTEND_DATE_FORMAT
  )}, ${intl.formatMessage({
    id: 'scdetailinformation.department'
  })}: ${sc.department}, ${
    sc.position
      ? intl.formatMessage({
          id: 'scdetailinformation.position'
        })
      : ''
  } ${sc.position ? modifyString(sc.position) + ', ' : ''}${intl.formatMessage({
    id: 'scdetailinformation.termin'
  })} ${
    sc.finalMeetingDate
      ? formatLocaleDateTime(sc.finalMeetingDate, FRONTEND_DATE_FORMAT)
      : intl.formatMessage({ id: 'scdetailinformation.terminNotDefined' })
  }`;

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
            <ScDelegationMenu
              sc={sc}
              employees={employees}
              info={info}
              error={error}
              activeDelegationButtons={user.isSupervisorInSc(sc)}
            />
          </Grid>
          <Grid item md={2} xs={12} />
        </Grid>
      </div>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(ScDetailInformation));
