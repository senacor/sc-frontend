import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import GroupIcon from '@material-ui/icons/Group';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { NavLink } from 'react-router-dom';

import Authorized from '../authorized/Authorized';
import CompositionNumber from './CompositionNumber';
import ROLES from '../../helper/roles';
import * as actions from '../../actions';
import { getUserroles } from '../../reducers/selector';
import { fetchReviewerInfo } from '../../actions/reviewerInfo';

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

const listOfMenuEntries = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    value: '/dashboard'
  },
  {
    label: 'PR Übersicht',
    icon: <LibraryBooksIcon />,
    value: '/prs',
    role: ROLES.PR_REVIEWER
  },
  {
    label: 'Alle PRs',
    icon: <LibraryBooksIcon />,
    value: '/hr/prs',
    role: ROLES.PR_HR
  },
  {
    label: 'Mitarbeiter Übersicht',
    icon: <GroupIcon />,
    value: '/cstmembers',
    role: ROLES.PR_CST_LEITER
  },
  {
    label: 'Eigene PRs',
    icon: <AssignmentIndIcon />,
    value: '/myPrs',
    role: ROLES.PR_MITARBEITER
  },
  {
    label: 'Neue PR-Detailansicht',
    icon: <LibraryBooksIcon />,
    value: '/prDetail/1',
    role: ROLES.PR_CST_LEITER
  },
  {
    label: 'Logout',
    icon: <PowerSettingsNewIcon />,
    value: '/logout'
  }
];

export class Sidebar extends Component {
  componentDidMount() {
    if (this.props.userphoto === '') {
      this.props.getUserPhoto();
    }
    this.props.getUserInfo();
    this.props.getUserRoles();
    this.props.getReviewerInfo();
  }

  render() {
    let { classes, userphoto, userinfo, userroles } = this.props;

    let givenName = userinfo.givenName ? userinfo.givenName : '';
    let surname = userinfo.surname ? userinfo.surname : '';

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
              <Avatar
                alt={fullName}
                src={userphoto}
                className={classes.avatar}
              />
            )}

            <Typography>{fullName}</Typography>
          </div>
        </div>
        <Divider />

        <List component="nav">
          {listOfMenuEntries.map(entry => (
            <Authorized forRole={entry.role} key={entry.label}>
              <ListItem
                component={NavLink}
                to={entry.value}
                style={{ textDecoration: 'none' }}
                activeStyle={{
                  backgroundColor: '#DDD'
                }}
              >
                <ListItemIcon>{entry.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<div style={{ color: '#000' }}>{entry.label}</div>}
                />
              </ListItem>
            </Authorized>
          ))}
        </List>
        <Divider />
        <CompositionNumber />
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(Sidebar);
export default connect(
  state => ({
    userinfo: state.userinfo,
    userphoto: state.userphoto,
    userroles: getUserroles(state)
  }),
  {
    getUserInfo: actions.getUserInfo,
    getUserPhoto: actions.getUserPhoto,
    getUserRoles: actions.getUserRoles,
    getReviewerInfo: fetchReviewerInfo
  }
)(StyledComponent);
