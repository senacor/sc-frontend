import React, { useState, useEffect, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';

import TimeTable from './AppointmentTable/TimeTable';
import Attendee from './AppointmentTable/Attendee';
import MeetingCreatorForm from './MeetingCreatorForm';
import { extractAppointments } from './AppointmentTable/AppointmentUtilities';
import { ErrorContext } from '../App';
import { appointmentsSearch } from '../../calls/meetings';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
  title: {
    fontSize: 20,
    paddingBottom: 3 * theme.spacing.unit
  }
});

export const MeetingCreator = ({
  classes,
  intl,
  pr,
  selectedDate,
  handleChange
}) => {
  const [appointmentResults, setAppointmentResults] = useState([]);
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

  console.log(appointmentResults);
  console.log(pr);

  return (
    <React.Fragment>
      {appointmentResults.length === 0 ? (
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
                  distanceFromLeft={110}
                  name={`${pr.supervisor.firstName} ${pr.supervisor.lastName}`}
                  attendee={'supervisor'}
                />
                {pr.supervisor.id !== pr.reviewer.id && (
                  <Attendee
                    appointments={extractAppointments(
                      appointmentResults[pr.reviewer.login].appointments
                    )}
                    selectedDate={selectedDate}
                    distanceFromLeft={210}
                    name={`${pr.reviewer.firstName} ${pr.reviewer.lastName}`}
                    attendee={'reviewer'}
                  />
                )}
                {selectedRoom !== '' && (
                  <Attendee
                    appointments={
                      extractAppointments(
                        appointmentResults[selectedRoom.split('@')[0]]
                      ).appointments
                    }
                    selectedDate={selectedDate}
                    distanceFromLeft={310}
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
