import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';

// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  card: {
    width: 260,
    height: 350,
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  header: {
    backgroundColor: theme.palette.secondary.brightGrey,
    height: 60,
    textAlign: 'center',
    padding: theme.spacing.unit
  },
  avatar: {
    width: 60,
    height: 60
  },
  text: {
    color: theme.palette.secondary.grey,
    padding: theme.spacing.unit,
    textAlign: 'center'
  },
  textInfo: {
    color: theme.palette.primary[400]
  }
});

const EmployeeCard = ({
  intl,
  classes,
  employee: {
    firstName,
    lastName,
    competenceCenter,
    currentPosition,
    currentCst,
    officeLocation,
    dateOfNextPr,
    userPhoto,
    supervisorName
  },
  openCard
}) => {
  const employeeName = (
    <Fragment>
      <Typography variant="h5">{firstName}</Typography>
      <Typography variant="h5">{lastName}</Typography>
    </Fragment>
  );

  const employeePhoto =
    userPhoto.length === 0 ? (
      <Avatar className={classes.avatar}>{`${firstName.charAt(
        0
      )}${lastName.charAt(0)}`}</Avatar>
    ) : (
      <Avatar />
    );

  return (
    <Card className={classes.card} onClick={openCard}>
      <CardHeader
        className={classes.header}
        title={employeeName}
        avatar={employeePhoto}
      />
      <Divider />
      <CardContent>
        <div>
          <Typography className={classes.text} component="span">
            {intl.formatMessage({
              id: 'employeeInfo.position'
            })}
            : <span className={classes.textInfo}>{currentPosition}</span>
          </Typography>
        </div>
        <Typography className={classes.text} component="span">
          {intl.formatMessage({
            id: 'employeeInfo.cst'
          })}
          :{' '}
          <span
            className={classes.textInfo}
          >{`${currentCst}, ${supervisorName}`}</span>
        </Typography>
        <Typography className={classes.text} component="span">
          {intl.formatMessage({
            id: 'employeeInfo.cc'
          })}
          : <span className={classes.textInfo}>{competenceCenter}</span>
        </Typography>
        <Typography className={classes.text} component="span">
          {intl.formatMessage({
            id: 'employeeInfo.location'
          })}
          : <span className={classes.textInfo}>{officeLocation}</span>
        </Typography>
        <Typography className={classes.text} component="span">
          {intl.formatMessage({
            id: 'employeeInfo.dueDate'
          })}
          :{' '}
          <span className={classes.textInfo}>
            {formatLocaleDateTime(dateOfNextPr, FRONTEND_DATE_FORMAT)}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default injectIntl(withStyles(styles)(EmployeeCard));
