import React, { useEffect } from 'react';
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
import { getUserroles } from '../../reducers/selector';
import { fetchReviewerInfo } from '../../actions/reviewerInfo';
import FILTER_GROUPS from '../humanResources/filterGroups';
import { injectIntl } from 'react-intl';

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

export const Sidebar = props => {
  useEffect(() => {
    if (props.userphoto === '') {
      props.getUserPhoto();
    }
    props.getUserInfo();
    props.getUserRoles();
    props.getReviewerInfo();
  }, []);

  const getListOfMenuItems = () => {
    return [
      {
        label: props.intl.formatMessage({
          id: 'sidebar.dashboard'
        }),
        icon: <DashboardIcon />,
        value: '/dashboard',
        onClick: () => {}
      },
      {
        label: props.intl.formatMessage({
          id: 'sidebar.prs'
        }),
        icon: <LibraryBooksIcon />,
        value: '/prs',
        roles: [ROLES.PR_CST_LEITER, ROLES.PR_MITARBEITER],
        reviewerCheck: true,
        onClick: () => {
          props.resetFilterGroup(FILTER_GROUPS.REVIEWER);
        }
      },
      {
        label: props.intl.formatMessage({
          id: 'sidebar.allprs'
        }),
        icon: <LibraryBooksIcon />,
        value: '/hr/prs',
        roles: [ROLES.PR_HR],
        onClick: () => {
          props.resetFilterGroup(FILTER_GROUPS.HR);
        }
      },
      {
        label: props.intl.formatMessage({
          id: 'sidebar.archivedprs'
        }),
        icon: <SaveIcon />,
        value: '/hr/archivedPrs',
        roles: [ROLES.PR_HR],
        onClick: () => {}
      },
      {
        label: props.intl.formatMessage({
          id: 'sidebar.myprs'
        }),
        icon: <AssignmentIndIcon />,
        value: '/myPrs',
        roles: [ROLES.PR_MITARBEITER],
        onClick: () => {
          props.resetFilterGroup(FILTER_GROUPS.EMPLOYEE);
        }
      },
      {
        label: props.intl.formatMessage({
          id: 'sidebar.logout'
        }),
        icon: <PowerSettingsNewIcon />,
        value: '/logout',
        onClick: () => {}
      }
    ];
  };

  const givenName = props.userinfo.givenName ? props.userinfo.givenName : '';
  const surname = props.userinfo.surname ? props.userinfo.surname : '';

  const fullName = `${givenName} ${surname}`;

  if (!props.userroles.length) {
    return null;
  }

  return (
    <div className={props.classes.root}>
      <div className={props.classes.row}>
        <div className={props.classes.column}>
          {props.userphoto === '' ? (
            <Avatar
              alt={fullName}
              className={props.classes.avatar}
            >{`${givenName.charAt(0)}${surname.charAt(0)}`}</Avatar>
          ) : (
            <Avatar
              alt={fullName}
              src={props.userphoto}
              className={props.classes.avatar}
            />
          )}

          <Typography>{fullName}</Typography>
        </div>
      </div>
      <Divider />

      <List component="nav">
        {getListOfMenuItems().map(entry =>
          !entry.reviewerCheck ||
          (entry.reviewerCheck &&
            props.userinfo.numberOfPrsToReview +
              props.userinfo.numberOfPrsToSupervise >
              0) ? (
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
          ) : null
        )}
      </List>
      <Divider />
      <CompositionNumber />
    </div>
  );
};

export const StyledComponent = withStyles(styles)(Sidebar);
export default injectIntl(
  connect(
    state => ({
      userinfo: state.userinfo,
      userphoto: state.userphoto,
      userroles: getUserroles(state)
    }),
    {
      getUserInfo: actions.getUserInfo,
      getUserPhoto: actions.getUserPhoto,
      getUserRoles: actions.getUserRoles,
      getReviewerInfo: fetchReviewerInfo,
      resetFilterGroup: actions.resetFilterGroup
    }
  )(StyledComponent)
);
