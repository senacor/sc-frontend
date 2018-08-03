import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
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
    this.state = {
      date: new Date(),
      startTime: new Date(),
      endTime: new Date()
    };
  }

  onStartTimeChange = event => {
    this.setState({ startTime: moment(event.target.value, 'HH:mm').toDate() });
  };

  onEndTimeChange = event => {
    this.setState({ endTime: moment(event.target.value, 'HH:mm').toDate() });
  };

  onDateChange = event => {
    this.setState({ date: moment(event.target.value).toDate() });
    this.props.changeDate(moment(this.state.date).format('YYYY-MM-DD'));
  };

  render() {
    const { classes } = this.props;

    return (
      <form noValidate>
        <TextField
          id="date"
          type="date"
          label="Datumsvorschlag"
          value={moment(this.state.date).format('YYYY-MM-DD')}
          className={classes.textField}
          onChange={this.onDateChange}
          InputLabelProps={{
            shrink: true
          }}
          required
        />
        <TextField
          type="time"
          className={classes.textField}
          id="appt-time"
          name="appt-time"
          min="00:00"
          max="24:00"
          label="Von"
          value={moment(this.state.startTime).format('HH:mm')}
          onChange={this.onStartTimeChange}
          required
        />
        <TextField
          type="time"
          className={classes.textField}
          id="appt-time"
          name="appt-time"
          min="00:00"
          max="24:00"
          label="Bis"
          value={moment(this.state.endTime).format('HH:mm')}
          onChange={this.onEndTimeChange}
          required
        />
      </form>
    );
  }
}

export const StyledComponent = withStyles(styles)(AppointmentPicker);
export default connect(
  null,
  { changeDate: actions.changeDate }
)(StyledComponent);
