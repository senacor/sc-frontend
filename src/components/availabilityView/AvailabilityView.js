import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Switch from '@material-ui/core/Switch';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { getAppointments } from '../../reducers/selector';
import moment from 'moment';
import PersonToggle from './PersonToggle';
import DatePicker from './DatePicker';
import TimeTable from './TimeTable';

const timeTableListHeight = 40;
const firstHourOfDay = 8;
const lastHourOfDay = 19;
const timeTableTimeSteps = [':00', ':30'];
const timeTableHours = 11.5;
const persons = ['employee', 'reviewer', 'supervisor'];
let divIds = 0;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  datePicker: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  timeTable: {
    height: timeTableListHeight
  },
  timeTableDiv: {
    '@media (min-Width: 1000px)': { width: '75%' },
    '@media (min-Width: 1500px)': { width: '50%' },
    '@media (min-Width: 1800px)': { width: '40%' }
  },
  divider: {
    position: 'relative',
    top: -20,
    left: '7%',
    height: 1,
    margin: 0,
    border: 'none',
    flexShrink: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.12)'
  },
  hours: {
    position: 'relative',
    top: -10
  },
  appointmentDiv: {
    borderRadius: 10,
    background: '#4d8087',
    height: timeTableListHeight,
    position: 'absolute'
  }
});

class AvailabilityView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableHeight: 0,
      tableWidth: 0,
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
      selectedDay: '2018-06-14',
      appointmentDivs: []
    };
  }

  handleToggle = (person, appointmentsSearchResults, classes) => {
    return event => {
      let newState = this.state[person];
      newState.show = !this.state[person].show;
      this.setState({ [person]: newState });
      this.updateAppointments(appointmentsSearchResults, classes);
    };
  };

  handleTimeChange = event => {
    let newDate = moment(event.target.value).format('YYYY-MM-DD');
    console.log(newDate);
    this.setState({ selectedDay: newDate });
    this.state.selectedDay = newDate;
    console.log(this.state.selectedDay);
    this.fetchAppointments();
  };

  createTimeTable(classes) {
    const timeTable = [];
    for (let hour = firstHourOfDay; hour <= lastHourOfDay; hour++) {
      timeTableTimeSteps.forEach(minutes => {
        timeTable.push(
          <div
            className={classes.timeTable}
            key={'time' + hour.toString() + minutes} //needs an unique key
          >
            <Typography className={classes.hours}>
              {hour.toString() + minutes}
            </Typography>
            <hr className={classes.divider} style={{ maxWidth: '93%' }} />
          </div>
        );
      });
    }
    return timeTable;
  }

  createAppointmentDiv(person, appointment, classes) {
    let appointmentDiv;
    const personPosition = new Map();
    personPosition.set('employee', '15.5%');
    personPosition.set('reviewer', '46.5%');
    personPosition.set('supervisor', '77.5%');
    if (appointment !== undefined) {
      if (divIds > 1000) {
        divIds = 0;
      } else {
        divIds++;
      }
      appointmentDiv = (
        <div
          key={'availability' + person + divIds.toString()} //needs an unique key
          className={classes.appointmentDiv}
          style={{
            left: personPosition.get(person),
            top: (appointment[0] / 60 / (timeTableHours + 0.5)) * 100 + '%',
            width: '15.5%',
            height: (timeTableListHeight * appointment[1]) / 30
          }}
        />
      );
    }
    return appointmentDiv;
  }

  setAppointmentStartAndDuration(person, appointments) {
    let appointmentsForPerson = [];
    if (appointments === undefined) {
      return;
    }
    for (let i = 0; i < appointments.length; i++) {
      //let requestedDate = new Date(this.state.appointmentResponse.date);
      let startDate = new Date(appointments[i][0]);
      let endDate = new Date(appointments[i][1]);
      let startHourAppointment = startDate.getHours();
      let endHourAppointment = endDate.getHours();
      let startMinutes = startDate.getMinutes();
      let endMinutes = endDate.getMinutes();
      let startMinutesSinceFirstHour = 0;
      let endMinutesSinceFirstHour = 0;
      /*if (startDate >= defaultDate) {
        startMinutesSinceFirstHour =
          (startHours - firstHour) * 60 + startMinutes;
      }
      if (
        endDate <=
          defaultDate.setHours(defaultDate.getHours() + timeTableHours) &&
        startDate
      ) {
        endMinutesSinceFirstHour = (endHours - firstHour) * 60 + endMinutes;
      } else if (
        endDate > defaultDate.setHours(defaultDate.getHours() + timeTableHours)
      ) {
        endMinutesSinceFirstHour = timeTableHours * 60;
      }*/
      let appointment = [];
      if (
        startHourAppointment < lastHourOfDay &&
        endHourAppointment > firstHourOfDay
      ) {
        if (startHourAppointment <= firstHourOfDay) {
          startMinutesSinceFirstHour = 0;
        } else {
          startMinutesSinceFirstHour =
            (startHourAppointment - firstHourOfDay) * 60 + startMinutes;
        }
        if (endHourAppointment <= lastHourOfDay) {
          endMinutesSinceFirstHour =
            (endHourAppointment - firstHourOfDay) * 60 + endMinutes;
        } else {
          endMinutesSinceFirstHour = timeTableHours * 60;
        }
        appointment = [
          startMinutesSinceFirstHour,
          endMinutesSinceFirstHour - startMinutesSinceFirstHour
        ];
      }
      if (appointment.length > 0) {
        appointmentsForPerson.push(appointment);
        console.log(appointment);
      }
    }
    return appointmentsForPerson;
  }

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

  updateAppointments(appointmentsSearchResults, classes) {
    let appointmentDivs = [];
    persons.forEach(person => {
      if (appointmentsSearchResults[persons.indexOf(person)] === undefined) {
      } else {
        let personAppointmentResults =
          appointmentsSearchResults[persons.indexOf(person)]
            .exchangeOutlookAppointmentResponse;
        let appointmentsForPerson = this.setAppointmentStartAndDuration(
          person,
          this.extractAppointments(personAppointmentResults)
        );
        if (this.state[person].show) {
          for (let i = 0; i < appointmentsForPerson.length; i++) {
            appointmentDivs.push(
              this.createAppointmentDiv(
                person,
                appointmentsForPerson[i],
                classes
              )
            );
          }
        }
      }
    });
    this.setState({ appointmentDivs: appointmentDivs });
  }

  extractAppointmentsFromResponseForPersons(appointmentsSearchResults) {
    let newState = {};
    persons.forEach(person => {
      if (appointmentsSearchResults[persons.indexOf(person)] !== undefined) {
        newState[person] = {};
        newState[person].appointments = this.extractAppointments(
          appointmentsSearchResults[persons.indexOf(person)]
            .exchangeOutlookAppointmentResponse
        );
        console.log(newState[person].appointments);
      }
    });
    this.setState(previousState => {
      return persons.forEach(person =>
        Object.assign(previousState[person], newState[person])
      );
    });
  }

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.props.appointmentsSearch('1,2,3', this.state.selectedDay);
  }

  render() {
    const { classes, appointmentsSearchResults } = this.props;

    const timeTable = this.createTimeTable(classes);
    const appointmentDivs = this.state.appointmentDivs;
    this.extractAppointmentsFromResponseForPersons(appointmentsSearchResults);
    console.log('render');
    console.log(this.state.employee.appointments);
    console.log(this.state.reviewer.appointments);
    console.log(this.state.supervisor.appointments);

    return (
      <div id={'outer'} className={classes.root}>
        <Typography variant="headline">Terminfindung</Typography>
        <Grid id={'tableRolePick'} container spacing={24}>
          <Grid item xs={12} lg={3} sm={6}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subheading">Mitarbeiter</Typography>
                  </TableCell>
                  <TableCell numeric>
                    <Switch
                      checked={this.state.employee.show}
                      onChange={this.handleToggle(
                        'employee',
                        appointmentsSearchResults,
                        classes
                      )}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subheading">Bewerter</Typography>
                  </TableCell>
                  <TableCell numeric>
                    <Switch
                      checked={this.state.reviewer.show}
                      onChange={this.handleToggle(
                        'reviewer',
                        appointmentsSearchResults,
                        classes
                      )}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subheading">Vorgesetzter</Typography>
                  </TableCell>
                  <TableCell numeric>
                    <Switch
                      checked={this.state.supervisor.show}
                      onChange={this.handleToggle(
                        'supervisor',
                        appointmentsSearchResults,
                        classes
                      )}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12} lg={9} sm={6}>
            <div className="picker">
              <form noValidate>
                <TextField
                  id="datetime-local"
                  label="Terminvorschlag"
                  type="datetime-local"
                  defaultValue="2018-06-14T10:30"
                  className={classes.datePicker}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleTimeChange}
                />
              </form>
            </div>
          </Grid>
        </Grid>
        <div
          className={classes.timeTableDiv}
          style={{ position: 'relative', top: 50 }}
        >
          <div>{timeTable}</div>
          {appointmentDivs}
        </div>
        <PersonToggle
          onChange={console.log}
          showEmployee={true}
          showReviewer={true}
          showSupervisor={false}
        />
        <DatePicker onChange={console.log} />
        <TimeTable
          appointmentsEmployee={this.state.employee.appointments}
          appointmentsReviewer={this.state.reviewer.appointments}
          appointmentsSupervisor={this.state.supervisor.appointments}
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
