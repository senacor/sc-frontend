import React, { useContext } from 'react';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper/Paper';

import getDisplayName from '../../helper/getDisplayName';
import { formatDateForFrontend } from '../../helper/date';
import Grid from '@material-ui/core/Grid';
import { prStatusEnum } from '../../helper/prStatus';
import { PrContext } from '../App';
import EmployeeFilter from '../admin/EmployeeFilter';
import { useUserinfoContext } from '../../helper/contextHooks';

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

const PrDetailInformation = ({
  classes,
  pr,
  meeting,
  allEmployeesData,
  employee,
  intl
}) => {
  const user = useUserinfoContext();
  const { setValue: setPr } = useContext(PrContext.context);

  if (!pr || !employee) {
    return null;
  }

  const { firstName, lastName } = pr.employee;
  let termin = intl.formatMessage({
    id: 'prdetailinformation.notarranged'
  });

  if (meeting) {
    const meetingDate = meeting.start
      ? moment(meeting.start)
          .local()
          .format('DD.MM.YYYY')
      : intl.formatMessage({
          id: 'prdetailinformation.unknown'
        });

    if (meeting.status === 'ACCEPTED') {
      termin = meetingDate;
    }
    if (meeting.status === 'NO_ANSWER') {
      termin =
        meetingDate +
        ` ${intl.formatMessage({
          id: 'prdetailinformation.notconfirmed'
        })}`;
    }
    if (meeting.status === 'DECLINED') {
      termin =
        meetingDate +
        ` ${intl.formatMessage({
          id: 'prdetailinformation.cancelled'
        })}`;
    }
    if (
      pr.statusSet.includes(prStatusEnum.FINALIZED_REVIEWER) &&
      meeting.status !== 'ACCEPTED'
    ) {
      termin =
        meetingDate +
        ` ${intl.formatMessage({
          id: 'prdetailinformation.arrangedoffportal'
        })}`;
    }
  }

  const subheader1 = `${intl.formatMessage({
    id: 'prdetailinformation.duedate'
  })} ${formatDateForFrontend(pr.deadline)}, ${intl.formatMessage({
    id: 'prdetailinformation.costcenter'
  })} ${employee.currentCst}, ${intl.formatMessage({
    id: 'prdetailinformation.position'
  })} ${employee.currentPosition}, ${intl.formatMessage({
    id: 'prdetailinformation.salarylevel'
  })} ${pr.employee.salaryLevel}, ${intl.formatMessage({
    id: 'prdetailinformation.cc'
  })} ${employee.competenceCenter}, ${intl.formatMessage({
    id: 'prdetailinformation.occasion'
  })} ${intl.formatMessage({
    id: `${pr.occasion}`
  })}, ${intl.formatMessage({
    id: 'prdetailinformation.termin'
  })} ${termin}`;

  const reviewer = `, ${intl.formatMessage({
    id: 'prdetailinformation.reviewer'
  })} ${getDisplayName(pr.reviewer)}`;

  const subheader2 = `${intl.formatMessage({
    id: 'prdetailinformation.supervisor'
  })} ${getDisplayName(pr.supervisor)}${
    pr.supervisor.id !== pr.reviewer.id ? reviewer : ''
  }`;

  return (
    <Paper className={classes.spacing}>
      <div className={classes.root}>
        <Grid container alignItems="center" justify="center">
          <Grid item md={1} xs={3} className={classes.centered}>
            <Avatar className={classes.avatar}>
              {`${firstName.charAt(0)}${lastName.charAt(0)}`}
            </Avatar>
          </Grid>
          <Grid item md={9} xs={9} className={classes.centered}>
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
          <Grid item md={2} xs={12} className={classes.centered}>
            {user.hasRoleSupervisor() ? (
              <EmployeeFilter
                data={allEmployeesData}
                delegation={true}
                isDisabled={
                  pr.supervisor.id !== pr.reviewer.id ||
                  pr.statusSet.includes(prStatusEnum.RELEASED_SHEET_REVIEWER)
                }
                pr={pr}
                updatePr={setPr}
              />
            ) : null}
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(PrDetailInformation));
