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

import CompositionNumber from './CompositionNumber';
import * as actions from '../../actions';

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
    value: '/tasks'
  },
  {
    label: 'PR Übersicht',
    icon: <LibraryBooksIcon />,
    value: '/prs'
  },
  {
    label: 'Mitarbeiter Übersicht',
    icon: <GroupIcon />,
    value: '/employees'
  },
  {
    label: 'Eigene PRs',
    icon: <AssignmentIndIcon />,
    value: '/myPrs'
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
    return this.props.getUserInfo();
  }

  render() {
    const {
      classes,
      userinfo: { givenName = '', surname = '' },
      userphoto
    } = this.props;

    const fullName = `${givenName} ${surname}`;

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
            <ListItem
              key={entry.label}
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
    userphoto: state.userphoto
  }),
  {
    getUserInfo: actions.getUserInfo,
    getUserPhoto: actions.getUserPhoto
  }
)(StyledComponent);
