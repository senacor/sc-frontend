import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';

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
    margin: theme.spacing.unit,
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.05)'
    }
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
    firstName,
    lastName,
    department,
    currentPosition,
    scStatus,
    officeLocation,
    userPhoto,
    supervisorName,
    entryDate,
    exitDate
  },
  formerEmployee
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  const employeeName = (
    <Fragment>
      <Typography variant="h5" className={classes.name}>
        {firstName}
      </Typography>
      <Typography variant="h5" className={classes.name}>
        {lastName}
      </Typography>
    </Fragment>
  );

  const employeePhoto =
    !userPhoto || userPhoto.length === 0 ? (
      <Avatar className={classes.avatar}>{`${firstName.charAt(
        0
      )}${lastName.charAt(0)}`}</Avatar>
    ) : (
      <Avatar />
    );

  let avatar = employeePhoto;
  let onCardClick = handleDialogOpen;

  return (
    <Fragment>
      <Card className={classes.card} onClick={onCardClick}>
        <CardHeader
          className={`${classes.header}`}
          title={employeeName}
          avatar={avatar}
        />
        <Divider />
        <CardContent>
          <Fragment>
            <Typography className={classes.text} component="span">
              {intl.formatMessage({
                id: 'employeeInfo.position'
              })}
              <div className={classes.textInfo}>{currentPosition}</div>
            </Typography>
          </Fragment>
          <Typography className={classes.text} component="span">
            {`${intl.formatMessage({
              id: 'employeeInfo.scStatus'
            })}: `}
            <span className={classes.textInfo}>{scStatus}</span>
          </Typography>
          <Typography className={classes.text} component="span">
            {`${intl.formatMessage({
              id: 'employeeInfo.supervisor'
            })}: `}
            <span className={classes.textInfo}>{supervisorName}</span>
          </Typography>
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
              <span className={classes.textInfo}>{exitDate}</span>
            </Typography>
          ) : (
            <Typography className={classes.text} component="span">
              {`${intl.formatMessage({
                id: 'employeeInfo.entryDate'
              })}: `}
              <span className={classes.textInfo}>{entryDate}</span>
            </Typography>
          )}
        </CardContent>
      </Card>
      {dialogOpen && <div>TODO add dialog</div>}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(EmployeeCard));
