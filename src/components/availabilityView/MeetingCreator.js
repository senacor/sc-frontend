import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { getSelectedDate, getMeeting } from '../../reducers/selector';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment-timezone';
import AppointmentPicker from './AppointmentPicker';

const styles = theme => ({
  container: {
    '& > *': {
      // display: 'block !important',
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
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
      location: '',
      date: null,
      startTime: null,
      endTime: null
    };
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

  setStartAndEndTime = (date, startTime, endTime) => {
    this.setState({
      date: date,
      startTime: startTime,
      endTime: endTime
    });
  };

  addMeeting() {
    let startDateTime = moment(`${this.state.date} ${this.state.startTime}`).tz(
      'Europe/Berlin'
    );
    let endDateTime = moment(`${this.state.date} ${this.state.endTime}`).tz(
      'Europe/Berlin'
    );
    let meeting_details = {
      //TODO replace hardcoded values
      prId: 1,
      start: startDateTime.utc().format('YYYY-MM-DDTHH:mmZ'),
      end: endDateTime.utc().format('YYYY-MM-DDTHH:mmZ'),
      location: this.state.location,
      //TODO replace hardcoded values
      requiredAttendeeIds: [4],
      optionalAttendeeIds: []
    };
    this.props.addMeeting(meeting_details);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppointmentPicker onTimeChange={this.setStartAndEndTime} />
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="location"
            label="Ort"
            className={classes.textField}
            value={this.state.location}
            onChange={this.handleChange('location')}
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
    addMeeting: actions.addMeeting
  }
)(StyledComponent);
