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
  title: {
    fontSize: 20,
    paddingBottom: 3 * theme.spacing.unit
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
          <Typography variant="body1" className={classes.title}>
            {intl.formatMessage({
              id: 'meetingcreator.datescheduling'
            })}
          </Typography>
          <Grid id={'tableRolePick'} container spacing={24} direction="column">
            <Grid item>
              <MeetingCreatorForm
                prById={pr}
                fetchAppointments={fetchAppointments}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
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
