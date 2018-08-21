import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import {
  getAppointments,
  getPrDetail,
  getSelectedDate,
  getMeeting
} from '../../reducers/selector';
import PersonToggle from './PersonToggle';
import AppointmentPicker from './AppointmentPicker';
import MeetingCreator from './MeetingCreator';
import MeetingView from './MeetingView';
import TimeTable from './TimeTable';
import Attendee from './AppointmentTable/Attendee';
import { extractAppointments } from './AppointmentTable/AppointmentUtilities';
import ObjectGet from 'object-get';

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
          role: 'Mitarbeiter',
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
          role: 'Beurteiler',
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
          role: 'Vorgesetzter',
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
            <Grid container direction="column">
              {Object.getOwnPropertyNames(this.state).map(attendee => {
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
                .map((attendee, index, keyArray) => {
                  return (
                    <Attendee
                      appointments={extractAppointments(
                        allAppointments[this.state[attendee].id].appointments
                      )}
                      selectedDate={this.props.selectedDate}
                      distanceFromLeft={(100 * index) / keyArray.length}
                    />
                  );
                })}
            </TimeTable>
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

  onVisibilityChange = attendee => () => {
    this.setState({
      [attendee]: Object.assign({}, this.state[attendee], {
        show: !this.state[attendee].show
      })
    });
  };
}

AvailabilityView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({
    appointmentsSearchResults: getAppointments(state),
    prDetail: getPrDetail()(state),
    selectedDate: getSelectedDate(state),
    meeting: getMeeting(state)
  }),
  {
    appointmentsSearch: actions.appointmentsSearch,
    fetchMeeting: actions.fetchMeeting
  }
)(AvailabilityView);
