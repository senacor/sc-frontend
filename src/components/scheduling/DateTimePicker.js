import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import 'moment/locale/de';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.date,
      startTime: this.props.startTime,
      endTime: this.props.endTime
    };
  }

  onDateTimeChange = event => {
    let { name, value } = event.target;
    this.props.onDateTimeChange(name, value);
    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes, intl } = this.props;

    return (
      <form>
        <TextField
          id="date"
          name="date"
          type="date"
          label={intl.formatMessage({
            id: 'datetimepicker.date'
          })}
          value={this.state.date}
          className={classes.textField}
          onChange={this.onDateTimeChange}
          InputLabelProps={{
            shrink: true
          }}
          required
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        />
        <TextField
          type="time"
          name="startTime"
          className={classes.textField}
          id="appt-start-time"
          min="00:00"
          max="24:00"
          label={intl.formatMessage({
            id: 'datetimepicker.from'
          })}
          value={this.state.startTime}
          onChange={this.onDateTimeChange}
          required
        />
        <TextField
          type="time"
          name="endTime"
          className={classes.textField}
          id="appt-end-time"
          min="00:00"
          max="24:00"
          label={intl.formatMessage({
            id: 'datetimepicker.to'
          })}
          value={this.state.endTime}
          onChange={this.onDateTimeChange}
          required
        />
      </form>
    );
  }
}

export default withStyles(styles)(DateTimePicker);
