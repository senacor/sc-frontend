import React, { useContext, useEffect, useState } from 'react';
import ObjectGet from 'object-get';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';

import TimeTable from './AppointmentTable/TimeTable';
import Attendee from './AppointmentTable/Attendee';
import MeetingCreatorForm from './MeetingCreatorForm';
import PersonToggle from './PersonToggle';
import { extractAppointments } from './AppointmentTable/AppointmentUtilities';
import meetingDetailVisibilityService from '../../service/MeetingDetailVisibilityService';
import PrStatusActionButton from '../pr/PrStatusActionButton';
import { MeetingContext } from '../App';
import { appointmentsSearch } from '../../calls/meetings';
import { useErrorContext, useUserinfoContext } from '../../helper/contextHooks';

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
  const user = useUserinfoContext();
  const { value: meeting } = useContext(MeetingContext.context);
  const [employee, setEmployee] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [appointmentResults, setAppointmentResults] = useState([]);

  let error = useErrorContext();

  const setStateforRole = (pr, role) => {
    let hasRoleInPr;
    let roleDescription = '';
    switch (role) {
      case 'employee':
        hasRoleInPr = user.isOwnerInPr(pr);
        break;
      case 'supervisor':
        hasRoleInPr = user.isSupervisorInPr(pr);
        break;
      case 'reviewer':
        hasRoleInPr = user.isReviewerInPr(pr);
        break;
      default:
        hasRoleInPr = false;
    }
    if (hasRoleInPr) {
      roleDescription = `${intl.formatMessage({
        id: 'meetingcreator.me'
      })}`;
    } else {
      switch (role) {
        case 'employee':
          roleDescription = `${intl.formatMessage({
            id: 'meetingcreator.employee'
          })}`;
          break;
        case 'supervisor':
          roleDescription = `${intl.formatMessage({
            id: 'meetingcreator.supervisor'
          })}`;
          break;
        case 'reviewer':
          roleDescription = `${intl.formatMessage({
            id: 'meetingcreator.reviewer'
          })}`;
          break;
        default:
          roleDescription = '';
      }
    }
    switch (role) {
      case 'employee':
        setEmployee(
          Object.assign({}, employee, {
            id: ObjectGet(pr, `${role}.login`),
            name:
              ObjectGet(pr, `${role}.firstName`) +
              ' ' +
              ObjectGet(pr, `${role}.lastName`),
            role: roleDescription,
            show: true
          })
        );
        break;
      case 'supervisor':
        setSupervisor(
          Object.assign({}, supervisor, {
            id: ObjectGet(pr, `${role}.login`),
            name:
              ObjectGet(pr, `${role}.firstName`) +
              ' ' +
              ObjectGet(pr, `${role}.lastName`),
            role: roleDescription,
            show: true
          })
        );
        break;
      case 'reviewer':
        setReviewer(
          Object.assign({}, reviewer, {
            id: ObjectGet(pr, `${role}.login`),
            name:
              ObjectGet(pr, `${role}.firstName`) +
              ' ' +
              ObjectGet(pr, `${role}.lastName`),
            role: roleDescription,
            show: true
          })
        );
        break;
      default:
    }
  };

  const hasSupervisorEntry = pr => {
    return pr.supervisor !== undefined && pr.supervisor.id !== '';
  };

  const hasReviewerEntryThatIsDifferentFromSupervisor = pr => {
    return (
      pr.reviewer !== undefined &&
      pr.reviewer.id !== '' &&
      pr.reviewer.id !== pr.supervisor.id
    );
  };

  const setEmployeeSupervisorReviewerData = pr => {
    setStateforRole(pr, 'employee');
    hasSupervisorEntry(pr) && setStateforRole(pr, 'supervisor');
    hasReviewerEntryThatIsDifferentFromSupervisor(pr) &&
      setStateforRole(pr, 'reviewer');
  };

  const fetchAppointments = date => {
    let attendees = [pr.employee.login, pr.supervisor.login];
    hasReviewerEntryThatIsDifferentFromSupervisor(pr) &&
      attendees.push(pr.reviewer.login);

    appointmentsSearch(attendees.join(','), date, error, setAppointmentResults);
  };

  useEffect(() => {
    setEmployeeSupervisorReviewerData(pr);
    fetchAppointments(selectedDate);
  }, []);

  const onVisibilityChange = attendee => () => {
    switch (attendee) {
      case 'employee':
        setEmployee(
          Object.assign({}, employee, {
            show: !employee.show
          })
        );
        break;
      case 'supervisor':
        setSupervisor(
          Object.assign({}, supervisor, {
            show: !supervisor.show
          })
        );
        break;
      case 'reviewer':
        setReviewer(
          Object.assign({}, reviewer, {
            show: !reviewer.show
          })
        );
        break;
      default:
    }
  };

  const getStateOfAttendee = attendee => {
    if (attendee === 'employee') {
      return employee;
    } else if (attendee === 'supervisor') {
      return supervisor;
    } else {
      return reviewer;
    }
  };

  const filterConditionWithoutAppointments = key => {
    if (key === 'employee') {
      return employee && employee.id;
    } else if (key === 'supervisor') {
      return supervisor && supervisor.id;
    } else {
      return reviewer && reviewer.id;
    }
  };

  const filterConditionWithAppointments = key => {
    if (key === 'employee') {
      return employee && employee.id && appointmentResults[employee.id];
    } else if (key === 'supervisor') {
      return supervisor && supervisor.id && appointmentResults[supervisor.id];
    } else {
      return reviewer && reviewer.id && appointmentResults[reviewer.id];
    }
  };

  let visibilityService = new meetingDetailVisibilityService();
  visibilityService.setPr(pr);
  visibilityService.setUser(user);
  visibilityService.setMeeting(meeting);
  return (
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
          />
        </Grid>
        {visibilityService.getAction() ? (
          <Grid item>
            <Grid container direction="column">
              {['employee', 'supervisor', 'reviewer']
                .filter(key => {
                  return filterConditionWithoutAppointments(key);
                })
                .map(attendee => {
                  return (
                    <Grid item key={attendee}>
                      <PersonToggle
                        displayName={`${getStateOfAttendee(attendee).name}`}
                        displayRole={`${getStateOfAttendee(attendee).role}`}
                        onChange={onVisibilityChange(attendee)}
                        showAttendee={getStateOfAttendee(attendee).show}
                        attendee={attendee}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        ) : null}
        {visibilityService.getAction() ? (
          <Grid item>
            <TimeTable>
              {['employee', 'supervisor', 'reviewer']
                .filter(key => filterConditionWithAppointments(key))
                .map((attendee, index, keyArray) => (
                  <Attendee
                    key={attendee}
                    show={getStateOfAttendee(attendee).show}
                    appointments={extractAppointments(
                      appointmentResults[getStateOfAttendee(attendee).id]
                        .appointments
                    )}
                    selectedDate={selectedDate}
                    distanceFromLeft={(100 * index) / keyArray.length + 10}
                    name={getStateOfAttendee(attendee).name}
                    attendee={attendee}
                  />
                ))}
            </TimeTable>
            {visibilityService.getMeetingExists() ? (
              <PrStatusActionButton
                label={intl.formatMessage({
                  id: 'meetingcreator.termindetail'
                })}
                releaseButtonClick={handleChange}
              />
            ) : null}
          </Grid>
        ) : null}
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(MeetingCreator);
