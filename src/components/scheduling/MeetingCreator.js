import React, { useState, useEffect, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import TimeTable from './AppointmentTable/TimeTable';
import Attendee from './AppointmentTable/Attendee';
import MeetingCreatorForm from './MeetingCreatorForm';
import { extractAppointments } from './AppointmentTable/AppointmentUtilities';
import { ErrorContext } from '../App';
import { appointmentsSearch } from '../../calls/meetings';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';

const styles = theme => ({
  titleEmployee: {
    position: 'relative',
    width: '18%',
    left: '10%'
  },
  titleSupervisor: {
    position: 'relative',
    width: '18%',
    left: '14.8%'
  },
  titleReviewer: {
    position: 'relative',
    width: '18%',
    left: '19.3%'
  },
  titleRoom: {
    position: 'relative',
    width: '18%',
    left: '24%'
  },
  row: {
    display: 'flex',
    width: '80%'
  },
  spacing: {
    paddingTop: 3 * theme.spacing.unit
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    color: theme.palette.secondary.mediumGrey
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

export const MeetingCreator = ({ classes, intl, pr }) => {
  const [appointmentResults, setAppointmentResults] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    moment.tz('Europe/Berlin').format('YYYY-MM-DD')
  );
  const [selectedRoom, setSelectedRoom] = useState('');

  let errorContext = useContext(ErrorContext.context);

  const fetchAppointments = date => {
    let attendees = [pr.employee.login, pr.supervisor.login];
    pr.supervisor.id !== pr.reviewer.id && attendees.push(pr.reviewer.login);

    appointmentsSearch(
      attendees.join(','),
      date,
      selectedRoom,
      errorContext,
      setAppointmentResults
    );
  };

  useEffect(
    () => {
      fetchAppointments(selectedDate);
    },
    [selectedRoom]
  );

  return (
    <React.Fragment>
      {Object.keys(appointmentResults).length === 0 ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <Typography gutterBottom variant="h4">
            {intl.formatMessage({
              id: 'meetingcreator.datescheduling'
            })}
          </Typography>
          <Grid
            id={'tableRolePick'}
            container
            spacing={24}
            direction="column"
            className={classes.spacing}
          >
            <Grid item>
              <MeetingCreatorForm
                prById={pr}
                fetchAppointments={fetchAppointments}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                appointmentResults={appointmentResults}
              />
            </Grid>
            <Grid item className={classes.row}>
              <div className={classes.titleEmployee}>
                <div className={classes.label}>
                  {intl.formatMessage({
                    id: 'meetingcreator.employee'
                  })}
                </div>
                <div className={classes.title}>
                  {`${pr.employee.firstName} ${pr.employee.lastName}`}
                </div>
              </div>
              <div className={classes.titleSupervisor}>
                <div className={classes.label}>
                  {intl.formatMessage({
                    id: 'meetingcreator.supervisor'
                  })}
                </div>
                <div className={classes.title}>
                  {`${pr.supervisor.firstName} ${pr.supervisor.lastName}`}
                </div>
              </div>
              <div className={classes.titleReviewer}>
                <div className={classes.label}>
                  {intl.formatMessage({
                    id: 'meetingcreator.reviewer'
                  })}
                </div>
                {pr.supervisor.id !== pr.reviewer.id && (
                  <div className={classes.title}>
                    {`${pr.reviewer.firstName} ${pr.reviewer.lastName}`}
                  </div>
                )}
              </div>
              <div className={classes.titleRoom}>
                <div className={classes.label}>
                  {intl.formatMessage({
                    id: 'meetingcreator.room'
                  })}
                </div>
                {selectedRoom !== '' &&
                  appointmentResults[selectedRoom.split('@')[0]] !==
                    undefined && (
                    <div className={classes.title}>
                      {selectedRoom.split('@')[0]}
                    </div>
                  )}
              </div>
            </Grid>
            <Grid item>
              <TimeTable>
                <Attendee
                  appointments={extractAppointments(
                    appointmentResults[pr.employee.login].appointments
                  )}
                  selectedDate={selectedDate}
                  distanceFromLeft={10}
                  name={`${pr.employee.firstName} ${pr.employee.lastName}`}
                  attendee={'employee'}
                />
                <Attendee
                  appointments={extractAppointments(
                    appointmentResults[pr.supervisor.login].appointments
                  )}
                  selectedDate={selectedDate}
                  distanceFromLeft={90 / 4 + 10}
                  name={`${pr.supervisor.firstName} ${pr.supervisor.lastName}`}
                  attendee={'supervisor'}
                />
                {pr.supervisor.id !== pr.reviewer.id && (
                  <Attendee
                    appointments={extractAppointments(
                      appointmentResults[pr.reviewer.login].appointments
                    )}
                    selectedDate={selectedDate}
                    distanceFromLeft={180 / 4 + 10}
                    name={`${pr.reviewer.firstName} ${pr.reviewer.lastName}`}
                    attendee={'reviewer'}
                  />
                )}
                {selectedRoom !== '' &&
                  appointmentResults[selectedRoom.split('@')[0]] !==
                    undefined && (
                    <Attendee
                      appointments={extractAppointments(
                        appointmentResults[selectedRoom.split('@')[0]]
                          .appointments
                      )}
                      selectedDate={selectedDate}
                      distanceFromLeft={270 / 4 + 10}
                      name={selectedRoom.split('@')[0]}
                      attendee={'room'}
                    />
                  )}
              </TimeTable>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(MeetingCreator);
