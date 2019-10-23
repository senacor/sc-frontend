import React, { useContext, useState } from 'react';
import moment from 'moment-timezone';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DateTimePicker from './DateTimePicker';
import { addMeeting } from '../../calls/meetings';
import { MeetingContext, ErrorContext } from '../App';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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
    width: 260
  },
  select: {
    width: 260
  }
});

const MeetingCreatorForm = ({
  prById,
  fetchAppointments,
  classes,
  intl,
  selectedRoom,
  setSelectedRoom,
  selectedDate,
  setSelectedDate
}) => {
  const { setValue: setMeeting } = useContext(MeetingContext.context);
  const errorContext = useContext(ErrorContext.context);
  let now = moment.tz('Europe/Berlin');
  const remainder = 30 - (now.minute() % 30);
  let start = now.add(remainder, 'minutes');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState(start.format('HH:mm'));
  const [endTime, setEndTime] = useState(start.add(1, 'hour').format('HH:mm'));

  const rooms = [
    '01NBGBusiness-Center@senacor.com',
    '01NUEMeeting3.01@senacor.com',
    '01NUEMeeting2.3.06@senacor.com',
    '01NUEMeeting3.3.07@senacor.com',
    '01NUEMeeting4.3.08@senacor.com',
    '01NUEMeeting5.3.09@senacor.com',
    '01NUEProjektOffice3.05@senacor.com',
    '01NUEProjektOffice3.2.41@senacor.com',
    '01NUEProjektOffice4.2.42@senacor.com',
    '02BONMeeting4.01@senacor.com',
    '02BONMeeting4.02@senacor.com',
    '02BONMeeting4.03@senacor.com',
    '02BONMeeting4.04@senacor.com',
    '02BONMeeting4.12@senacor.com',
    '03ESCBoardroom6.0214@senacor.com',
    '03ESCMeeting16.0312@senacor.com',
    '03ESCMeeting26.046@senacor.com',
    '03ESCProjekt-Office16.19@senacor.com',
    '03ESCProjekt-Office26.11@senacor.com',
    '04_MUC_Besprechung_3_6.04@senacor.com',
    '04_MUC_Besprechung_6.05@senacor.com',
    '04_MUC_Besprechung_6.052@senacor.com',
    '05BERBoardroom6.01@senacor.com',
    '05BERBoardroom603@senacor.com',
    '06HAMMeetingRoom5.03@senacor.com',
    '06HAMMeetingRoom5.08@senacor.com',
    '07KOSMeetingRoom10.7@senacor.com',
    '07KOSMeetingRoom11.24@senacor.com',
    '08STRTeambesprechung@senacor.com',
    '09VIEMeeting02@senacor.com',
    '09VIEMeeting03@senacor.com',
    '09VIEProject-Office07@senacor.com'
  ];

  const handleChange = name => event => {
    switch (name) {
      case 'location':
        setLocation(event.target.value);
        break;
      case 'date':
        setSelectedDate(event.target.value);
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
    let startDateTime = moment.tz(
      `${selectedDate} ${startTime}`,
      'Europe/Berlin'
    );
    let endDateTime = moment.tz(`${selectedDate} ${endTime}`, 'Europe/Berlin');
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
    if (validateDateTimeInput()) {
      addMeeting(createMeeting(prById), setMeeting, errorContext);
      errorContext.setValue({
        hasErrors: false,
        messageId: '',
        errors: {}
      });
    } else {
      errorContext.setValue({
        hasErrors: true,
        messageId: 'meetingcreatorform.starttime',
        errors: {}
      });
      window.scrollTo(0, 0);
    }
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
        setSelectedDate(value);
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
    <div>
      <DateTimePicker
        date={selectedDate}
        setDate={setSelectedDate}
        startTime={startTime}
        endTime={endTime}
        onDateTimeChange={setDateTime}
      />

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
                <ListItemText primary={room.split('@')[0]} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOfMeetingButton}
        >
          {intl.formatMessage({
            id: 'meetingcreatorform.createtermin'
          })}
        </Button>
      </form>
    </div>
  );
};

export default injectIntl(withStyles(styles)(MeetingCreatorForm));
