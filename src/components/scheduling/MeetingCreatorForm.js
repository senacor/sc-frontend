import React, { useContext, useState } from 'react';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DateTimePicker from './DateTimePicker';
import PrStatusActionButton from '../pr/PrStatusActionButton';
import meetingDetailVisibilityService from '../../service/MeetingDetailVisibilityService';
import { CheckRequiredClick } from '../utils/CheckRequiredClick';
import { addMeeting } from '../../calls/meetings';
import { MeetingContext, ErrorContext, UserinfoContext } from '../App';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  container: {
    '& > *': {
      marginTop: 2 * theme.spacing.unit,
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
    color: theme.palette.secondary.white,
    marginBottom: '1.5%',
    marginLeft: '1.5%'
  },
  hrInfo: {
    marginTop: '2%',
    marginBottom: '4%'
  },
  textField: {
    width: 200
  },
  select: {
    width: 200
  }
});

const MeetingCreatorForm = ({
  prById,
  fetchAppointments,
  classes,
  intl,
  selectedRoom,
  setSelectedRoom
}) => {
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;
  const { setValue: setMeeting } = useContext(MeetingContext.context);
  const errorContext = useContext(ErrorContext.context);
  let now = moment.tz('Europe/Berlin');
  const remainder = 30 - (now.minute() % 30);
  let start = now.add(remainder, 'minutes');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(now.format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState(start.format('HH:mm'));
  const [endTime, setEndTime] = useState(start.add(1, 'hour').format('HH:mm'));

  const rooms = ['07KOSMeetingRoom10.7@senacor.com'];

  const handleChange = name => event => {
    switch (name) {
      case 'location':
        setLocation(event.target.value);
        break;
      case 'date':
        setDate(event.target.value);
        break;
      case 'startTime':
        setStartTime(event.target.value);
        break;
      case 'endTime':
        setEndTime(event.target.value);
        break;
      case 'room':
        setSelectedRoom(event.target.value);
        break;
      default:
    }
  };

  const createMeeting = prById => {
    let startDateTime = moment.tz(`${date} ${startTime}`, 'Europe/Berlin');
    let endDateTime = moment.tz(`${date} ${endTime}`, 'Europe/Berlin');
    let meeting_details = {
      prById: prById,
      start: startDateTime.utc().format('YYYY-MM-DDTHH:mmZ'),
      end: endDateTime.utc().format('YYYY-MM-DDTHH:mmZ'),
      location: location,
      room: selectedRoom,
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

  const validateDateTimeInput = () => {
    let start = createMeeting(prById).start;
    let end = createMeeting(prById).end;
    if (!moment(start, 'YYYY-MM-DDTHH:mmZ', true).isValid()) {
      return false;
    }
    if (!moment(end, 'YYYY-MM-DDTHH:mmZ', true).isValid()) {
      return false;
    }
    return !moment(end).isBefore(moment(start));
  };

  const handleClickOfMeetingButton = event => {
    event.preventDefault();
    addMeeting(createMeeting(prById), setMeeting, errorContext);
  };

  const setDateTime = (name, value) => {
    if (name === 'date' && moment(value, 'YYYY-MM-DD', true).isValid()) {
      fetchAppointments(value);
    }
    switch (name) {
      case 'location':
        setLocation(value);
        break;
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

  let visibilityService = new meetingDetailVisibilityService();
  visibilityService.setPr(prById);
  visibilityService.setUserinfo(userinfo);
  visibilityService.setUserroles(userroles);
  return (
    <div>
      {visibilityService.getAction() ? (
        <DateTimePicker
          date={date}
          startTime={startTime}
          endTime={endTime}
          onDateTimeChange={setDateTime}
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
            value={location}
            onChange={handleChange('location')}
            margin="normal"
          />
          <FormControl>
            <InputLabel htmlFor="select-room">
              {intl.formatMessage({
                id: 'meetingcreatorform.room'
              })}
            </InputLabel>
            <Select
              value={selectedRoom}
              onChange={handleChange('room')}
              input={<Input id="select-room" className={classes.select} />}
            >
              <MenuItem key={'none'} value={''}>
                <ListItemText
                  secondary={intl.formatMessage({
                    id: 'meetingcreatorform.none'
                  })}
                />
              </MenuItem>
              {rooms.map(room => (
                <MenuItem key={room} value={room}>
                  <ListItemText primary={room} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <CheckRequiredClick
            onClick={handleClickOfMeetingButton}
            check={() => validateDateTimeInput()}
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
};

export default injectIntl(withStyles(styles)(MeetingCreatorForm));
