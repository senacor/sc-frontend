import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment-timezone';
import 'moment/locale/de';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  textFieldDesktop: {}
});

class AppointmentPicker extends React.Component {
  constructor(props) {
    super(props);
    let now = moment.tz('Europe/Berlin');
    this.state = {
      date: now.format('YYYY-MM-DD'),
      startTime: now.format('HH:mm'),
      endTime: now.add(1, 'hour').format('HH:mm')
    };
  }

  onStartTimeChange = event => {
    this.setState({ startTime: event.target.value });
  };

  onEndTimeChange = event => {
    this.setState({ endTime: event.target.value });
  };

  onDateChange = event => {
    let date = event.target.value || event.target;
    this.setState({ date });
    if (moment(date, 'YYYY-MM-DD', true).isValid()) {
      this.props.onDateChange(date);
      this.props.changeDate(date);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <form>
        <TextField
          id="date"
          type="date"
          label="Datumsvorschlag"
          value={this.state.date}
          className={classes.textField}
          onChange={this.onDateChange}
          InputLabelProps={{
            shrink: true
          }}
          required
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        />
        <TextField
          type="time"
          className={classes.textField}
          id="appt-start-time"
          min="00:00"
          max="24:00"
          label="Von"
          value={this.state.startTime}
          onChange={this.onStartTimeChange}
          required
        />
        <TextField
          type="time"
          className={classes.textField}
          id="appt-end-time"
          min="00:00"
          max="24:00"
          label="Bis"
          value={this.state.endTime}
          onChange={this.onEndTimeChange}
          required
        />
      </form>
    );
  }
}

export const StyledComponent = withStyles(styles)(AppointmentPicker);
export default connect(
  state => ({
    appointmentDate: state.selectedDate
  }),
  {
    changeDate: actions.changeDate,
    appointmentsSearch: actions.appointmentsSearch
  }
)(StyledComponent);
