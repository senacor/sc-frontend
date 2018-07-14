import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { getAppointments } from '../../reducers/selector';
import PersonToggle from './PersonToggle';
import DatePicker from './DatePicker';
import TimeTable from './TimeTable';

const persons = ['employee', 'reviewer', 'supervisor'];

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class AvailabilityView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewer: {
        id: 2,
        show: false,
        appointments: [{}]
      },
      supervisor: {
        id: 3,
        show: false,
        appointments: []
      },
      employee: {
        id: 1,
        show: false,
        appointments: []
      },
      selectedDay: '2018-06-14'
    };
  }

  onVisibilityChange = visibilies => {
    const { showEmployee, showReviewer, showSupervisor } = visibilies;
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

  onDateChange = date => {
    this.setState(
      {
        selectedDay: date
      },
      () => {
        console.log('callbacktest');
        this.fetchAppointments();
      }
    );
  };

  extractAppointments(personAppointmentResults) {
    let appointments = [];
    if (personAppointmentResults[0] == undefined) {
      return;
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

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.props.appointmentsSearch('1,2,3', this.state.selectedDay);
    console.log('fetchappointments', this.state.selectedDay);
  }

  render() {
    const { classes } = this.props;

    console.log('render');

    return (
      <div id={'outer'} className={classes.root}>
        <Typography variant="headline">Terminfindung</Typography>
        <Grid id={'tableRolePick'} container spacing={24}>
          <PersonToggle
            onChange={this.onVisibilityChange}
            showEmployee={false}
            showReviewer={false}
            showSupervisor={false}
          />
          <Grid item xs={12} lg={9} sm={6}>
            <div className="picker">
              <DatePicker onChange={this.onDateChange} />
            </div>
          </Grid>
        </Grid>
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
          selectedDay={this.selectedDay}
        />
      </div>
    );
  }
}

AvailabilityView.propTypes = {
  classes: PropTypes.object.isRequired
};

export const StyledComponent = withStyles(styles)(AvailabilityView);
export default connect(
  state => ({
    appointmentsSearchResults: getAppointments(state)
  }),
  {
    appointmentsSearch: actions.appointmentsSearch
  }
)(StyledComponent);
