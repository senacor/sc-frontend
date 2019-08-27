import React, { useState } from 'react';
import 'moment/locale/de';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const DateTimePicker = props => {
  const [date, setDate] = useState(props.date);
  const [startTime, setStartTime] = useState(props.startTime);
  const [endTime, setEndTime] = useState(props.endTime);

  const onDateTimeChange = event => {
    const { name, value } = event.target;
    props.onDateTimeChange(name, value);
    switch (name) {
      case 'date':
        setDate(value);
        break;
      case 'startTime':
        setStartTime(value);
        break;
      case 'endTime':
        setEndTime(value);
        break;
      default:
    }
  };

  return (
    <form>
      <TextField
        id="date"
        name="date"
        type="date"
        label={props.intl.formatMessage({
          id: 'datetimepicker.date'
        })}
        value={date}
        className={props.classes.textField}
        onChange={onDateTimeChange}
        InputLabelProps={{
          shrink: true
        }}
        required
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
      />
      <TextField
        type="time"
        name="startTime"
        className={props.classes.textField}
        id="appt-start-time"
        min="00:00"
        max="24:00"
        label={props.intl.formatMessage({
          id: 'datetimepicker.from'
        })}
        value={startTime}
        onChange={onDateTimeChange}
        required
      />
      <TextField
        type="time"
        name="endTime"
        className={props.classes.textField}
        id="appt-end-time"
        min="00:00"
        max="24:00"
        label={props.intl.formatMessage({
          id: 'datetimepicker.to'
        })}
        value={endTime}
        onChange={onDateTimeChange}
        required
      />
    </form>
  );
};

export default injectIntl(withStyles(styles)(DateTimePicker));
