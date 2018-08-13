import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import { connect } from 'react-redux';
import { getSelectedDate, getMeeting } from '../../reducers/selector';
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

import { translateContent } from '../translate/Translate';

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

class MeetingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      openRequiredAttendees: true,
      openOptionalAttendees: false
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
        <Typography gutterBottom variant="display1">
          Termindetails
        </Typography>
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
                meeting.location !== null ? meeting.location : 'nicht angegeben'
              }
            />
          </ListItem>
          <ListItem button onClick={this.handleClickOpenRequiredAttendees}>
            <ListItemIcon>
              <PeopleIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={'Benötige Teilnehmer'} />
            {this.state.openRequiredAttendees ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={this.state.openRequiredAttendees}
            timeout="auto"
            unmountOnExit
          >
            <List id="requiredAttendees" component="div" disablePadding dense>
              {Array.from(meeting.requiredAttendees).map(requiredAttendee => {
                return (
                  <ListItem
                    key={requiredAttendee.email}
                    button
                    className={classes.nested}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      inset
                      primary={`${requiredAttendee.name} <${
                        requiredAttendee.email
                      }>`}
                      secondary={
                        'Status: ' + translateContent(requiredAttendee.status)
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
          {Array.from(meeting.optionalAttendees).length > 0 ? (
            <React.Fragment>
              <ListItem button onClick={this.handleClickOpenOptionalAttendees}>
                <ListItemIcon>
                  <PeopleIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={'Optionale Teilnehmer'} />
                {this.state.openRequiredAttendees ? (
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
                <List id="optionalAttendees" component="div" disablePadding>
                  {Array.from(meeting.optionalAttendees).map(
                    optionalAttendee => {
                      return (
                        <ListItem
                          key={optionalAttendee.email}
                          button
                          className={classes.nested}
                        >
                          <ListItemIcon>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText
                            inset
                            primary={`${optionalAttendee.name} <${
                              optionalAttendee.email
                            }>`}
                            secondary={
                              'Status: ' +
                              translateContent(optionalAttendee.status)
                            }
                          />
                        </ListItem>
                      );
                    }
                  )}
                </List>
              </Collapse>
            </React.Fragment>
          ) : (
            ''
          )}
        </List>
      </div>
    );
  }
}

MeetingView.propTypes = {
  classes: PropTypes.object.isRequired,
  meeting: PropTypes.object.isRequired
};

export const StyledComponent = withStyles(styles)(MeetingView);
export default connect(
  state => ({
    meeting: getMeeting(state),
    getSelectedDateTime: getSelectedDate(state)
  }),
  {}
)(StyledComponent);
