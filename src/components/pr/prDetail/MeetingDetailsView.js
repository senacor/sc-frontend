import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import moment from 'moment-timezone';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TodayIcon from '@material-ui/icons/Today';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';

import { translateContent } from '../../translate/Translate';

const styles = theme => ({
  container: {
    '& > *': {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    }
  },
  attendeeList: {
    '& ListItemText span': {
      fontSize: '0.875rem'
    }
  },
  nested: {
    paddingLeft: theme.spacing.unit * 8
  },
  meetingView: {
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  }
});

class MeetingDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openRequiredAttendees: true,
      openOptionalAttendees: true
    };
  }

  handleClickOpenRequiredAttendees = () => {
    this.setState(state => ({
      openRequiredAttendees: !state.openRequiredAttendees
    }));
  };

  handleClickOpenOptionalAttendees = () => {
    this.setState(state => ({
      openOptionalAttendees: !state.openOptionalAttendees
    }));
  };

  render() {
    const { classes, meeting } = this.props;
    return (
      <div className={classes.meetingView}>
        <List>
          <ListItem id={'date'}>
            <ListItemIcon>
              <TodayIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              primary={moment(meeting.start)
                .local()
                .format('DD.MM.YYYY')}
            />
          </ListItem>
          <ListItem id={'startAndEndTime'}>
            <ListItemIcon>
              <ScheduleIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              primary={`${moment(meeting.start)
                .local()
                .format('HH:mm')} - ${moment(meeting.end)
                .local()
                .format('HH:mm')}`}
            />
          </ListItem>
          <ListItem id={'location'}>
            <ListItemIcon>
              <LocationOnIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              primary={
                meeting.location !== null
                  ? meeting.location
                  : 'Kein Ort angegeben'
              }
            />
          </ListItem>
          <ListItem button onClick={this.handleClickOpenRequiredAttendees}>
            <ListItemIcon>
              <PeopleIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={'Benötigte Teilnehmer'} />
            {this.state.openRequiredAttendees ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={this.state.openRequiredAttendees}
            timeout="auto"
            unmountOnExit
          >
            <List id="requiredAttendees" component="div" disablePadding dense>
              {Object.keys(meeting.requiredAttendees).map(employee => {
                return (
                  <ListItem
                    key={meeting.requiredAttendees[employee].email}
                    className={classes.nested}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      inset
                      primary={`${meeting.requiredAttendees[employee].name} <${
                        meeting.requiredAttendees[employee].email
                      }>`}
                      secondary={
                        'Status: ' +
                        translateContent(
                          meeting.requiredAttendees[employee].status
                        )
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
          {Object.keys(meeting.optionalAttendees).length > 0 && (
            <React.Fragment>
              <ListItem button onClick={this.handleClickOpenOptionalAttendees}>
                <ListItemIcon>
                  <PeopleIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={'Optionale Teilnehmer'} />
                {this.state.openOptionalAttendeesAttendees ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>
              <Collapse
                in={this.state.openOptionalAttendees}
                timeout="auto"
                unmountOnExit
              >
                <List
                  id="optionalAttendees"
                  component="div"
                  disablePadding
                  dense
                >
                  {Object.keys(meeting.optionalAttendees).map(employee => {
                    return (
                      <ListItem
                        key={meeting.optionalAttendees[employee].email}
                        className={classes.nested}
                      >
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText
                          inset
                          primary={`${
                            meeting.optionalAttendees[employee].name
                          } <${meeting.optionalAttendees[employee].email}>`}
                          secondary={
                            'Status: ' +
                            translateContent(
                              meeting.optionalAttendees[employee].status
                            )
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </React.Fragment>
          )}
        </List>
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(MeetingDetailsView);
