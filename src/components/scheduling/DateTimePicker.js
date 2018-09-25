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
    this.props.onDateTimeChange(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form>
        <TextField
          id="date"
          name="date"
          type="date"
          label="Datumsvorschlag"
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
          label="Von"
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
          label="Bis"
          value={this.state.endTime}
          onChange={this.onDateTimeChange}
          required
        />
      </form>
    );
  }
}

export default withStyles(styles)(DateTimePicker);
