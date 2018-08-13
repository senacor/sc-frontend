import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import {
  getAppointments,
  getSelectedDate,
  getMeeting
} from '../../reducers/selector';
import PersonToggle from './PersonToggle';
import MeetingCreator from './MeetingCreator';
import TimeTable from './TimeTable';
import MeetingView from './MeetingView';

const persons = ['employee', 'reviewer', 'supervisor'];

const styles = theme => ({});

class AvailabilityView extends React.Component {
  constructor(props) {
    super(props);

    //TODO 1: these ids should be the employeeIds
    //TODO 2: right now only three attendees are supported. A more generic approach shall be implemented
    this.state = {
      reviewer: {
        id: 2,
        show: false
      },
      supervisor: {
        id: 3,
        show: false
      },
      employee: {
        id: 1,
        show: false
      }
    };
  }

  render() {
    const { meeting } = this.props;
    return (
      <div id={'outer'}>
        {meeting == null ? (
          <React.Fragment>
            <Typography gutterBottom variant="display1">
              Terminfindung
            </Typography>
            <Grid
              id={'tableRolePick'}
              container
              spacing={24}
              direction="column"
            >
              <Grid item>
                <MeetingCreator />
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
                  appointmentsEmployee={this.extractAppointmentsFromSearchResultsForPerson(
                    'employee'
                  )}
                  appointmentsReviewer={this.extractAppointmentsFromSearchResultsForPerson(
                    'reviewer'
                  )}
                  appointmentsSupervisor={this.extractAppointmentsFromSearchResultsForPerson(
                    'supervisor'
                  )}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        ) : (
          <MeetingView />
        )}
      </div>
    );
  }

  componentDidMount() {
    this.fetchAppointments();
    this.props.fetchMeeting(1);
  }

  //TODO replace '1,2,3' string with a string containing the employeeIds
  fetchAppointments() {
    this.props.appointmentsSearch('1,2,3', this.props.selectedDate);
  }

  onVisibilityChange = visibilities => {
    const { showEmployee, showReviewer, showSupervisor } = visibilities;
    let newState = {
      employee: { show: showEmployee },
      reviewer: { show: showReviewer },
      supervisor: { show: showSupervisor }
    };
    this.setState(previousState => {
      persons.forEach(person => {
        newState[person] = Object.assign(
          previousState[person],
          newState[person]
        );
      });
      return newState;
    });
  };

  extractAppointmentsFromSearchResultsForPerson(person) {
    if (
      this.props.appointmentsSearchResults[persons.indexOf(person)] ===
        undefined ||
      !this.state[person].show
    ) {
      return [];
    }
    return this.extractAppointments(
      this.props.appointmentsSearchResults[persons.indexOf(person)]
        .exchangeOutlookAppointmentResponse
    );
  }

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
    selectedDate: getSelectedDate(state),
    meeting: getMeeting(state)
  }),
  {
    appointmentsSearch: actions.appointmentsSearch,
    fetchMeeting: actions.fetchMeeting
  }
)(StyledComponent);
