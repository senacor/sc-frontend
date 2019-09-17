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
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import Build from '@material-ui/icons/Build';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { CircularProgress } from '@material-ui/core';
import Authorized from '../authorized/Authorized';
import CompositionNumber from './CompositionNumber';
import ROLES from '../../helper/roles';
import { getUserInfo } from '../../actions/calls/userinfo';
import {
  AuthorizationContext,
  ErrorContext,
  InfoContext,
  UserinfoContext
} from '../App';

const styles = theme => ({
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
  noTextDecoration: {
    textDecoration: 'none'
  },
  textColor: {
    color: theme.palette.primary['900']
  }
});

export const Sidebar = ({ intl, classes }) => {
  const userinfoContext = useContext(UserinfoContext.context);
  const { userphoto, userinfo, userroles } = userinfoContext.value;
  const infoContext = useContext(InfoContext.context);
  const errorContext = useContext(ErrorContext.context);
  const authContext = useContext(AuthorizationContext.context);

  useEffect(() => {
    getUserInfo(userinfoContext, errorContext, authContext);
  }, []);

  const resetMessages = () => {
    infoContext.setValue({ hasInfos: false, messageId: '' });
    errorContext.setValue({ hasErrors: false, messageId: '', errors: {} });
  };

  const getListOfMenuItems = () => {
    return [
      // DASHBOARD
      {
        label: intl.formatMessage({
          id: 'sidebar.dashboard'
        }),
        icon: <DashboardIcon />,
        value: '/dashboard',
        onClick: resetMessages
      },
      // ADMIN
      {
        label: intl.formatMessage({
          id: 'sidebar.systemandinterfaces'
        }),
        icon: <SettingsApplications />,
        value: '/system',
        roles: [ROLES.ADMIN],
        onClick: resetMessages
      },
      {
        label: intl.formatMessage({
          id: 'sidebar.userroles'
        }),
        icon: <SupervisedUserCircle />,
        value: '/userroles',
        roles: [ROLES.ADMIN],
        onClick: resetMessages
      },
      {
        label: intl.formatMessage({
          id: 'sidebar.maintenance'
        }),
        icon: <Build />,
        value: '/maintenance',
        roles: [ROLES.ADMIN],
        onClick: resetMessages
      },
      // DEVELOPER / CONSULTING
      {
        label: intl.formatMessage({
          id: 'sidebar.myprs'
        }),
        icon: <AssignmentIndIcon />,
        value: '/myPrs',
        roles: [ROLES.DEVELOPER, ROLES.CONSULTING],
        onClick: resetMessages
      },
      // SUPERVISOR + PERSONAL_DEV
      {
        label: intl.formatMessage({
          id: 'sidebar.prs'
        }),
        icon: <LibraryBooksIcon />,
        value: '/prs',
        roles: [ROLES.SUPERVISOR, ROLES.DEVELOPER, ROLES.CONSULTING],
        reviewerCheck: true,
        onClick: resetMessages
      },
      {
        label: intl.formatMessage({
          id: 'sidebar.allprs'
        }),
        icon: <LibraryBooksIcon />,
        value: '/allPrs',
        roles: [ROLES.SUPERVISOR, ROLES.PERSONAL_DEV],
        onClick: resetMessages
      },
      // LOGOUT
      {
        label: intl.formatMessage({
          id: 'sidebar.logout'
        }),
        icon: <PowerSettingsNewIcon />,
        value: '/logout',
        onClick: resetMessages
      }
    ];
  };

  const givenName = userinfo.givenName ? userinfo.givenName : '';
  const surname = userinfo.surname ? userinfo.surname : '';

  const fullName = `${givenName} ${surname}`;

  if (!userroles.length) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <div className={classes.column}>
          {userphoto === '' ? (
            <Avatar
              alt={fullName}
              className={classes.avatar}
            >{`${givenName.charAt(0)}${surname.charAt(0)}`}</Avatar>
          ) : (
            <Avatar alt={fullName} src={userphoto} className={classes.avatar} />
          )}

          <Typography>{fullName}</Typography>
        </div>
      </div>
      <Divider />

      <List component="nav">
        {getListOfMenuItems().map(entry => {
          const hasPRsToProcess =
            !entry.reviewerCheck ||
            (entry.reviewerCheck &&
              userinfo.numberOfPrsToReview + userinfo.numberOfPrsToSupervise >
                0);
          return hasPRsToProcess ? (
            <Authorized roles={entry.roles} key={entry.label}>
              <ListItem
                component={NavLink}
                to={entry.value}
                className={classes.noTextDecoration}
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
    </div>
  );
};

export default injectIntl(withStyles(styles)(Sidebar));
