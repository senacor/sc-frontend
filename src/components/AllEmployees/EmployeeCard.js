import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { formatLocaleDateTime, FRONTEND_DATE_FORMAT } from '../../helper/date';
import { translateGeneralStatus } from '../../helper/string';

// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ROUTES from '../../helper/routes';
import EmployeeFilter from '../admin/EmployeeFilter';
import { changeSupervisor } from '../../calls/employees';

const styles = theme => ({
  card: {
    width: 260,
    margin: theme.spacing.unit,
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  heightAllEmployee: {
    height: 320
  },
  heightFormerEmployee: {
    height: 270
  },
  header: {
    backgroundColor: theme.palette.secondary.brightGrey,
    height: 80,
    textAlign: 'center',
    padding: theme.spacing.unit
  },
  name: {
    color: theme.palette.secondary.darkGrey
  },
  avatar: {
    width: 60,
    height: 60
  },
  text: {
    color: theme.palette.secondary.grey,
    padding: theme.spacing.unit / 2,
    textAlign: 'center'
  },
  textInfo: {
    color: theme.palette.primary[400]
  },
  selectionUnavailable: {
    backgroundColor: theme.palette.secondary.grey
  },
  selected: {
    backgroundColor: theme.palette.primary[100]
  },
  selectable: {
    backgroundColor: theme.palette.primary[50]
  },
  iconGrey: {
    color: theme.palette.secondary.mediumGrey
  },
  iconGreen: {
    color: theme.palette.secondary.green
  }
});

const EmployeeCard = ({
  intl,
  classes,
  employee: {
    id,
    firstName,
    lastName,
    department,
    position,
    scStatus,
    officeLocation,
    userPhoto,
    supervisorName,
    entryDate,
    endDate
  },
  formerEmployee,
  currentSupervisors,
  setSelectedEmployee,
  user,
  info,
  error
}) => {
  const [supervisorNameState, setSupervisorNameState] = useState(
    supervisorName
  );

  const handleDialogOpen = () => {
    window.history.pushState(null, null, `${ROUTES.EMPLOYEE_SC}/${id}`);
    setSelectedEmployee({
      id: id,
      firstName: firstName,
      lastName: lastName,
      supervisorName: supervisorNameState
    });
  };

  const handleChangeSupervisor = supervisor => {
    changeSupervisor(id, supervisor.id, info, error).then(() => {
      setSupervisorNameState(`${supervisor.lastName}, ${supervisor.firstName}`);
    });
  };

  const employeeName = (
    <Fragment>
      <Typography variant="h5" className={classes.name}>
        {`${lastName},`}
      </Typography>
      <Typography variant="h5" className={classes.name}>
        {firstName}
      </Typography>
    </Fragment>
  );

  const employeePhoto =
    !userPhoto || userPhoto.length === 0 ? (
      <Avatar className={classes.avatar}>{`${lastName.charAt(
        0
      )}${firstName.charAt(0)}`}</Avatar>
    ) : (
      <Avatar />
    );

  return (
    <Fragment>
      <Card
        className={
          formerEmployee
            ? `${classes.card} ${classes.heightFormerEmployee}`
            : `${classes.card} ${classes.heightAllEmployee}`
        }
        onClick={handleDialogOpen}
      >
        <CardHeader
          className={`${classes.header}`}
          title={employeeName}
          avatar={employeePhoto}
        />
        <Divider />
        <CardContent>
          <Fragment>
            <Typography className={classes.text} component="span">
              {`${intl.formatMessage({
                id: 'employeeInfo.position'
              })}: `}
              <span className={classes.textInfo}>{position}</span>
            </Typography>
          </Fragment>
          {!formerEmployee && (
            <Typography className={classes.text} component="span">
              {`${intl.formatMessage({
                id: 'employeeInfo.supervisor'
              })}: `}
              {user.hasRoleHr() ? (
                <EmployeeFilter
                  data={currentSupervisors}
                  supervisorName={
                    supervisorNameState
                      ? supervisorNameState
                      : intl.formatMessage({
                          id: 'employeeInfo.noSupervisor'
                        })
                  }
                  setSelectedEmployee={handleChangeSupervisor}
                />
              ) : (
                <span className={classes.textInfo}>
                  {supervisorName
                    ? supervisorName
                    : intl.formatMessage({ id: 'employeeInfo.noSupervisor' })}
                </span>
              )}
            </Typography>
          )}
          <Typography className={classes.text} component="span">
            {`${intl.formatMessage({
              id: 'employeeInfo.department'
            })}: `}
            <span className={classes.textInfo}>{department}</span>
          </Typography>
          <Typography className={classes.text} component="span">
            {`${intl.formatMessage({
              id: 'employeeInfo.office'
            })}: `}
            <span className={classes.textInfo}>{officeLocation}</span>
          </Typography>
          {formerEmployee ? (
            <Typography className={classes.text} component="span">
              {`${intl.formatMessage({
                id: 'employeeInfo.exitDate'
              })}: `}
              <span className={classes.textInfo}>
                {' '}
                {formatLocaleDateTime(endDate, FRONTEND_DATE_FORMAT)}
              </span>
            </Typography>
          ) : (
            <Typography className={classes.text} component="span">
              {`${intl.formatMessage({
                id: 'employeeInfo.entryDate'
              })}: `}
              <span className={classes.textInfo}>
                {formatLocaleDateTime(entryDate, FRONTEND_DATE_FORMAT)}
              </span>
            </Typography>
          )}
          {!formerEmployee && (
            <Typography className={classes.text} component="span">
              {`${intl.formatMessage({
                id: 'employeeInfo.scStatus'
              })}: `}
              <span className={classes.textInfo}>
                {scStatus
                  ? intl.formatMessage({ id: translateGeneralStatus(scStatus) })
                  : intl.formatMessage({ id: 'employeeInfo.noScStatus' })}
              </span>
            </Typography>
          )}
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(EmployeeCard));
