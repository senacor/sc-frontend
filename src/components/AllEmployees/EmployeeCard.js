import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { formatLocaleDateTime, FRONTEND_DATE_FORMAT } from '../../helper/date';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import EmployeesPRsDialog from './EmployeesPRsDialog';

const styles = theme => ({
  card: {
    width: 260,
    height: 330,
    margin: theme.spacing.unit,
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
  name: {
    color: theme.palette.secondary.darkGrey
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
    competenceCenter,
    currentPosition,
    currentCst,
    officeLocation,
    dateOfNextPr,
    userPhoto,
    supervisorName,
    hasOpenedPr
  },
  selection,
  selected,
  toggleSelected
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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
    userPhoto.length === 0 ? (
      <Avatar className={classes.avatar}>{`${firstName.charAt(
        0
      )}${lastName.charAt(0)}`}</Avatar>
    ) : (
      <Avatar />
    );

  let bgClass = '';
  let avatar = employeePhoto;
  let onCardClick = handleDialogOpen;

  if (selection) {
    if (hasOpenedPr) {
      bgClass = classes.selectionUnavailable;
      avatar = (
        <HighlightOffIcon className={`${classes.avatar} ${classes.iconGrey}`} />
      );
      onCardClick = () => {};
    } else {
      onCardClick = () => toggleSelected(id);
      bgClass = selected ? classes.selected : classes.selectable;
      avatar = selected ? (
        <CheckCircleIcon className={`${classes.avatar} ${classes.iconGreen}`} />
      ) : (
        employeePhoto
      );
    }
  }

  return (
    <Fragment>
      <Card className={classes.card} onClick={onCardClick}>
        <CardHeader
          className={`${classes.header} ${bgClass}`}
          title={employeeName}
          avatar={avatar}
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
              id: 'employeeInfo.startDate'
            })}
            :{' '}
            <span className={classes.textInfo}>
              {formatLocaleDateTime(dateOfNextPr, FRONTEND_DATE_FORMAT)}
            </span>
          </Typography>
        </CardContent>
      </Card>
      {dialogOpen && (
        <EmployeesPRsDialog
          firstName={firstName}
          lastName={lastName}
          employeeId={id}
          dialogOpen={dialogOpen}
          dialogClose={handleDialogClose}
        />
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(EmployeeCard));
