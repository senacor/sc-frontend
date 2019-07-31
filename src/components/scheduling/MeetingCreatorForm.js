import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import {
  getPrDetail,
  getSelectedDate,
  getUserinfo,
  getUserroles
} from '../../reducers/selector';
import TextField from '@material-ui/core/TextField';
import moment from 'moment-timezone';
import DateTimePicker from './DateTimePicker';
import PrStatusActionButton from '../pr/prDetail/PrStatusActionButton';
import meetingDetailVisibilityService from '../../service/MeetingDetailVisibilityService';
import { CheckRequiredClick } from '../hoc/CheckRequiredClick';

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
  buttonPosition: {
    marginTop: '1.5%',
    position: 'relative',
    backgroundColor: theme.palette.primary['400'],
    color: '#FFF',
    marginBottom: '1.5%',
    marginLeft: '1.5%'
  },
  hrInfo: {
    marginTop: '2%',
    marginBottom: '4%'
  }
});

class MeetingCreatorForm extends React.Component {
  constructor(props) {
    super(props);
    let now = moment.tz('Europe/Berlin');
    const remainder = 30 - (now.minute() % 30);
    let start = now.add(remainder, 'minutes');
    this.state = {
      location: '',
      date: now.format('YYYY-MM-DD'),
      startTime: start.format('HH:mm'),
      endTime: start.add(1, 'hour').format('HH:mm')
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  validateDateTimeInput = () => {
    let start = this.addMeeting(this.props.prById).start;
    let end = this.addMeeting(this.props.prById).end;
    if (!moment(start, 'YYYY-MM-DDTHH:mmZ', true).isValid()) {
      return false;
    }
    if (!moment(end, 'YYYY-MM-DDTHH:mmZ', true).isValid()) {
      return false;
    }
    return !moment(end).isBefore(moment(start));
  };

  handleClickOfMeetingButton = event => {
    event.preventDefault();
    this.props.addMeeting(this.addMeeting(this.props.prById));
  };

  setDateTime = (name, value) => {
    if (name === 'date' && moment(value, 'YYYY-MM-DD', true).isValid()) {
      this.props.fetchAppointments(value);
      this.props.changeDate(value);
    }
    this.setState({
      [name]: value
    });
  };

  addMeeting = prById => {
    let startDateTime = moment.tz(
      `${this.state.date} ${this.state.startTime}`,
      'Europe/Berlin'
    );
    let endDateTime = moment.tz(
      `${this.state.date} ${this.state.endTime}`,
      'Europe/Berlin'
    );

    let meeting_details = {
      prById: prById,
      start: startDateTime.utc().format('YYYY-MM-DDTHH:mmZ'),
      end: endDateTime.utc().format('YYYY-MM-DDTHH:mmZ'),
      location: this.state.location,
      requiredAttendees: [prById.employee.login],
      optionalAttendees: []
    };

    if (prById.hasOwnProperty('reviewer')) {
      meeting_details.requiredAttendees.push(prById.reviewer.login);
      meeting_details.optionalAttendees.push(prById.supervisor.login);
    } else {
      meeting_details.requiredAttendees.push(prById.supervisor.login);
    }

    return meeting_details;
  };

  render() {
    const { classes, pr, userinfo, userroles, intl } = this.props;
    let visibilityService = new meetingDetailVisibilityService();
    visibilityService.setPr(pr);
    visibilityService.setUserinfo(userinfo);
    visibilityService.setUserroles(userroles);

    return (
      <div>
        {visibilityService.getAction() ? (
          <DateTimePicker
            date={this.state.date}
            startTime={this.state.startTime}
            endTime={this.state.endTime}
            onDateTimeChange={this.setDateTime}
            intl={intl}
          />
        ) : null}
        {visibilityService.getAction() ? (
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="location"
              label={intl.formatMessage({
                id: 'meetingcreatorform.place'
              })}
              className={classes.textField}
              value={this.state.location}
              onChange={this.handleChange('location')}
              margin="normal"
            />
            <CheckRequiredClick
              onClick={this.handleClickOfMeetingButton}
              check={() => this.validateDateTimeInput()}
              message={intl.formatMessage({
                id: 'meetingcreatorform.starttime'
              })}
            >
              <PrStatusActionButton
                label={intl.formatMessage({
                  id: 'meetingcreatorform.createtermin'
                })}
                inputClass={classes.buttonPosition}
              />
            </CheckRequiredClick>
          </form>
        ) : null}
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
    pr: getPrDetail()(state),
    userinfo: getUserinfo(state),
    userroles: getUserroles(state),
    getSelectedDateTime: getSelectedDate(state)
  }),
  {
    addMeeting: actions.addMeeting,
    changeDate: actions.changeDate,
    addPrStatus: actions.addPrStatus
  }
)(StyledComponent);
