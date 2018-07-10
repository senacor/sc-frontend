import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { formatMomentForFrontend } from '../../helper/date';
import { withStyles } from '@material-ui/core/styles/index';

let styles = {
  thinItem: {
    paddingTop: 10,
    paddingBottom: 10
  }
};

class EventList extends Component {
  render() {
    const { classes, events } = this.props;

    return (
      <div>
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
                  label={formatMomentForFrontend(event.createdAt)}
                  className={classes.chip}
                />
                <Divider />
                <ListItemText primary={`${event.eventType}`} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(EventList);
