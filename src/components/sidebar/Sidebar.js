import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import LibraryBooksIcon from 'material-ui-icons/LibraryBooks';
import AssignmentLateIcon from 'material-ui-icons/AssignmentLate';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';

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
    label: 'Alle Aufgaben',
    icon: <AssignmentLateIcon />,
    value: '/tasks'
  },
  {
    label: 'Alle PRs',
    icon: <LibraryBooksIcon />,
    value: '/prs'
  }
];

const Sidebar = props => {
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
        {listOfMenuEntries.map(entry => (
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
        ))}
      </List>
      <Divider />
    </div>
  );
};

export default withStyles(styles)(Sidebar);
