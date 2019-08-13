import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { NavLink } from 'react-router-dom';
import Authorized from '../authorized/Authorized';
import CompositionNumber from './CompositionNumber';
import ROLES from '../../helper/roles';
import * as actions from '../../actions';
import FILTER_GROUPS from '../humanResources/filterGroups';
import { injectIntl } from 'react-intl';
import { getUserInfo, getUserPhoto } from '../../actions/calls/userinfo';
import { UserinfoContext } from '../App';

const styles = () => ({
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
    padding: '10px'
  }
});

export const Sidebar = ({
  intl,
  resetFilterGroup,
  classes
}) => {
  const userinfoContext = useContext(UserinfoContext.context);
  const { userphoto, userinfo, userroles } = userinfoContext.value;
  console.log('SIDEBAR VALUE: ', userinfoContext.value);
  useEffect(() => {
    if (userphoto === '') {
      getUserPhoto(userinfoContext);
    }
    getUserInfo(userinfoContext);
  }, []);

  const getListOfMenuItems = () => {
    return [
      {
        label: intl.formatMessage({
          id: 'sidebar.dashboard'
        }),
        icon: <DashboardIcon />,
        value: '/dashboard',
        onClick: () => {}
      },
      {
        label: intl.formatMessage({
          id: 'sidebar.prs'
        }),
        icon: <LibraryBooksIcon />,
        value: '/prs',
        roles: [ROLES.PR_CST_LEITER, ROLES.PR_MITARBEITER],
        reviewerCheck: true,
        onClick: () => {
          resetFilterGroup(FILTER_GROUPS.REVIEWER);
        }
      },
      {
        label: intl.formatMessage({
          id: 'sidebar.allprs'
        }),
        icon: <LibraryBooksIcon />,
        value: '/hr/prs',
        roles: [ROLES.PR_HR],
        onClick: () => {
          resetFilterGroup(FILTER_GROUPS.HR);
        }
      },
      {
        label: intl.formatMessage({
          id: 'sidebar.archivedprs'
        }),
        icon: <SaveIcon />,
        value: '/hr/archivedPrs',
        roles: [ROLES.PR_HR],
        onClick: () => {}
      },
      {
        label: intl.formatMessage({
          id: 'sidebar.myprs'
        }),
        icon: <AssignmentIndIcon />,
        value: '/myPrs',
        roles: [ROLES.PR_MITARBEITER],
        onClick: () => {
          resetFilterGroup(FILTER_GROUPS.EMPLOYEE);
        }
      },
      {
        label: intl.formatMessage({
          id: 'sidebar.logout'
        }),
        icon: <PowerSettingsNewIcon />,
        value: '/logout',
        onClick: () => {}
      }
    ];
  };

  const givenName = userinfo.givenName ? userinfo.givenName : '';
  const surname = userinfo.surname ? userinfo.surname : '';

  const fullName = `${givenName} ${surname}`;

  if (!userroles.length) {
    return null;
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
          const uuu =
            !entry.reviewerCheck ||
            (entry.reviewerCheck &&
              userinfo.numberOfPrsToReview + userinfo.numberOfPrsToSupervise >
                0);
          console.log('UUU entry:', entry, ' je : ', uuu);
          return uuu ? (
            <Authorized roles={entry.roles} key={entry.label}>
              <ListItem
                component={NavLink}
                to={entry.value}
                style={{ textDecoration: 'none' }}
                activeStyle={{
                  backgroundColor: '#DDD'
                }}
                onClick={entry.onClick}
              >
                <ListItemIcon>{entry.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<div style={{ color: '#000' }}>{entry.label}</div>}
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

export const StyledComponent = withStyles(styles)(Sidebar);
export default injectIntl(
  connect(
    state => ({}),
    {
      resetFilterGroup: actions.resetFilterGroup
    }
  )(StyledComponent)
);
