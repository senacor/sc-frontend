import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import {
  getAppointments,
  getPrDetail,
  getMeeting
} from '../../reducers/selector';
import PersonToggle from './PersonToggle';
import AppointmentPicker from './AppointmentPicker';
import MeetingCreator from './MeetingCreator';
import MeetingView from './MeetingView';
import TimeTable from './TimeTable';
import ObjectGet from 'object-get';

const styles = theme => ({});

class AvailabilityView extends React.Component {
  constructor(props) {
    super(props);
    //TODO 1: these ids should be the employeeIds
    //TODO 2: right now only three attendees are supported. A more generic approach shall be implemented
    this.state = {};
  }

  componentDidMount() {
    this.setState((state, props) => {
      let newState = {
        employee: {
          id: props.prDetail.employee.login,
          show: false
        }
      };
      if (
        props.prDetail.reviewer !== undefined &&
        props.prDetail.reviewer.id !== ''
      ) {
        newState.reviewer = {
          id: props.prDetail.reviewer.login,
          name:
            ObjectGet(props, 'prDetail.reviewer.firstName') +
            ObjectGet(props, 'prDetail.reviewer.lastName'),
          show: false
        };
      }
      if (
        props.prDetail.supervisor !== undefined &&
        props.prDetail.supervisor.id !== ''
      ) {
        newState.supervisor = {
          id: props.prDetail.supervisor.login,
          name:
            ObjectGet(props, 'prDetail.supervisor.firstName') +
            ObjectGet(props, 'prDetail.supervisor.lastName'),
          show: false
        };
      }
      return newState;
    });
  }

  render() {
    const allAppointments = this.props.appointmentsSearchResults;
    const { meeting } = this.props;
    return (
      <div id={'outer'}>
        <Typography gutterBottom variant="display1">
          Terminfindung
        </Typography>
        <Grid id={'tableRolePick'} container spacing={24} direction="column">
          <Grid item>
            <AppointmentPicker
              onDateChange={date => this.fetchAppointments(date)}
            />
          </Grid>
          <Grid item>
            <PersonToggle
              onChange={this.onVisibilityChange}
              showEmployee={false}
              showReviewer={false}
              showSupervisor={false}
            />
          </Grid>
          <Grid item>
            <TimeTable
              appointmentsEmployee={
                this.state.employee &&
                this.state.employee.id !== '' &&
                allAppointments[this.state.employee.id]
                  ? this.extractAppointments(
                      allAppointments[this.state.employee.id].appointments
                    )
                  : []
              }
              appointmentsReviewer={
                this.state.reviewer &&
                this.state.reviewer.id !== '' &&
                allAppointments[this.state.reviewer.id]
                  ? this.extractAppointments(
                      allAppointments[this.state.reviewer.id].appointments
                    )
                  : []
              }
              appointmentsSupervisor={
                this.state.supervisor &&
                this.state.supervisor.id !== '' &&
                allAppointments[this.state.supervisor.id]
                  ? this.extractAppointments(
                      allAppointments[this.state.supervisor.id].appointments
                    )
                  : []
              }
            />
          </Grid>
        </Grid>
      </div>
    );
  }

  fetchAppointments(date) {
    this.props.appointmentsSearch(
      Object.getOwnPropertyNames(this.state)
        .map(role => this.state[role].id)
        .join(),
      date
    );
  }

  onVisibilityChange = visibilities => {
    const { showEmployee, showReviewer, showSupervisor } = visibilities;
    let newState = {
      employee: { show: showEmployee },
      reviewer: { show: showReviewer },
      supervisor: { show: showSupervisor }
    };
    this.setState(previousState => {
      Object.getOwnPropertyNames(this.state).forEach(person => {
        newState[person] = Object.assign(
          previousState[person],
          newState[person]
        );
      });
      return newState;
    });
  };

  extractAppointments(personAppointmentResults) {
    let appointments = [];
    if (personAppointmentResults[0] === undefined) {
      return appointments;
    } else {
      for (let j in personAppointmentResults) {
        let appointment = [
          personAppointmentResults[j].appointmentStartTime,
          personAppointmentResults[j].appointmentEndTime
        ];
        appointments[j] = appointment;
      }
    }
    return appointments;
  }
}

AvailabilityView.propTypes = {
  classes: PropTypes.object.isRequired
};

export const StyledComponent = withStyles(styles)(AvailabilityView);
export default connect(
  state => ({
    appointmentsSearchResults: getAppointments(state),
    prDetail: getPrDetail()(state),
    meeting: getMeeting(state)
  }),
  {
    appointmentsSearch: actions.appointmentsSearch,
    fetchMeeting: actions.fetchMeeting
  }
)(StyledComponent);
