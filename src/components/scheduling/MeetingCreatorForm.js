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

class MeetingCreatorForm extends React.Component {
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

  setDateTime = (date, startTime, endTime) => {
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
      start: startDateTime.utc().format('YYYY-MM-DDTHH:mmZ'),
      end: endDateTime.utc().format('YYYY-MM-DDTHH:mmZ'),
      location: this.state.location,
      //TODO replace hardcoded values
      requiredAttendees: ['test.pr.mitarbeiter2'],
      optionalAttendees: []
    };
    this.props.addMeeting(meeting_details);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppointmentPicker
          onDateTimeChange={this.setDateTime}
          fetchAppointments={this.props.fetchAppointments}
        />
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

MeetingCreatorForm.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchAppointments: PropTypes.func.isRequired
};

export const StyledComponent = withStyles(styles)(MeetingCreatorForm);
export default connect(
  state => ({
    meeting: getMeeting(state),
    getSelectedDateTime: getSelectedDate(state)
  }),
  {
    addMeeting: actions.addMeeting
  }
)(StyledComponent);
