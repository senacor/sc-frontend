import React, { useState } from 'react';
import 'moment/locale/de';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const DateTimePicker = props => {
  const [startTime, setStartTime] = useState(props.startTime);
  const [endTime, setEndTime] = useState(props.endTime);
  const [diff, setDiff] = useState(60);

  const onDateTimeChange = event => {
    const { name, value } = event.target;
    props.onDateTimeChange(name, value);
    switch (name) {
      case 'date':
        props.setDate(value);
        break;
      case 'startTime':
        setStartTime(value);
        setEndTime(
          moment(value, 'HH:mm')
            .add(diff, 'minutes')
            .format('HH:mm')
        );
        break;
      case 'endTime':
        setEndTime(value);
        setDiff(
          moment
            .duration(moment(value, 'HH:mm').diff(moment(startTime, 'HH:mm')))
            .asMinutes()
        );
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
        value={props.date}
        className={props.classes.textField}
        onChange={onDateTimeChange}
        InputLabelProps={{
          shrink: true
        }}
        required
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
      />
      <TextField
        type="sgsgdfg"
        name="startTime"
        className={props.classes.textField}
        id="appt-start-time"
        inputProps={{
          min: "00:00",
          max: "24:00",
        }}
        label={props.intl.formatMessage({
          id: 'datetimepicker.from'
        })}
        value={startTime}
        onChange={onDateTimeChange}
        required
      />
      <TextField
        type="dgsdgsg"
        name="endTime"
        className={props.classes.textField}
        id="appt-end-time"
        inputProps={{
          min: "00:00",
          max: "24:00",
        }}
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
