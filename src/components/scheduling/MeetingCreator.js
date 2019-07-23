import React, { Component } from 'react';
import TimeTable from './AppointmentTable/TimeTable';
import Attendee from './AppointmentTable/Attendee';
import MeetingCreatorForm from './MeetingCreatorForm';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import PersonToggle from './PersonToggle';
import { extractAppointments } from './AppointmentTable/AppointmentUtilities';
import { connect } from 'react-redux';
import {
  getAppointments,
  getPrDetail,
  getSelectedDate,
  getUserinfo,
  getUserroles
} from '../../reducers/selector';
import * as actions from '../../actions';
import ObjectGet from 'object-get';
import { hasRoleInPrBasedOnUserName } from '../../helper/hasRoleInPr';
import meetingDetailVisibilityService from '../../service/MeetingDetailVisibilityService';
import PrStatusActionButton from '../pr/prDetail/PrStatusActionButton';
import { getMeeting } from '../../reducers/selector';
import { injectIntl } from 'react-intl';

export class MeetingCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: '',
      supervisor: ''
    };
  }

  componentDidMount() {
    this.setEmployeeSupervisorReviewerData(this.props.pr, this.props.userinfo);
    this.fetchAppointments(this.props.selectedDate);
  }

  setStateforRole = (pr, role, userinfo) => {
    let hasRoleInPr = hasRoleInPrBasedOnUserName(pr, userinfo);
    let roleDescription = '';
    if (hasRoleInPr([role])) {
      roleDescription = 'Ich';
    } else {
      switch (role) {
        case 'employee':
          roleDescription = 'Mitarbeiter/in';
          break;
        case 'supervisor':
          roleDescription = 'Vorgesetzte/r';
          break;
        case 'reviewer':
          roleDescription = 'Beurteiler/in';
          break;
        default:
          roleDescription = '';
      }
    }
    this.setState(prevState => {
      return {
        [role]: Object.assign({}, prevState[role], {
          id: ObjectGet(pr, `${role}.login`),
          name:
            ObjectGet(pr, `${role}.firstName`) +
            ' ' +
            ObjectGet(pr, `${role}.lastName`),
          role: roleDescription,
          show: true
        })
      };
    });
  };

  setEmployeeSupervisorReviewerData = (pr, userinfo) => {
    this.setStateforRole(pr, 'employee', userinfo);
    this.hasSupervisorEntry(pr) &&
      this.setStateforRole(pr, 'supervisor', userinfo);
    this.hasReviewerEntryThatIsDifferentFromSupervisor(pr) &&
      this.setStateforRole(pr, 'reviewer', userinfo);
  };

  hasSupervisorEntry = pr => {
    return pr.supervisor !== undefined && pr.supervisor.id !== '';
  };

  hasReviewerEntryThatIsDifferentFromSupervisor = pr => {
    return (
      pr.reviewer !== undefined &&
      pr.reviewer.id !== '' &&
      pr.reviewer.id !== pr.supervisor.id
    );
  };

  fetchAppointments = date => {
    let pr = this.props.pr;
    let attendees = [pr.employee.login, pr.supervisor.login];
    this.hasReviewerEntryThatIsDifferentFromSupervisor(pr) &&
      attendees.push(pr.reviewer.login);

    this.props.appointmentsSearch(attendees.join(','), date);
  };

  onVisibilityChange = attendee => () => {
    this.setState({
      [attendee]: Object.assign({}, this.state[attendee], {
        show: !this.state[attendee].show
      })
    });
  };

  render() {
    let { pr, userinfo, userroles, meeting, intl } = this.props;
    let visibilityService = new meetingDetailVisibilityService();
    visibilityService.setPr(pr);
    visibilityService.setUserinfo(userinfo);
    visibilityService.setUserroles(userroles);
    visibilityService.setMeeting(meeting);
    const allAppointments = this.props.appointmentsSearchResults;
    return (
      <React.Fragment>
        <Typography gutterBottom variant="h4">
          Terminfindung
        </Typography>
        <Grid id={'tableRolePick'} container spacing={24} direction="column">
          <Grid item>
            <MeetingCreatorForm
              prById={pr}
              fetchAppointments={this.fetchAppointments}
            />
          </Grid>
          {visibilityService.getAction() ? (
            <Grid item>
              <Grid container direction="column">
                {Object.getOwnPropertyNames(this.state)
                  .filter(key => this.state[key] && this.state[key].id)
                  .map(attendee => {
                    return (
                      <Grid item key={attendee}>
                        <PersonToggle
                          displayName={`${this.state[attendee].name}`}
                          displayRole={`${this.state[attendee].role}`}
                          onChange={this.onVisibilityChange(attendee)}
                          showAttendee={this.state[attendee].show}
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
                {Object.getOwnPropertyNames(this.state)
                  .filter(
                    key =>
                      this.state[key] &&
                      this.state[key].id &&
                      allAppointments[this.state[key].id]
                  )
                  .map((attendee, index, keyArray) => (
                    <Attendee
                      key={attendee}
                      show={this.state[attendee].show}
                      appointments={extractAppointments(
                        allAppointments[this.state[attendee].id].appointments
                      )}
                      selectedDate={this.props.selectedDate}
                      distanceFromLeft={(100 * index) / keyArray.length + 10}
                      name={this.state[attendee].name}
                      attendee={attendee}
                    />
                  ))}
              </TimeTable>
              {visibilityService.getMeetingExists() ? (
                <PrStatusActionButton
                  label={intl.formatMessage({
                    id: 'meetingcreator.termindetail'
                  })}
                  releaseButtonClick={this.props.handleChange}
                />
              ) : null}
            </Grid>
          ) : null}
        </Grid>
      </React.Fragment>
    );
  }
}

export default injectIntl(
  connect(
    state => ({
      appointmentsSearchResults: getAppointments(state),
      selectedDate: getSelectedDate(state),
      userinfo: getUserinfo(state),
      pr: getPrDetail()(state),
      userroles: getUserroles(state),
      meeting: getMeeting(state)
    }),
    {
      appointmentsSearch: actions.appointmentsSearch
    }
  )(MeetingCreator)
);
