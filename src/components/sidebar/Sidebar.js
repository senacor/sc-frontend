import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AutoRules from '@material-ui/icons/RotateRight';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import BarChart from '@material-ui/icons/BarChart';
import Build from '@material-ui/icons/Build';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { CircularProgress } from '@material-ui/core';
import Authorized from '../authorized/Authorized';
import CompositionNumber from './CompositionNumber';
import ROLES from '../../helper/roles';
import { getUserInfo } from '../../calls/userinfo';
import { AuthorizationContext, UserinfoContext } from '../App';
import FeedbackButton from './FeedbackButton';
import { useErrorContext, useInfoContext } from '../../helper/contextHooks';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ROUTES from '../../helper/routes';

const styles = theme => ({
  ...theme.styledComponents,
  root: {
    width: '100%',
    maxWidth: 480
  },
  avatar: {
    width: 60,
    height: 60
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.unit
  },
  menuItem: {
    textDecoration: 'none',
    transition: '0.3s all',
    '&:hover': {
      backgroundColor: theme.palette.secondary.brightGrey
    }
  },
  textColor: {
    color: theme.palette.primary['900']
  },
  feedbackBtn: {
    position: 'fixed',
    bottom: 0,
    width: 270
  }
});

export const Sidebar = ({ intl, classes }) => {
  const userinfoContext = useContext(UserinfoContext.context);
  const { userphoto, userinfo, userroles } = userinfoContext.value;
  const info = useInfoContext();
  const error = useErrorContext();
  const authContext = useContext(AuthorizationContext.context);

  useEffect(() => {
    getUserInfo(userinfoContext, error, authContext);
  }, []);

  const resetMessages = () => {
    info.hide();
    error.hide();
  };

  const listOfMenuItems = [
    // DASHBOARD
    {
      label: intl.formatMessage({
        id: 'sidebar.dashboard'
      }),
      icon: <DashboardIcon />,
      value: ROUTES.DASHBOARD,
      onClick: resetMessages
    },
    // EMPLOYEE
    {
      label: intl.formatMessage({
        id: 'sidebar.myScs'
      }),
      icon: <AssessmentIcon />,
      value: ROUTES.OWN_SCS,
      roles: [ROLES.EMPLOYEE],
      onClick: resetMessages
    },
    // SUPERVISOR + PERSONAL_DEV
    {
      label: intl.formatMessage({
        id: 'sidebar.scs'
      }),
      icon: <BarChart />,
      value: ROUTES.SC_TO_REVIEW_TABLE,
      roles: [ROLES.SUPERVISOR, ROLES.EMPLOYEE],
      reviewerCheck: true,
      onClick: resetMessages
    },
    {
      label: intl.formatMessage({
        id: 'sidebar.activeEmployees'
      }),
      icon: <LibraryBooksIcon />,
      value: ROUTES.ACTIVE_EMPLOYEES_TABLE,
      roles: [ROLES.SUPERVISOR, ROLES.PERSONAL_DEV],
      onClick: resetMessages
    },
    //PERSONAL DEVELOPMENT
    {
      label: intl.formatMessage({
        id: 'sidebar.formerEmployees'
      }),
      icon: <LibraryBooksIcon />,
      value: ROUTES.FORMER_EMPLOYEES,
      roles: [ROLES.PERSONAL_DEV],
      onClick: resetMessages
    },
    {
      label: intl.formatMessage({
        id: 'sidebar.autorules'
      }),
      icon: <AutoRules />,
      value: ROUTES.AUTORULES,
      roles: [ROLES.PERSONAL_DEV],
      onClick: resetMessages
    },
    {
      label: intl.formatMessage({
        id: 'sidebar.userroles'
      }),
      icon: <SupervisedUserCircle />,
      value: ROUTES.ADMIN_USER_ROLES,
      roles: [ROLES.PERSONAL_DEV],
      onClick: resetMessages
    },
    {
      label: intl.formatMessage({
        id: 'sidebar.payrollreport'
      }),
      icon: <AssignmentIcon />,
      value: ROUTES.PAYROLL_REPORTS,
      roles: [ROLES.PERSONAL_DEV],
      onClick: resetMessages
    },
    // ADMIN_TECH
    {
      label: intl.formatMessage({
        id: 'sidebar.systemandinterfaces'
      }),
      icon: <SettingsApplications />,
      value: ROUTES.ADMIN_SYSTEM_PANEL,
      roles: [ROLES.ADMIN_TECH],
      onClick: resetMessages
    },
    {
      label: intl.formatMessage({
        id: 'sidebar.maintenance'
      }),
      icon: <Build />,
      value: ROUTES.MAINTENANCE,
      roles: [ROLES.ADMIN_TECH],
      onClick: resetMessages
    },
    // LOGOUT
    {
      label: intl.formatMessage({
        id: 'sidebar.logout'
      }),
      icon: <PowerSettingsNewIcon />,
      value: ROUTES.LOGOUT,
      onClick: resetMessages
    }
  ];

  if (!userroles.length) {
    return (
      <div className={classes.progressBarCentered}>
        <CircularProgress />
      </div>
    );
  }

  const fullName = userinfo.employeeName;
  const initials = fullName.split(' ').map(str => str[0]);

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <div className={classes.column}>
          {userphoto === '' ? (
            <Avatar alt={fullName} className={classes.avatar}>{`${initials[0]}${
              initials[initials.length - 1]
            }`}</Avatar>
          ) : (
            <Avatar alt={fullName} src={userphoto} className={classes.avatar} />
          )}
          <Typography>{fullName}</Typography>
        </div>
      </div>
      <Divider />

      <List component="nav">
        {listOfMenuItems.map(entry => {
          const hasScsToProcess =
            !entry.reviewerCheck ||
            (entry.reviewerCheck && userinfo.numberOfScsToReview);
          return hasScsToProcess ? (
            <Authorized roles={entry.roles} key={entry.label}>
              <ListItem
                component={NavLink}
                to={entry.value}
                className={classes.menuItem}
                activeStyle={{
                  backgroundColor: '#DDD'
                }}
                onClick={entry.onClick}
              >
                <ListItemIcon>{entry.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <div className={classes.textColor}>{entry.label}</div>
                  }
                />
              </ListItem>
            </Authorized>
          ) : null;
        })}
      </List>
      <Divider />
      <CompositionNumber />
      {!userroles.includes(ROLES.ADMIN_TECH) && (
        <div className={`${classes.feedbackBtn} ${classes.menuItem}`}>
          <FeedbackButton />
        </div>
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(Sidebar));
