import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import LibraryBooksIcon from 'material-ui-icons/LibraryBooks';
import GroupIcon from 'material-ui-icons/Group';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';
import DashboardIcon from 'material-ui-icons/Dashboard';
import AssignmentIndIcon from 'material-ui-icons/AssignmentInd';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';

import CompositionNumber from './CompositionNumber';

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

export const Sidebar = props => {
  let url = window.location.href;
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <div className={classes.column}>
          <Avatar
            alt="Remy Sharp"
            src="/avatar.jpg"
            className={classes.avatar}
          />
          <Typography>Max Mustermann</Typography>
        </div>
      </div>
      <Divider />

      <List component="nav">
        {listOfMenuEntries.map(
          entry =>
            url.includes(entry.value) ? (
              <div key={entry.label} style={{ backgroundColor: '#DDD' }}>
                <Link to={entry.value} style={{ textDecoration: 'none' }}>
                  <ListItem button>
                    <ListItemIcon>{entry.icon}</ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={<Typography type="h3">{entry.label}</Typography>}
                    />
                  </ListItem>
                </Link>
              </div>
            ) : (
              <div key={entry.label}>
                <Link to={entry.value} style={{ textDecoration: 'none' }}>
                  <ListItem button>
                    <ListItemIcon>{entry.icon}</ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={<Typography type="h3">{entry.label}</Typography>}
                    />
                  </ListItem>
                </Link>
              </div>
            )
        )}
      </List>
      <Divider />
      <CompositionNumber />
    </div>
  );
};

export default withStyles(styles)(Sidebar);
