import React, { Component } from 'react';
import TimeTable from './AppointmentTable/TimeTable';
import Attendee from './AppointmentTable/Attendee';
import MeetingCreatorForm from './MeetingCreatorForm';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import PersonToggle from './PersonToggle';
import { extractAppointments } from './AppointmentTable/AppointmentUtilities';
import { connect } from 'react-redux';
import { getAppointments, getSelectedDate } from '../../reducers/selector';
import * as actions from '../../actions';
import ObjectGet from 'object-get';

export class MeetingCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: '',
      supervisor: ''
    };
  }

  componentDidMount() {
    this.setEmployeeSupervisorReviewerData(this.props.prDetail);
    this.fetchAppointments(this.props.selectedDate);
  }

  setStateforRole = (pr, role) => {
    let roleDescription;
    switch (role) {
      case 'employee':
        roleDescription = 'Ich';
        break;
      case 'supervisor':
        roleDescription = 'Vorgesetzter';
        break;
      case 'reviewer':
        roleDescription = 'Beurteiler';
        break;
      default:
        roleDescription = '';
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

  setEmployeeSupervisorReviewerData = pr => {
    this.setStateforRole(pr, 'employee');
    this.hasSupervisorEntry(pr) && this.setStateforRole(pr, 'supervisor');
    this.hasReviewerEntry(pr) && this.setStateforRole(pr, 'reviewer');
  };

  hasSupervisorEntry = pr => {
    return pr.supervisor !== undefined && pr.supervisor.id !== '';
  };

  hasReviewerEntry = pr => {
    return pr.reviewer !== undefined && pr.reviewer.id !== '';
  };

  fetchAppointments = date => {
    let pr = this.props.prDetail;
    let attendees = [pr.employee.login, pr.supervisor.login];
    this.hasReviewerEntry(pr) && attendees.push(pr.reviewer.login);

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
    const allAppointments = this.props.appointmentsSearchResults;
    return (
      <React.Fragment>
        <Typography gutterBottom variant="h4">
          Terminfindung
        </Typography>
        <Grid id={'tableRolePick'} container spacing={24} direction="column">
          <Grid item>
            <MeetingCreatorForm
              prById={this.props.prDetail}
              fetchAppointments={this.fetchAppointments}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              {Object.getOwnPropertyNames(this.state)
                .filter(key => this.state[key] && this.state[key].id)
                .map(attendee => {
                  return (
                    <Grid item key={attendee}>
                      <PersonToggle
                        displayName={`${this.state[attendee].id}`}
                        displayRole={`${this.state[attendee].role}`}
                        onChange={this.onVisibilityChange(attendee)}
                        showAttendee={this.state[attendee].show}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
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
                  />
                ))}
            </TimeTable>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    appointmentsSearchResults: getAppointments(state),
    selectedDate: getSelectedDate(state)
  }),
  {
    appointmentsSearch: actions.appointmentsSearch
  }
)(MeetingCreator);
