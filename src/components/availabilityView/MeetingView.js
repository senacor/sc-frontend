import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { getSelectedDate, getMeeting } from '../../reducers/selector';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { translateContent } from '../translate/Translate';

const styles = theme => ({
  container: {
    display: 'block !important',
    '& > *': {
      display: 'block !important',
      marginTop: 1 * theme.spacing.unit,
      marginBottom: 1 * theme.spacing.unit
    }
  },
  attendeeList: {
    '& ListItemText span': {
      fontSize: '0.875rem'
    }
  }
});

class MeetingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'Test',
      duration: 60
    };
  }

  componentDidMount() {
    this.props.fetchMeeting(1);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClickOfMeetingButton = event => {
    event.preventDefault();
    this.addMeeting();
  };

  addMeeting() {
    let startDateTime = moment(this.props.getSelectedDateTime);
    let start = startDateTime.utc().format('YYYY-MM-DDTHH:mmZ');
    let end = startDateTime
      .add(this.state.duration, 'm')
      .utc()
      .format('YYYY-MM-DDTHH:mmZ');
    let meeting_details = {
      //TODO replace hardcoded values
      prId: 1,
      start: start,
      end: end,
      location: this.state.location,
      //TODO replace hardcoded values
      requiredAttendeeIds: [4],
      optionalAttendeeIds: []
    };
    console.log(start);
    console.log(end);
    this.props.addMeeting(meeting_details);
  }

  render() {
    const { classes, meeting } = this.props;
    return (
      <div style={{ padding: 10 + 'px' }}>
        {meeting == null ? (
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="location"
              label="Ort"
              className={classes.textField}
              value={this.state.location}
              onChange={this.handleChange('location')}
              margin="normal"
            />
            <TextField
              id="duration"
              label="Dauer des Termins (min)"
              className={classes.textField}
              value={this.state.duration}
              onChange={this.handleChange('duration')}
              margin="normal"
            />
            <Button
              id="createMeeting"
              className={classes.button}
              variant="raised"
              onClick={this.handleClickOfMeetingButton}
              type="submit"
            >
              Termin erstellen
            </Button>
          </form>
        ) : (
          <div className={classes.container}>
            <Typography variant="headline">Termindetails</Typography>
            <Typography id="startDateTime" variant="body1">
              Start:{' '}
              {moment(meeting.start)
                .local()
                .format('DD-MM-YYYY HH:mm')}
            </Typography>
            <Typography id="endDateTime" variant="body1">
              Ende:{' '}
              {moment(meeting.end)
                .local()
                .format('DD-MM-YYYY HH:mm')}
            </Typography>
            <Typography variant="body1">
              Ort:{' ' + meeting.location}
            </Typography>
            <Typography variant="body2" className={classes.title}>
              Benötigte Teilnehmer
            </Typography>
            <div className={classes.attendeeList}>
              <List id="requiredAttendees">
                {Array.from(meeting.requiredAttendees).map(requiredAttendee => {
                  return (
                    <ListItem key={requiredAttendee.email} dense>
                      <ListItemText
                        primary={
                          requiredAttendee.name +
                          ' <' +
                          requiredAttendee.email +
                          '>'
                        }
                        secondary={
                          'Status: ' + translateContent(requiredAttendee.status)
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </div>
            {Array.from(meeting.optionalAttendees).length > 0 ? (
              <div className={classes.attendeeList}>
                <Typography variant="body2" className={classes.title}>
                  Optionale Teilnehmer
                </Typography>
                <List id="optionalAttendees">
                  {Array.from(meeting.optionalAttendees).map(
                    optionalAttendee => {
                      return (
                        <ListItem key={optionalAttendee.email}>
                          <ListItemText
                            primary={
                              optionalAttendee.name +
                              ' <' +
                              optionalAttendee.email +
                              '>'
                            }
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
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    );
  }
}

MeetingView.propTypes = {
  classes: PropTypes.object.isRequired
};

export const StyledComponent = withStyles(styles)(MeetingView);
export default connect(
  state => ({
    meeting: getMeeting(state),
    getSelectedDateTime: getSelectedDate(state)
  }),
  {
    addMeeting: actions.addMeeting,
    fetchMeeting: actions.fetchMeeting
  }
)(StyledComponent);
