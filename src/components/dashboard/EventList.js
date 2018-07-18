import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { formatDateTimeForFrontend } from '../../helper/date';
import { withStyles } from '@material-ui/core/styles/index';

let styles = theme => ({
  thinItem: {
    paddingTop: 10,
    paddingBottom: 10,
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  listItemTextMobile: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 5
    }
  },
  chip: {
    '&:first-of-type': {
      marginRight: 16
    },
    '&:nth-child(2)': {
      minWidth: 100
    }
  },
  PR: {
    backgroundColor: '#A5D6A7'
  },
  SYSTEM: {
    backgroundColor: '#90CAF9'
  }
});

class EventList extends Component {
  render() {
    const { classes, events } = this.props;

    return (
      <List
        component="nav"
        subheader={
          <ListSubheader component="div">Letzte Aktivitäten</ListSubheader>
        }
      >
        {events.map(event => {
          return (
            <ListItem className={classes.thinItem} key={event.id}>
              <Chip
                label={formatDateTimeForFrontend(event.createdAt)}
                className={classes.chip}
              />
              <Chip
                label={event.eventableEntityType}
                className={[
                  classes.chip,
                  classes[event.eventableEntityType]
                ].join(' ')}
              />
              <ListItemText
                className={classes.listItemTextMobile}
                primary={`${event.text}`}
              />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default withStyles(styles)(EventList);
